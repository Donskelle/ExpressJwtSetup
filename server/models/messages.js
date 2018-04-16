const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer');

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
        ref: 'transport',
    },
});

messageSchema.plugin(sanitizerPlugin);

// Create a model
const Message = mongoose.model('message', messageSchema);

// Export the model
module.exports = Message;