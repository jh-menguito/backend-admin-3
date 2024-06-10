module.exports = (app) => {
  const drivers = require("../controllers/driver.controller");
  const router = require("express").Router();

  router.post("/add", drivers.create);

  router.get("/list", drivers.findAll);

  router.put("/update/:id", drivers.update);

  router.delete("/delete/:id", drivers.delete);

  app.use("/api/drivers", router);
};
