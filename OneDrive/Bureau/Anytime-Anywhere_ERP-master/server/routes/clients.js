const { client } = require("../database/models/clients.model");

  exports.getClients = (req, res) => {
    client.find({}).then((clients) => {
      res.send(clients)
    });
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
    exports.editClient =(req,res) => {
      const id = req.params.id;
      client.findById(id, (err) => {
        if (err) {
          res.send("ERROR");
        } else {
          res.send("SUCCESS");
        }
      });
    }
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
    



  