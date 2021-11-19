// import model and schema from item-model
const { itemModel, itemSchema } = require('./item-model');
const Item = require('./item');

// exporting (why we need to export the schema.)
module.exports = {
    itemSchema,
    itemModel,
    Item
}