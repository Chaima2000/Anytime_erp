const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { mongoose } = require("./database/mongoose");
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
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended: true  , parameterLimit: 100000 , limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb"}));
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

// importing routes
const authentication = require("./routes/authentication");
const users = require("./routes/users");
const banks = require("./routes/banks");
const receipts = require("./routes/receipts");
const checks = require("./routes/checks");
const clients = require("./routes/clients");
const projects = require("./routes/project");
const tasks = require("./routes/task");
const expenses = require("./routes/expense");
const contacts = require("./routes/contact");
const { path } = require("express/lib/application");
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
app.post("/getbanks", banks.getbanks);
app.delete("/deletebank/:id", banks.deleteBank);
app.post("/addbank", banks.addBank);

// Checks 
app.get("/check/getclient/:id", checks.getClient);
app.post("/addcheck", checks.addCheck);
app.get("/getprojects", checks.getProjects);

//Receipts
app.post("/addreceipt",receipts.addReceipt);
app.get("/getbank",receipts.getBanks);
app.post("/getreceipts",receipts.getreceipts);

//Clients
app.post("/getclients", clients.getClients);
app.post("/getclient", clients.getClient);
app.put("/updateclient/:id", clients.editClient);
app.post("/addclient", clients.AddClient);
app.delete("/deleteclient/:id", clients.deleteClient);
app.get("/editclient", clients.getClient);

//Projects
app.post("/addproject", projects.addProject);
// app.post("/getclient/:id", projects.getClient);
app.put("/updateproject", projects.updateProject);
app.delete("/deleteproject/:id", projects.deleteProject);
app.post("/getprojects", projects.getprojects);
app.post("/getproject", projects.getProject);
app.get("/getmembers", projects.getMembers);
app.get("/getclients", projects.getClients);



//Tasks
app.post("/addTask" , tasks.addTask);
app.put("/updateTask/:id", tasks.editTask);
app.get("/getTasks", tasks.getTasks);
app.delete("/deleteTask/:id", tasks.deleteTask);

//Expenses
app.post("/addExpense" , expenses.addExpense);
app.post("/getExpenses", expenses.getexpenses);
app.delete("/deleteExpense/:id", expenses.deleteExpense);


//contact
app.post("/contact", contacts.AddContact);
