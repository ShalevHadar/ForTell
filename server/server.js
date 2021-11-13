const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// middlewares
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// environments vars
const port = process.env.PORT;
const dbUrl = process.env.DB_PASS;

// checking connection to DB
mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log("Connection to DB fail");
  } else {
    console.log("Connection to DB succefful");
  }
});

// create item Schema for mongoose
const itemSchema = new mongoose.Schema({
  teacherName: String,
  name: String,
  currClass: String,
  content: String,
  createdAt: Date,
  isDone: {
    type: Boolean,
    default: false,
  },
});

const Item = mongoose.model("Item", itemSchema);

// create user Schema for mongoose

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const User = mongoose.model("user", userSchema);

// posts @@ //

const getAllPost = async (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
};

const createItem = async (req, res) => {
  const date = new Date();
  const item = req.body;
  item.createdAt = date;
  try {
    Item.insertMany(item, function (err) {
      if (err) {
        res.status(503);
        console.log(err);
      } else {
        console.log("Succesfully saved all new items to the DB");
        res.status(201).json({ message: "item created" });
      }
    });
  } catch (error) {}
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  Item.deleteOne({}, function (err) {
    if (err) {
      res.status(404);
      console.log(err);
    } else {
      console.log("Succesfully deleted post");
      res.status(202).json({ message: "post deleted" });
    }
  });
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  Item.updateOne({ _id: id }, { isDone: !req.body.item.isDone }, (err) => {
    if (err) {
      res.status(404);
      console.log(err);
    } else {
      console.log("Succesfully update post");
      res.status(200).json({ message: "Updated status !" });
    }
  });
};

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

app.get("/api/items", getAllPost);

app.post("/api/items", createItem);

app.delete("/api/items/:id", deletePost);

app.patch("/api/items/:id", updateStatus);

app.delete("/api/items", deleteAll);

// users !! @@ //

const getAllUsers = (req, res) => {
  User.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
};

const createUser = async (req, res) => {
  // destructoring variables
  const { first_name, email, password } = req.body;
  // hashing pass
  encryptedPassword = await bcrypt.hash(password, 10);
  // creating new user with hashed password
  const newUser = new User({
    first_name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  // creating jwt
  const token = jwt.sign(
    { newUser: newUser._id, email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  // give user the token :)
  newUser.token = token;

  try {
    User.create(newUser, function (err) {
      if (err) {
        res.status(503);
        console.log(err);
      } else {
        console.log("Succesfully saved all new items to the DB");
        res.status(201).json({ message: "item created" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json(user);
      console.log('User can log');
    } else {
        console.log('Password/user not currect.');
    }
  } catch (err) {
    console.log(err);
  }
};

app.get("/api/users", getAllUsers);

app.post("/api/users", createUser);

app.post("/api/users/login", loginUser);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
