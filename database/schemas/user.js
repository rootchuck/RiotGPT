const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    flags: {
        admin: { type: Boolean, default: false },
        banned: { type: Boolean, default: false },
    },
    settings: {
        model: { type: String, default: null },
        system_prompt: { type: String, default: null },
    },
    economy: {
        bank: { type: Number, default: 0 },
        wallet: { type: Number, default: 0 },
        profession: { type: String, default: null },
        cooldowns: {
            work: { type: Number, default: null },
            beg: { type: Number, default: null },
            jobapply: { type: Number, default: null },
        },
    },

});

module.exports = mongoose.model("users", userSchema, "users");