const { client } = require("../database/models/clients.model");

  exports.getClients = async (req, res) => {
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
      const clients = await client
        .find({society: { $regex: ".*" + searchTerm + ".*" }})
        .limit(10)
        .skip((currentPage - 1) * 10)
        .sort({ date: -1 })
        .exec();
  
      const count = await client.countDocuments({
        society: { $regex: ".*" + searchTerm + ".*" },
      });
      let totalPages = Math.ceil(count / 10);
      for (let i = 1; i <= totalPages; i++) {
        allPages.push(i);
      }
      res.send({
        clients,
        allPages,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
    exports.AddClient = (req, res) => {
    const type = req.body.type;
    const society = req.body.society;
    const activity = req.body.activity;
    const email = req.body.email;
    const ceo = req.body.ceo;
    const phone = req.body.phone;
    const city = req.body.city;
    const country = req.body.country;
    const zipCode = req.body.zipCode;
    const address = req.body.address;

    const newClient = new  client({
      type: type,
      society: society,
      activity: activity,
      email: email,
      ceo: ceo,
      phone: phone,
      city:city,
      country:country,
      zipCode:zipCode,
      address: address
    });
    try {
        newClient.save();
        res.send("SUCCESS");
      } catch (e) {
        res.send("ERROR");
        console.log(e);
      }
    };
    exports.deleteClient =(req,res) => {
      const id = req.params.id;
      client.findByIdAndRemove(id, (err) => {
        if (err) {
          res.send("ERROR");
        } else {
          res.send("SUCCESS");
        }
      });
    }
    exports.editClient = (req,res) => {
      const id = req.body.id;
      const type = req.body.type;
      const society = req.body.society;
      const activity = req.body.activity;
      const email = req.body.email;
      const ceo = req.body.ceo;
      const phone = req.body.phone;
      const city = req.body.city;
      const country = req.body.country;
      const zipCode = req.body.zipCode;
      const address = req.body.address;
      task.findById( id, (error, row) => {
        if( row) {
          row.type = type;
          row.society = society;
          row.activity = activity;
          row.email = email;
          row.ceo = ceo;
          row.phone = phone;
          row.city = city;
          row.country = country;
          row.zipCode = zipCode;
          row.address = address;
          try {
            row.save();
            res.send("SUCCESS");
          } catch ( error)  {
            res.send ( "ERROR");
          }} else {
            res.send ("ERROR");
          }
        })
    };
    exports.getClient = (req, res) => {
      const id = req.body.id;
      client.findById(id, (err, row) => {
        if (row) {
          res.send(row);
        } else {
          res.send("ERROR");
        }
      });
    };
    



  