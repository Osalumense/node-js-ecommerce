const fs = require("fs");
const { models } = require('../db/sequelize');

class Customize {
  async getImages(req, res) {
    try {
      let Images = await models.customizes.findAll();
      if (Images) {
        return res.json({ Images });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uploadSlideImage(req, res) {
    let image = req.file.filename;
    console.log('We are about to upload');
    console.log('Image >>>> ', image);
    if (!image) {
      return res.json({ error: "All required fields must be filled" });
    }
    try {
      let newCustomize = await models.customizes.create({
        slideImage: image,
      });
      return res.json({ success: "Image upload successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSlideImage(req, res) {
    let { id } = req.body;
    console.log('id >>> ', req.body.id);
    if (!id) {
      return res.json({ error: "All required fields must be filled" });
    } else {
      try {
        const slideImage = await models.customizes.findOne({ where: { id: id} });
        const filePath = `../server/public/uploads/customize/${slideImage.slideImage}`;

        let deleteImage = await slideImage.destroy();
        if (deleteImage) {
          // Delete Image from uploads -> customizes folder
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Image deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getAllData(req, res) {
    try {
      let Categories = await models.categories.count();
      let Products = await models.products.count();
      let Orders = await models.orders.count();
      let Users = await models.users.count();
      if (Categories && Products && Orders) {
        return res.json({ Categories, Products, Orders, Users });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const customizeController = new Customize();
module.exports = customizeController;
