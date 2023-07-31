const Cart = require("../models/cart");

const getCartList = async (req, res) => {
  try {
    const cartList = await Cart.find().populate("user");
    if (!cartList) {
      return res.status(400).send("No carts available :/");
    }
    res.send(cartList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch carts.");
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate({ path: "cartItems", populate: { path: "item" } })
      .populate("user");
    if (!cart) {
      return res.status(400).send("Cannot display cart :/");
    }
    res.send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch cart by ID.");
  }
};

const getAdminOrders = async (req, res) => {
  try {
    const cartList = await Cart.find()
      .populate({ path: "cartItems", populate: { path: "item" } })
      .populate("user");
    if (!cartList) {
      return res.status(400).send("No carts available :/");
    }
    res.send(cartList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch admin orders.");
  }
};

const getPreviousOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const previousOrders = await Cart.find({ user: userId }).populate({
      path: "cartItems",
      populate: { path: "item" },
    });
    res.send(previousOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch previous orders.");
  }
};

const createCart = async (req, res) => {
  const { cartItems, user } = req.body;

  try {
    const totalPrices = await Promise.all(
      cartItems.map(async (cartItem) => {
        const totalPrice = cartItem.item.price * cartItem.quantity;
        return totalPrice;
      })
    );

    const cart = new Cart({
      cartItems: cartItems,
      user: user,
      totalPrice: totalPrices.reduce((a, b) => a + b, 0),
      timestamp: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }), 
    });

    const savedCart = await cart.save();
    res.send(savedCart);
  } catch (error) {
    console.error(error);
    res.status(400).send("Cart cannot be created :/");
  }
};

module.exports = {
  getCartList,
  getCartById,
  getAdminOrders,
  getPreviousOrdersByUserId,
  createCart,
};
