const mongoose = require("mongoose")
const centerSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    user_id: mongoose.Schema.Types.ObjectId,
    address:mongoose.Schema.Types.String,
    phone: mongoose.Schema.Types.String,
    profilePicture:mongoose.Schema.Types.String,
    logoPicture:mongoose.Schema.Types.String,
    website:mongoose.Schema.Types.String,
    socialNetwork: mongoose.Schema.Types.Array,
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId,
});
/*
centerSchema.index({ documentType: 1, documentNumber: 1 }, { unique: true });
centerSchema.index({ username: 1 }, { unique: true });
centerSchema.index({ email: 1 }, { unique: true });
*/
centerSchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model("balltenCenter", centerSchema);