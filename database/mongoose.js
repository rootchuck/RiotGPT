const mongoose = require('mongoose');
const { mongo_url } = require("../config.json");

module.exports = {
    connect: async function() {
        try {
            await mongoose.connect(mongo_url);
            console.log("Connected to the database successfully.")
        } catch (err) {
            console.error(err);
        }
    }
}

