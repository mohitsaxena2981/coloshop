const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).send("No users found :/");
    }
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch users.");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return res.status(404).send("No user found :/");
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch user by ID.");
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, address, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).send("User with this email already exists");
    }

    const passwordHash = bcrypt.hashSync(password);

    let user = new User({
      name: name,
      email: email,
      passwordHash: passwordHash,
      address: address,
      isAdmin: isAdmin === false,
    });

    user = await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "User cannot be created.",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    if (currentUser.email !== req.body.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).send("User with this email already exists");
      }
    }

    let newPassword;
    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        passwordHash: newPassword,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).send("No user found :/");
    }

    res.send(updatedUser);
  } catch (error) {
    console.error("Error occurred while updating user:", error);
    res.status(500).send("An error occurred while updating user.");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Invalid email");
    }

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.secret,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        user: user._id,
        isAdmin: user.isAdmin,
        token: token,
      });
    } else {
      return res.status(400).send("Invalid email or password :/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Login failed.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
      return res.status(404).send("User not found :/");
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to delete user.",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  loginUser,
  deleteUser,
};
