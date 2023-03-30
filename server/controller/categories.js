const { toTitleCase } = require("../config/function");
const { models } = require('../db/sequelize');
const fs = require("fs");

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await models.categories.findAll();
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    let cImage = req.file.filename;
    const filePath = `../server/public/uploads/categories/${cImage}`;

    if (!cName || !cDescription || !cStatus || !cImage) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
        return res.json({ error: "All filled must be required" });
      });
    } else {
      cName = toTitleCase(cName);
      try {
        let checkCategoryExists = await models.categories.findOne({ where: {cName: cName} });
        if (checkCategoryExists) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ error: "Category already exists" });
          });
        } else {
          const newCategory = await models.categories.create({
            cName: cName,
            cDescription: cDescription,
            cStatus: cStatus,
            cImage: cImage,
          });
          return res.json({ success: "Category created successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All required fields must be filled" });
    }
    const category = await models.categories.findOne({ where: { id: cId} });
      if ( !category ) return res.json({ error: "Category does not exist" });
    try {
      category.update({
        cDescription: cDescription,
        cStatus: cStatus,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getDeleteCategory(req, res) {
    let { cId } = req.body;
    if (!cId) {
      return res.json({ error: "All required fields must be filled" });
    } else {
      try {
        let category = await models.categories.findById(cId);
        const filePath = `../server/public/uploads/categories/${category.cImage}`;
        let deleteCategory = await category.destroy({ where: { cId: cId} });
        if (deleteCategory) {
          // Delete Image from uploads -> categories folder 
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Category deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
