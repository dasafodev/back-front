var express = require("express");
var router = express.Router();
const Mongolib = require("../db/Mongolib");

/* GET home page. */
router.get("/", function (req, res, next) {
  Mongolib.getDatabase((db) => {
    Mongolib.findDocuments(db, (docs) => {
      res.send(docs);
    });
  });
});

router.post("/", function (req, res, next) {
    
  Mongolib.getDatabase((db) => {
    const data = {
      name: req.body.name,
      company: req.body.company,
      salary: req.body.salary,
      city: req.body.city,
    };
    Mongolib.addDocument(db, data, (resp) => {
      console.log(resp);
      res.send(resp);
    });
    // Mongolib.findDocuments(db, docs => {
    //     res.send(docs);
    // })
  });
});

module.exports = router;
