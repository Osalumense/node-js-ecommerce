const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const { models } = require('../db/sequelize');

class User {
  async getAllUser(req, res) {
    try {
      let Users = await models.users.findAll()
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await models.users.findOne({ where: { id: uId } });
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // TODO: Fix this place
  async postAddUser(req, res) {
    console.log(req.body);
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All required fields must be filled" });
    } else {
      try {
        let newUser = await models.users.create({
            firstName: data.firstName,
            lastName: data.lastName,
            startDate: data.startDate,
            endDate: data.endDate,
            passengers: data.passengers,
            email: data.email,
            message: data.message
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: "User created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postEditUser(req, res) {
    let { uId, firstName, lastName, address, phoneNumber } = req.body;
    if (!uId || !firstName || !phoneNumber) {
      return res.json({ message: "Required fields must be filled" });
    } else {
      try {
        let currentUser = await models.users.findOne({where: {id: uId}});
        const updateUser = await currentUser.update({
          firstName: firstName,
          lastName: lastName,
          address: address,
          phoneNumber: phoneNumber
        });
        return res.json({ success: "User updated successfully" });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getDeleteUser(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let currentUser = await models.users.findOne({where: {id: uId}});
        const updateUser = await currentUser.update({  
          status: status,
          updatedAt: Date.now(),
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        
      const data = await models.users.unscoped().findOne({where: {id: uId}});
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = await data.update({
            password: newPassword,
          });
          return res.json({ success: "Password updated successfully" });
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      } 
    } catch (e) {
      console.log(e);
    }
    }
  }
}

const ordersController = new User();
module.exports = ordersController;
