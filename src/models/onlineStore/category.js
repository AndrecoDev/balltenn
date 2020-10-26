const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId
})

categorySchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model("categories", categorySchema);