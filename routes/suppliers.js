const express = require("express");
const SupplierController = require("../controllers/SupplierController.js");
const router = express.Router();
const { authentication } = require("../middleware/authentication.js");
const {imageLoad} =require('../middleware/multer.js')

router.post("/",imageLoad, SupplierController.register);
router.post("/login", SupplierController.login);
router.get("/companies", SupplierController.getAllCompanies); //revisar por que no me deja entrar si yo estoy logueado
router.get("/company/:companyName", SupplierController.getCompanyByName);
router.get("/company/id/:_id", SupplierController.getCompanyById);
router.get("/company/category/:category",SupplierController.getCompanyByCategory)
router.get("/company/interest/:interest",SupplierController.getCompanyByinterests)
router.delete("/logout", authentication, SupplierController.logout); // no me deja desloguearme por el token

module.exports = router;
