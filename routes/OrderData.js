const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orderData", async (req, res) => {
  try {
    const data = { order_data: req.body.order_data };
    const eID = await Order.findOne({ email: req.body.email });

    if (eID === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.json({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/myorderdata", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({
      order_data:myData
    })
  } catch (error) {
    res.send("sever Error",error.message);
  }
});

module.exports = router;
