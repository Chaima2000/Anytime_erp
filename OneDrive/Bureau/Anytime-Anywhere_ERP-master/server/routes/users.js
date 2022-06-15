const { project } = require("../database/models/project.model");
const { user } = require("../database/models/user.model");

exports.getUsers = async (req, res) => {
  var currentPage;
  var searchTerm;
  var allPages = [];
  var counter=user.count();

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
              { role: "SUPER-ADMIN" },
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
exports.getProject = async (req,res) => {
  const id=req.params.id;
  try {
    const user = await project.find({'user':id});
    const projects=[];
    for(let i=0;i<user.length;i++){
      const userFullproject= user[i].name;
      projects[i]=userFullproject;
    }
    res.send(projects);
    console.log(id)
    
  }catch(err){
    res.send("error");
    console.log(err)
  }
  
}
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
exports.getCurrentUser = async(req, res) => {
  const id = req.params.id;
  try{
    const currentUser=await user.findById(id);
  res.send(currentUser)
  }catch(err){
    return res.status(500).send({err:"error"})
  }
  
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
  user.findById(id, (error, row) => {
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

exports.editUsers = async (req,res) => {
  const password = req.body.password;
  const id = req.body.id;
  // const firstName = req.body.firstName;
  // const lastName= req.body.lastName;
  // const password = req.body.password;
try{
  await user.findById(id, (error, row) => {
    row.password= password;
    // row.firstName = firstName;
    // row.lastName=lastName;
    // row.password = password;
    // row.email = email;
    row.save();
  });
} catch(err) {
  console.log(err);
}
res.send('updated')
}
