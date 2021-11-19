// import the model from item-model
const { Item } = require('./item-model')

// get all items function
async function findAll() {
    // return a new promise either resolved or reject
    return new Promise((resolve,reject) => {
        // search for the item
        Item.find({})
        // either return items or error
        .then(items => resolve(items))
        .catch(error => reject(error));
    });
}