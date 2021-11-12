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
                res.status(201).json({message: 'item created'})
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

const updateStatus = (req,res) => {
    const {id} = req.params;
    Item.updateOne({_id:id}, {isDone: true}, err => {
        if(err){
            res.status(404)
            console.log(err);
        }else {
            console.log("Succesfully update post");
            res.status(200).json({message: 'Updated status !'})
        }
    })
}

// const deleteAll = (req,res) => {
//     Item.deleteMany({isDone: true}, err => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("ALL HAVE BEEN DELETED");
//             res.status(200).json({message: 'HAHA CONSUME'})
//         }
//     })
// }

app.get('/api/items', getAllPost)

app.post('/api/items', createItem)

app.delete('/api/items/:id', deletePost)

app.patch('/api/items/:id', updateStatus)

// app.delete('/api/items', deleteAll)

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
})
  