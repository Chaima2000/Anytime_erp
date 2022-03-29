const express = require("express");

const multer  = require('multer');

const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { mongoose } = require("./database/mongoose");
const user = require('../server/database/models/user.model');

// server settings
app = express();
app.enable("trust proxy");
app.listen(process.env.PORT, () => {
  console.log("RUNNING ON PORT " + process.env.PORT + " ...");
});
app.use(
  cors({
    origin: ["https://anytime-anywhere-erp.web.app", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
// production samesite = none // secure = true ..
// development samesite = lax // secure = false ..
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    key: "user",
    resave: false,
    secret: "AnytimeAnywhereERP",
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 48,
      sameSite: "lax",
    },
  })
);
/**Upload files **/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, '../client/src/files');
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});
const upload = multer({storage : storage});




// importing routes
const authentication = require("./routes/authentication");
const users = require("./routes/users");
const banks = require("./routes/banks");
const clients = require("./routes/clients");
const projects = require("./routes/project");
const tasks = require("./routes/task");
// const { pipeline } = require("nodemailer/lib/xoauth2");
// server API'S

// Auth
app.get("/", (req, res) => {
  res.send("RUNNING SERVER ON PORT: " + process.env.PORT);
});

app.post("/createaccount", authentication.createAccount);

app.post("/login", authentication.login);

app.get("/getlogin", authentication.getlogin);

app.post("/logout", authentication.logout);

app.post("/forgotpassword", authentication.forgotPassword);

app.post("/checkresettoken", authentication.checkResetToken);

app.post("/resetpassword", authentication.resetPassword);

app.post("/activateaccount", authentication.activateAccount);

app.post("/checkactivatetoken", authentication.checkActivateToken);

// Users
app.post("/getusers", users.getUsers);
app.post("/getuser", users.getUser);
app.post("/toggleactivateuser", users.toggleActivateUser);
app.post("/changerole", users.changeRole);
app.delete("/deleteuser/:userId", users.deleteUser);

// Banks
app.get("/getbanks", banks.getBanks);
app.post("/addbank", banks.addBank);

//Clients
app.get("/getclients", clients.getClients);
app.post("/getclient", clients.getClient);
app.post("/addclient", clients.AddClient);
app.delete("/deleteclient/:id", clients.deleteClient);
app.get("/editclient", clients.getClient);

//Projects
app.post("/addproject", upload.array('file'), projects.addProject);
app.delete("/deleteproject/:id", projects.deleteProject);
app.get("/getprojects", projects.getProjects);
app.get("/getmembers", projects.getMembers);

//Tasks
app.post("/addTask" , tasks.addTask);



