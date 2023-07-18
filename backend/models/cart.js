// const mongoose = require('mongoose');


// const cartSchema = mongoose.Schema({

//     cartItem:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'CartItem',
//         required:true
//     },
    

//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required:true
//     },

//     totalPrice:{
//         type:Number
//     }
// })

// Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart








// const mongoose = require('mongoose');

// const cartSchema = mongoose.Schema({
//   cartItems: [{
//     item: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Item',
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true
//     }
//   }],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   totalPrice: {
//     type: Number,
//     required: true
//   }
// });

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;




const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cartItems: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Item' }, // This is a reference to the Item model using Schema.Types.ObjectId
      quantity: { type: Number, required: true }
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //The user field is a reference to the User model using Schema.Types.ObjectId
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
