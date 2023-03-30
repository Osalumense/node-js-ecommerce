const fs = require("fs");
const path = require("path");
const { models } = require('../db/sequelize');
const { validateSellRequest } = require("../config/validations");
const config = require("../config/config");
const {sendMail} = require("../config/function");


class Sell {
  // Delete Image from uploads -> products folder
  static deleteImages(images, mode) {
    var basePath =
      path.resolve(__dirname + "../../") + "/public/uploads/products/";
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = "";
      if (mode == "file") {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

  async getAllRequests(req, res) {
    try {
      let saleRequests = await models.sell.findAll();
      return res.json({ saleRequests });
    } catch (err) {
      console.log(err);
    }
  }

  async postAddRequest(req, res) {
    const { error } = validateSellRequest(req.body);
    if(error) return res.json({ error: `${error.details[0].message}` });
    let { name, email, whatsAppContact, address, preferredDevice, category, amount, extraNotes, isSwap, isSale, deviceName } =
      req.body;
    let images = req.files;
    
    if (images.length !== 2) {
      Sell.deleteImages(images, "file");
      return res.json({ error: "Provide at least 2 images" });
    } else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }
        let newRequest = await models.sell.create({
            name: name,
            email: email,
            whatsappContact: whatsAppContact,
            address: address,
            amount: amount,
            category: category,
            deviceName: deviceName,
            isSwap: isSwap,
            isSale: isSale,
            preferredDevice: preferredDevice,
            extraNotes: extraNotes,
            images: JSON.stringify(allImages)
        });
        const userMessage = {
          "email": newRequest.email,
          "firstName": newRequest.name,
          "deviceName": newRequest.deviceName,
          "preferredDevice": newRequest.preferredDevice,
          "amount": newRequest.amount,
          "address": newRequest.address,
          "whatsappContact": newRequest.whatsappContact,
          "subject": `Sale request to ${config.APP_NAME}`,
          "mailType": 'newOfferMail'
        }
        sendMail(userMessage);
        const adminMessage = {
          "email": `${config.ADMIN_MAIL}`,
          "offerUrl": `${config.CLIENT_URL}/admin/dashboard/sale-requests`,
          "subject": `New Sale request on ${config.APP_NAME}`,
          "mailType": 'newOfferAdminMail'
        }
        sendMail(adminMessage);
        return res.json({ success: "Request created successfully" });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Get single request
  async getSingleRequest(req, res) {
    let { sellId } = req.body;
    if(!sellId) {
      return res.json({ error: "Id cannot be empty" });
    } else {
      try {
        let saleRequests = await models.sell.findAll();
        return res.json({ saleRequests });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Update request
  async postUpdateRequest(req, res) {
    let { sellId, offer, offerAmount } = req.body;
    if(!sellId || !offer || !offerAmount) {
      return res.json({ error: "Offer and offer amount cannot be empty" });
    } else {
      try {
        const saleRequest = await models.sell.findOne({ where: { id: sellId } });
        let updateRequest = await saleRequest.update({
            offerAmount: offerAmount,
            offer: offer
        });
        // Send email to user
        const message = {
          "email": saleRequest.email,
          "firstName": saleRequest.name,
          "offerAmount": offerAmount,
          "offer": offer,
          "subject": `You have a new offer on ${config.APP_NAME}`,
          "mailType": 'offerMadeMail'
        }
        sendMail(message);
        return res.json({ success: "Offer made, seller will be sent the offer" });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postUserAcceptRequest(req, res) {
    let { offerAccepted, sellId } = req.body;
    if(!sellId || !offerAccepted) {
      return res.json({ error: "User must accept or decline request" });
    } else {
      try {
        const saleRequest = await models.sell.findOne({ where: { id: sellId } });
        let updateRequest = await saleRequest.update({
            offerAccepted: offerAccepted
        });
        // Send email to user
        return res.json({ success: "Request saved successfully" });
      } catch (err) {
        console.log(err);
      }
    }
  }

  //
  async postDeleteRequest(req, res) {
    let { sellId } = req.body;
    if (!sellId) {
      return res.json({ error: "Id cannot be empty" });
    } else {
      try {
        let deleteRequestObj = await models.sell.findOne({ where: { id: sellId} });
        let deleteRequest = await deleteRequestObj.destroy();
        if (deleteRequest) {
          // Delete Image from uploads -> products folder
          Sell.deleteImages(deleteRequestObj.images, "string");
          return res.json({ success: "Product deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

const sellController = new Sell();
module.exports = sellController;
