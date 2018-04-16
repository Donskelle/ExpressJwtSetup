const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const requestTransportSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    transport_time: {
        type: String,
        enum: ['fixed', 'timeperiod', 'flexibel'],
        required: true,
    },
    fixed: {
        type: Date,
    },
    timeperiod: {
        start: {
            type: Date,
        },
        end: {
            type: Date,
        },
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    geometry: {
        from: {
            type: { type: String },
            coordinates: [],
            required: true,
            index: { type: '2dsphere', sparse: true}
        },
        to: {
            type: { type: String },
            coordinates: [Number],
            required: true,
            index: { type: '2dsphere', sparse: true}
        }
    },
    request_budget: {
        type: Number,
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