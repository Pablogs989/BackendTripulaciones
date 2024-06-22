const Suplier = require("../models/Suplier.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const SuplierController = {
  async register(req, res, next) {
    try {
      const newSuplier = await Suplier.findOne({
        cif: req.body.cif,
      });
      if (!newSuplier) {
        if (!req.body.password) {
          return res.status(400).send("Complete the password field");
        }
        const password = await bcrypt.hash(req.body.password, 10);
        const suplier = await Suplier.create({
          ...req.body,
          password,
        });
        res.status(201).send({
          message:
            "Welcome, you are one step away from registering, check your email to confirm your registration",
          suplier,
        });
      } else {
        return res.status(400).send("User already exists");
      }
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const suplier = await Suplier.findOne({
        cif: req.body.cif,
      });
      if (!suplier) {
        return res.status(400).send("Invalid CIF or password");
      }
      if (
        !req.body.password ||
        !bcrypt.compareSync(req.body.password, suplier.password)
      ) {
        return res.status(400).send("Invalid CIF or password");
      }

      const token = jwt.sign({ _id: suplier._id }, JWT_SECRET);
      if (suplier.tokens.length > 4) suplier.tokens.shift();
      suplier.tokens.push(token);
      await suplier.save();
      res.status(200).send({
        message: "Welcome " + suplier.name,
        token,
        suplier,
      });
    } catch (error) {
      next(error);
    }
  },
  async logout(req, res) {
    try {
      await Suplier.findByIdAndUpdate(req.suplier._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Logged out" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem logging out the suplier",
      });
    }
  },
  async getAllCompanies(req, res) {
    try {
      const companies = await Suplier.find();
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
      const company = await Suplier.findOne({ company_name: companyName });

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
      const company = await Suplier.findById(companyId);
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

module.exports = SuplierController;
