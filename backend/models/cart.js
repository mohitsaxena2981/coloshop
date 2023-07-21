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
