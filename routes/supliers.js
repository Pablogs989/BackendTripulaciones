const express = require("express");
const SuplierController = require("../controllers/SuplierController.js");
const router = express.Router();
const { authentication } = require("../middleware/authentication.js");

router.post("/", SuplierController.register);
router.post("/login", SuplierController.login);
router.get("/companies", SuplierController.getAllCompanies); //revisar por que no me deja entrar si yo estoy logueado
router.get("/company/:companyName", SuplierController.getCompanyByName);
router.get("/company/id/:_id", SuplierController.getCompanyById);
router.get("/company/category/:category",SuplierController.getCompanyByCategory)
router.get("/company/interest/:interest",SuplierController.getCompanyByinterests)
router.delete("/logout", authentication, SuplierController.logout); // no me deja desloguearme por el token

module.exports = router;
