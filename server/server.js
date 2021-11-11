const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const dbUrl = process.env.DB_PASS;

mongoose.connect(dbUrl, (err) => {
    if(err){
        console.log('Connection to DB fail');
    } else {
        console.log('Connection to DB succefful');
    }
});

const itemSchema = new mongoose.Schema({

    responsibilityId: Number,
    name: String,
    currClass: String,
    content: String,
    createdAt: Date,
    isDone: {
        type: Boolean,
        default: false
    }
})

const Item = mongoose.model('Item', itemSchema);


const getAllPost = (req,res) => {
    Item.find({}, (err,items) => {
        if(err){
            console.log(err);
        } else {
            res.json(items)
        }
    })
}

const createItem = (req,res) => {
    const item = req.body;
    try {
        Item.insertMany(item,function(err) {
            if(err){
                res.status(503)
                console.log(err);
            }else {
                console.log("Succesfully saved all new items to the DB");
                res.status(201).json({message: 'user created'})
            }
        })
    } catch (error) {
        
    }
    
}

const deletePost = (req,res) => {
    const {id} = req.params;
    Item.deleteOne({}, function(err){
        if(err){
            res.status(404)
            console.log(err);
        }else {
            console.log("Succesfully deleted post");
            res.status(202).json({message: 'post deleted'})
        }
    })
}

app.get('/api/items', getAllPost)

app.post('/api/items', createItem)

app.delete('/api/items/:id', deletePost)

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
})
  