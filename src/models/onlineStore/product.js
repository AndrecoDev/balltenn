const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
    name: mongoose.Schema.Types.String,
    gender: mongoose.Schema.Types.String, // male, female, children 
    price: mongoose.Schema.Types.Number,
    sizes: [ {size: String} ],
    colors: [ {name: String} ],
    images: [ {image: String} ],
    status: mongoose.Schema.Types.String, // new, out of stock, discount
    amount: mongoose.Schema.Types.Number,
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId,
});

productSchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model("products", productSchema);