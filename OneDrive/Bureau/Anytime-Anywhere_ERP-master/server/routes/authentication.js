const { user } = require("../database/models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const multer = require("multer");
const mailer = require("../components/mailer");
require("dotenv").config();
const storage = multer.diskStorage({
    destination: (req,file, callback) => {
      callback(null, "../../client/src/uploads/");
    },
    filename:(req, file, callback) =>{
      callback(null, file.originalname);
    }
  })
  exports.upload = multer({storage:storage});

exports.createAccount = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const image = req.file.originalname;

  const token = crypto.randomBytes(10).toString("hex");

  const hash = bcrypt.hashSync(password, 10);

  user.findOne({ email: email }, (err, row) => {
    if (row) {
      res.send("USER EXISTS WITH EMAIL");
    } else {
      const newuser = new user({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        image:image,
        token: token,
      });
      try {
        newuser.save();
        mailer.transporter.sendMail({
          from: '"Anytime & Anywhere" <' + process.env.AUTH_EMAIL + ">",
          to: email,
          subject: "Activate account.",
          text: "Follow the instructions to activate your account.",
          html:
            `<div ` +
            mailer.mailcss.background +
            `><h1>Anytime & Anywhere</h1>
                      <div` +
            mailer.mailcss.body +
            `>
                  <h3>Activate account</h3>
                  <hr/>
                  <h5>Use this link to activate your account:</h5>
                  <br/>
                  <h5>` +
            process.env.APP_URL +
            `/activateaccount/` +
            email +
            `/` +
            token +
            `</h5>
                   </div>
                  </div>`,
        });
        res.send("SUCCESS");
      } catch (err) {
        res.send("ERROR");
        console.log(err);
      }
    }
  });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  user.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send("ACCOUNT NOT FOUND");
    } else if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.send("ERROR");
        } else {
          if (result) {
            req.session.user = {
              image: user.image,
              connected: true,
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              active: user.active,
              role: user.role,
              address: user.address,
            };
            res.send(req.session.user);
          } else {
            res.send("WRONG PASSWORD");
          }
        }
      });
    } else {
      res.send("ERROR");
    }
  });
};

exports.getlogin = (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send({ connected: false });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
};

exports.forgotPassword = (req, res) => {
  const email = req.body.email;
  user.findOne({ email: email }, (err, row) => {
    if (err || !row) {
      res.send("EMAIL NOT FOUND");
    } else if (row) {
      const token = crypto.randomBytes(20).toString("hex");
      mailer.transporter.sendMail({
        from: '"Anytime & Anywhere" <' + process.env.AUTH_EMAIL + ">",
        to: email,
        subject: "Reset password.",
        text: "Follow the instructions to reset your password.",
        html:
          `<div ` +
          mailer.mailcss.background +
          `><h1>Anytime & Anywhere</h1>
                      <div` +
          mailer.mailcss.body +
          `>
                      <h3>Reset password</h3>
                      <hr/>
                      <h5>Use this link to reset your password:</h5>
                      <br/>
                      <h5>` +
          process.env.APP_URL +
          `/resetpassword/` +
          email +
          `/` +
          token +
          `</h5>
                      </div>
                  </div>`,
      });
      try {
        user.findOne({ email }, (err, user) => {
          user.token = token;
          user.save();
        });
      } catch (err) {
        console.log(err);
      }
      res.send("SUCCESS");
    }
  });
};

exports.checkResetToken = (req, res) => {
  const url = req.body.url;
  const token = url.slice(-40);
  user.findOne({ token: token }, (err, row) => {
    if (err || !row) {
      res.send({ valid: false });
    } else if (row) {
      res.send({ valid: true, token: token });
    }
  });
};

exports.resetPassword = (req, res) => {
  const password = req.body.password;
  const token = req.body.token;

  user.findOne({ token: token }, (err, row) => {
    if (err || !row) {
      res.send("ERROR");
    } else if (row) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.send("ERROR");
        } else {
          row.active = true;
          row.password = hash;
          row.token = "expired";
          row.save();
          res.send("SUCCESS");
        }
      });
    }
  });
};

exports.checkActivateToken = (req, res) => {
  const url = req.body.url;
  const token = url.slice(-20);

  user.findOne({ token: token }, (err, row) => {
    if (err || !row) {
      res.send({ valid: false });
    } else if (row) {
      res.send({ valid: true, token: token });
    }
  });
};

exports.activateAccount = (req, res) => {
  const token = req.body.token;
  user.findOne({ token: token }, (err, row) => {
    if (err || !row) {
      res.send("ERROR");
      console.log(token);
    } else if (row) {
      res.send("ACTIVATED");
      row.token = "expired";
      row.active = true;
      row.save();
    }
  });
};
