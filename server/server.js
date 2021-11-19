// import all required dependencies for the software to run
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const { User } = require("./user");
const { Item } = require("./items")
const { Token, verifyTokenMiddleware } = require("./token");

// initialize environment configuration
dotenv.config();
const port = process.env.PORT;
const dbUrl = process.env.DB_PASS;

// setup http middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())


// create connection to db
mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log("Connection to DB fail");
    console.error(err);
  } else {
    console.log("Connection to DB succefful");
  }
});
// handler – handle http communication (get data from http request, return http response)

// handle http communication
// query db + handle db errors
const getAllPost = async (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
};

// handle http communication
// define item object
// query db + handle db errors
const createItem = async (req, res) => {

  // define item object
  const date = new Date();
  const item = req.body;
  item.createdAt = date;

  Item.insertMany(item, function (err) {
    if (err) {
      res.status(503);
      console.log(err);
    } else {
      console.log("Succesfully saved all new items to the DB");
      res.status(201).json({ message: "item created" });
    }
  });
};

// handle http communication
// query db + handle db error
const deletePost = async (req, res) => {
  const { id } = req.params;
  Item.deleteOne({ id }, function (err) {
    if (err) {
      res.status(404);
      console.log(err);
    } else {
      console.log("Succesfully deleted post");
      res.status(202).json({ message: "post deleted" });
    }
  });
};

// handle http communication
// query db + handle db error
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const isDone = !req.body.item.isDone;
  Item.updateOne({ _id: id }, { isDone }, (err) => {
    if (err) {
      res.status(404);
      console.log(err);
    } else {
      console.log("Succesfully update post");
      res.status(200).json({ message: "Updated status !" });
    }
  });
};

// handle http communication
// query db + handle errors
const deleteAll = async (req, res) => {
  Item.deleteMany({ isDone: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("ALL HAVE BEEN DELETED");
      res.status(200).json({ message: "HAHA CONSUME" });
    }
  });
};

// define item routes
app.get("/api/items", verifyTokenMiddleware, getAllPost);
app.post("/api/items", createItem);
app.delete("/api/items/:id", deletePost);
app.patch("/api/items/:id", verifyTokenMiddleware, updateStatus);
app.delete("/api/items", deleteAll);

// users !! @@ //

// handle http communication
const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json(data);
  } catch (error) {
    // handle catch
    res.status(500).json({
      message: error.message
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
    res.status(500);
  }
};

// handle http communication
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User
      .findUserByCredentials(email, password);
    const token = Token.create(user._id, user.email, {
      first_name: user.first_name
    });
    res.status(200).json({ token })
  } catch (err) {
    res.status(401).send(err.message)
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