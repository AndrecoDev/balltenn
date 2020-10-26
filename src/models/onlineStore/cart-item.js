const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    cart: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            amount: { type: Number, default: 1 },
            color: String,
            size: String,
            price: Number,
            total: Number
        }
    ],
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId
})

cartItemSchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model("Cart", cartItemSchema);
