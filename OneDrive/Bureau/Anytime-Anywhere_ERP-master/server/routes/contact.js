const { contact } = require("../database/models/contact.model")

    exports.AddContact = (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    const newContact = new  contact({
      fullName : fullName,
      email: email,
      phone: phone,
      message: message,
    });
    try {
        newContact.save();
        res.send("SUCCESS");
      } catch (e) {
        res.send("ERROR");
        console.log(e);
      }
    };

    

  