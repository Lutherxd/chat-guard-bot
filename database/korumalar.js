const mongoose = require("mongoose");
const database = new mongoose.Schema({guildID: String, davetEngel: Boolean, kufurEngel: Boolean, CapslockEngel: Boolean, LinkEngel: Boolean, EtiketEngel: Boolean});
const MessageModel = (module.exports = mongoose.model("Korumalar", database));