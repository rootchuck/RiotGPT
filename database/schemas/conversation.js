const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    conv_id: { type: String, required: true },
    history: { type: Array, default: [] },
    active: { type: Boolean, default: true },
    created: { type: String, default: `${(Date.now() / 1000).toFixed(0)}` },
    last_talked: { type: String, default: null },
});


module.exports = mongoose.model("conversations", conversationSchema, "conversations");

