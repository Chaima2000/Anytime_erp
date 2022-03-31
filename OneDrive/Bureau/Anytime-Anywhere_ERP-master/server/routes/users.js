const { user } = require("../database/models/user.model");

exports.getUsers = async (req, res) => {
  var currentPage;
  var searchTerm;
  var allPages = [];

  if (req.body.currentPage) {
    currentPage = req.body.currentPage;
  } else {
    currentPage = 1;
  }
  if (req.body.searchTerm) {
    searchTerm = req.body.searchTerm;
  } else {
    searchTerm = "";
  }

  try {
    const users = await user
      .find({
        $and: [
          {
            $or: [
              { role: "USER" },
              { role: "ADMIN" },
              { role: "DEVELOPER" },
              { role: "DESIGNER" },
              { role: "MARKETING" },
            ],
          },
          { firstName: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
        ],
      })
      .limit(10)
      .skip((currentPage - 1) * 10)
      .sort({ date: -1 })
      .exec();

    const count = await user.countDocuments({
      firstName: { $regex: ".*" + searchTerm + ".*" },
    });
    let totalPages = Math.ceil(count / 10);

    for (let i = 1; i <= totalPages; i++) {
      allPages.push(i);
    }
    res.send({
      users,
      allPages,
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.getUser = (req, res) => {
  const id = req.body.id;
  user.findById(id, (err, row) => {
    if (row) {
      res.send(row);
    } else {
      res.send("ERROR");
    }
  });
};

exports.toggleActivateUser = (req, res) => {
  const id = req.body.id;
  user.findById(id, (err, row) => {
    if (row) {
      row.active = !row.active;
      try {
        row.save();
        res.send("SUCCESS");
      } catch (error) {
        res.send("ERROR");
      }
    } else {
      res.send("ERROR");
    }
  });
};

exports.changeRole = (req, res) => {
  const id = req.body.id;
  const role = req.body.role;
  user.findById(id, (err, row) => {
    if (row) {
      row.role = role;
      try {
        row.save();
        res.send("SUCCESS");
      } catch (error) {
        res.send("ERROR");
      }
    } else {
      res.send("ERROR");
    }
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.userId;
  user.findByIdAndRemove(id, (err) => {
    if (err) {
      res.send("ERROR");
    } else {
      res.send("SUCCESS");
    }
  });
};

