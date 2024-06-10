const db = require("../models");
const Driver = db.drivers;

//create and save new driver
exports.create = (req, res) => {
  if (!req.body.driver_name) {
    res.status(400).send("Driver can not be empty!");
    return;
  }

  const driver = new Driver({
    driver_name: req.body.driver_name,
    plate_number: req.body.plate_number,
    bus_route: req.body.bus_route,
    email: req.body.email,
    password: req.body.password,
  });

  driver
    .save(driver)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occured while creating the driver",
      });
    });
};

//retrieve all drivers from db
exports.findAll = (req, res) => {
  Driver.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    });
};

//update a driver
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Data cannot be empty");
  }

  const id = req.params.id;
  const { driver_name, plate_number, bus_route, email, password } = req.body;
  Driver.findOneAndUpdate(
    { _id: id },
    { driver_name, plate_number, bus_route, email, password },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Driver with id = ${id}.`,
        });
      } else res.send({ message: "Driver updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Driver with id: " + id,
      });
    });
};

//delete a driver
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("id: " + id);
  Driver.deleteOne({ _id: id })
    .then((data) => {
      console.log("DATA: " + data);
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Driver with id=${id}.`,
        });
      } else {
        res.send({ message: "Driver deleteed successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete driver with id: " + id,
      });
    });
};
