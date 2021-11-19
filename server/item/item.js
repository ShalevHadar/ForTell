// query item db
const { itemModel } = require("./item-model");

// get all items from db
async function findAll() {
  return new Promise((resolve, reject) => {
    itemModel
      .find({})
      .then((items) => resolve(items))
      .catch((error) => reject(error));
  });
}

// create new item record in db
async function create(item) {
  const date = new Date();
  item.createdAt = date;
  return itemModel.create(item);
}

// remove item by ID from db
async function removeById(id) {
  const query = await itemModel.deleteOne({ id });
  if (query.deletedCount === 0) {
    throw new Error("Could not find an item with id " + id);
  }
  return true;
}

// remove all items from db
async function removeAllByStatus(status) {
   await itemModel.deleteMany({isDone:status});
   return true;
}

// update item status by ID from db
async function toggleStatusById(id) {
  const item = await itemModel.findById(id).exec();
  if (!item) {
    throw new Error("Could not find an item with id " + id);
  }
  const query = await itemModel.updateOne({ _id: id }, { isDone: !item.isDone });
  if (query.modifiedCount === 0){
    throw new Error("Could not update an item with id " + id);
  }
  return true;
}



module.exports = {
  findAll,
  create,
  removeById,
  toggleStatusById,
  removeAllByStatus,
};
