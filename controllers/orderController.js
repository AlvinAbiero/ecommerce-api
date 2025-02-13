const Order = require("../models/Order");
const Cart = require("../models/Cart");
const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Cart is empty",
      });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(cart.total * 100),
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: cart.total,
      shippingAddress,
      paymentId: paymentIntent.id,
    });

    //   Clear the cart
    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json({
      success: true,
      order,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );

    res.json(201).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
