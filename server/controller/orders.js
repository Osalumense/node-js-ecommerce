const { models } = require('../db/sequelize');
const { validateOrderRequest } = require("../config/validations");
class Order {
  async getAllOrders(req, res) {
    try {
      const Orders = []
      // {include: [{ model: models.orderProductMapping, as: 'orderProduct' }]}
      let order = await models.orders.findAll();
      for (let i = 0; i < order.length; i++) {
        const prods = []
        for(let j = 0; j < order[i].allProduct.length; j++) {
          let prod = {
            prod: await models.products.findOne({ where: { id: order[i].allProduct[j].id }}),
            orderProduct: await models.orderProductMapping.findOne({ where: { orderId: order[i].id, productId: order[i].allProduct[j].id }}),
          }
          prods.push(prod)
        }
        let ord = {
          Orders: order[i],
          prods: prods,
          user: await models.users.findOne({ where: {id: order[i].user } })
        }
        Orders.push(ord)
      }
      return res.json({ Orders });
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let { uId } = req.body;
    console.log(uId);
    if (!uId) {
      return res.json({ message: "Required fields must be filled" });
    } else {
      try {
        let Order = []
        let order = await models.orders.findAll({ where: {user: uId} });
        // console.log('order ^^', order[0]);
        for (let i = 0; i < order.length; i++) {
          const prods = []
          for(let j = 0; j < order[i].allProduct.length; j++) {
            let prod = {
              prod: await models.products.findOne({ where: { id: order[i].allProduct[j].id }}),
              orderProduct: await models.orderProductMapping.findOne({ where: { orderId: order[i].id, productId: order[i].allProduct[j].id }}),
            }
            prods.push(prod)
          }
          let ord = {
            Order: order[i],
            prods: prods,
            user: await models.users.findOne({ where: {id: order[i].user } })
          }
          Order.push(ord)
        }
        console.log('Order', Order);
        if (Order) {
          // const { products, ...newOrder } = Order;       
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  //TODO: Add order-product-mapping table containing orderId and productId
  async postCreateOrder(req, res) {
    const { error } = validateOrderRequest(req.body);
    if(error) return res.json({ error: `${error.details[0].message}` });
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    console.log(req.body);
      try {
        let newOrder = await models.orders.create({
          allProduct: JSON.stringify(allProduct),
          user: user,
          amount: amount,
          transactionId: transactionId,
          address: address,
          phone: phone,
          status: 'Not processed'
        });
        for (const elements of allProduct) {
          // Decrease quantity by amount purchased
          const getProduct = await models.products.findOne({ where: { id: elements.id } });
          const updateQuantity = getProduct.update({
            pQuantity: getProduct.pQuantity - elements.quantitiy
          });
          const saveOrderProductMapping = await models.orderProductMapping.create({
            orderId: newOrder.id,
            productId: elements.id,
            quantity: elements.quantitiy,
            price: elements.price
          });
        }
        return res.json({ success: "Order created successfully" });
      } catch (err) {
        return res.json({ error: err });
      }
    // if (
    //   !allProduct ||
    //   !user ||
    //   !amount ||
    //   !transactionId ||
    //   !address ||
    //   !phone
    // ) {
    //   return res.json({ message: "All filled must be required" });
    // } else {

    // }
  }

  async postUpdateOrder(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let currentOrder = await models.orders.findOne({ where: {id: oId}});
        let updateOrder = await currentOrder.update({
          status: status,
        });
        return res.json({ success: "Order updated successfully" });
      } catch (e) {
        console.log(e)
      }
    }
  }

  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteOrder = await models.orders.destroy({ where: {id: oId}});
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async saveUserTransaction(req, res) {
    let { transactionId, transactionRef, status, amount, flwReference, userId } = req.body;
    const checkIfUserExists = await models.users.findOne({where: {id: userId}});
    if(!checkIfUserExists) {
      return res.json({ error: "User does not exist" });
    }
    try {
      let newOrder = await models.transactions.create({
        transactionId: transactionId,
        amount: amount,
        transactionRef: transactionRef,
        status: status,
        flwReference: flwReference,
        userId: userId
      });
      if (newOrder) {
        return res.json({ success: "Transaction saved successfully" });
      }
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
