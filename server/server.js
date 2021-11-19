// import all required dependencies for the software to run
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { User } = require("./user");
const { Item } = require("./item");
const { Token, verifyTokenMiddleware } = require("./token");

// initialize environment configuration
dotenv.config();
const port = process.env.PORT;
const dbUrl = process.env.DB_PASS;

// setup http middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// create connection to db
mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log("Connection to DB fail");
    console.error(err);
  } else {
    console.log("Connection to DB succefful");
  }
});

// handle http communication
const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// handle http communication
const createItem = async (req, res) => {
  try {
    const item = req.body;
    const persistedItem = await Item.create(item);
    res.status(201).json({ item: persistedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// handle http communication
const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.removeById(id);
    res.status(202).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// handle http communication
const toggleItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.toggleStatusById(id);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// handle http communication
const removeAllItems = async (req, res) => {
  try {
    Item.removeAllByStatus(true);
    res.status(202).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// define item routes
app.get("/api/items", verifyTokenMiddleware, getAllItems);
app.post("/api/items", createItem);
app.delete("/api/items/:id", removeItem);
app.patch("/api/items/:id/status", verifyTokenMiddleware, toggleItemStatus);
app.delete("/api/items", removeAllItems);

// handle http communication
const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json(data);
  } catch (error) {
    // handle catch
    res.status(500).json({
      message: error.message,
    });
  }
};

// handle http communication
const registerUser = async (req, res) => {
  try {
    // destructoring variables
    const { first_name, email, password } = req.body;
    await User.create({
      email,
      password,
      first_name,
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// handle http communication
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findUserByCredentials(email, password);
    const token = Token.create(user._id, user.email, {
      first_name: user.first_name,
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).send(err.message);
    console.log(err);
  }
};

// define user routes
app.get("/api/users", verifyTokenMiddleware, getAllUsers);
app.post("/api/users/register", registerUser);
app.post("/api/users/login", loginUser);

// initialize server
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
