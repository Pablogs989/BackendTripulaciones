const Supplier = require("../models/Supplier.js");
const User = require("../models/User.js");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const SupplierController = {
  async register(req, res, next) {
    //crear ususarios dummy
    try {
      const ids_user_supplier = await req.body.emails.map(async (email, i) => {
        const newUser = await User.create({
          email,
          password: req.body.company_name + i,
          name: req.body.company_name + i,
          surname: req.body.company_name + i,
          phone_prefx: `+34`,
          phone_number: `64245127`,
          address: `calle falsa 1234`,
          zip_code: `46021`,
          city: `Valencia`,
          country: `Espana`,
          user_type: `supplier`,
          url_linkedin: `www.linkedin/yourlinkdinName.com`,
          company: req.body.company_name,
          job_title: "Desarrollador de Contenidos",
        });
         return newUser._id;
        
      });

      const newSupplier = await Supplier.findOne({
        cif: req.body.cif,
      });

      if (!newSupplier) {
        if (!req.body.password) {
          return res.status(400).send("Complete the password field");
        }
        const password = await bcrypt.hash(req.body.password, 10);
        let supplier = await Supplier.create({
          ...req.body,
          password,
        });
        console.log(ids_user_supplier);
        supplier = await Supplier.findByIdAndUpdate(supplier._id, {
          ids_user_supplier,
        });

        res.status(201).send({
          message:
            "Welcome, you are one step away from registering, check your email to confirm your registration",
          supplier,
        });
      } else {
        return res.status(400).send("Supplier already exists");
      }
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const supplier = await Supplier.findOne({
        cif: req.body.cif,
      });
      if (!supplier) {
        return res.status(400).send("Invalid CIF or password");
      }
      if (
        !req.body.password ||
        !bcrypt.compareSync(req.body.password, supplier.password)
      ) {
        return res.status(400).send("Invalid CIF or password");
      }

      const token = jwt.sign({ _id: supplier._id }, JWT_SECRET);
      if (supplier.tokens.length > 4) supplier.tokens.shift();
      supplier.tokens.push(token);
      await supplier.save();
      res.status(200).send({
        message: "Welcome " + supplier.name,
        token,
        supplier,
      });
    } catch (error) {
      next(error);
    }
  },
  async logout(req, res) {
    try {
      await Supplier.findByIdAndUpdate(req.supplier._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Logged out" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem logging out the supplier",
      });
    }
  },
  async getAllCompanies(req, res) {
    try {
      const companies = await Supplier.find();
      res.send(companies);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem getting the companies",
      });
    }
  },
  async getCompanyByName(req, res) {
    try {
      const companyName = req.params.companyName;
      const company = await Supplier.findOne({ company_name: companyName });

      if (!company) {
        return res.status(404).send({
          message: "Company not found",
        });
      }

      res.send(company);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem getting the company",
      });
    }
  },
  async getCompanyById(req, res) {
    try {
      const companyId = req.params._id;
      const company = await Supplier.findById(companyId);
      if (!company) {
        return res.status(404).send({
          message: "Company not found",
        });
      }
      res.send(company);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem getting the company",
      });
    }
  },
  async getCompanyByCategory(req, res) {
    try {
      const companyCategory = req.params.category;
      const company = await Supplier.find({ type_collab: companyCategory });
      if (!company) {
        return res.status(404).send({
          message: "Company not found",
        });
      }
      res.send(company);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem getting the company",
      });
    }
  },
  async getCompanyByinterests(req, res) {
    try {
      const companyInterest = req.params.interest;
      const company = await Supplier.find({ interests: companyInterest });
      if (!company) {
        return res.status(404).send({
          message: "Company not found",
        });
      }
      res.send(company);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem getting the company",
      });
    }
  },
};

module.exports = SupplierController;
