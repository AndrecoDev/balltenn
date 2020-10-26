const mongoose = require("mongoose")
const certificateSchema = new mongoose.Schema({
    
    name: mongoose.Schema.Types.String,
    Type: mongoose.Schema.Types.Number,
    durationDays:mongoose.Schema.Types.Number,
    level:mongoose.Schema.Types.String,
    value: mongoose.Schema.Types.Array,
    status: mongoose.Schema.Types.Number,
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId,

});



certificateSchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model("Certificates", certificateSchema);