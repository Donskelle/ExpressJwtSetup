const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const messageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    request_transport: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    budget: {
        type: Number,
    },
    priceNogation: {
        type: Boolean,
    },
    active: {
        type: Boolean,
    }
});

requestTransportSchema.index({ "geometry.from": "2dsphere" });
requestTransportSchema.index({ "geometry.to": "2dsphere" });


// Create a model
const Transport = mongoose.model('transport', requestTransportSchema);

// Export the model
module.exports = Transport;