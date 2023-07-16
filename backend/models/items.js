// const mongoose = require('mongoose');

// const itemSchema = mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },

//     description:{
//         type:String,
//         required:true
//     },

//     price:{
//         type:Number,
//         required:true,
//     },
    
//     image:{
//         type:String,
//         required:true,
//     },

//     category:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Category',
//         required:true,
//     }
// })

// Item = mongoose.model('Item', itemSchema);

// module.exports = Item;



const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  newArrival: {
    type: Boolean, // Add the newArrival field
    required: true,
    default: false // Set the default value to false
  }
});

Item = mongoose.model('Item', itemSchema);

module.exports = Item;
