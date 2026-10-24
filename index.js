
const Discord = require('discord.js');
const { Collection } = require("discord.js");
const fs = require("fs");
const database = require("./database/mongoose.js");

const mongoose = require("mongoose");
const users = require("./database/schemas/user.js");
const { createUser } = require("./utils/createUser.js");

database.connect();
const prefix = "!";

const client = new Discord.Client({ 
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.MessageContent
    ]
});

const categories = ["ai", "bot", "economy", "games", "utility"];

const token = require("./config.json").token;

client.commands = new Collection()

categories.forEach(category => {

    fs.readdir(`./commands/${category}`, (err, files) => {
        
        if(err) console.log(err);
        files.forEach(cmdFile => {
            try {
                if(!cmdFile.endsWith(".js")) return;

                let pull = require(`./commands/${category}/${cmdFile}`);
                if(!pull.execute) return;
                client.commands.set(pull.name, pull);
                console.log(`Loaded cmd ${pull.name}`)

                
            } catch (e) {
                console.log(`Failed to load ${cmdFile}, E: ${e}`)
            }
        })
    });


})



client.on('clientReady', (client) => {
    console.log(`le bot ${client.user.username} s'est connecté`);
})

client.on('messageCreate', async (message) => {

    try {

        if(message.author.bot) return;

        if(!message.content.toLowerCase().startsWith(prefix)) return;       

        let args = message.content.substring(prefix.length).trim().split(/ +/g);


        let command = args.shift().toLowerCase();
        let code = client.commands.get(command)
        if(!code) return;

        var user = await users.findOne({ user_id: message.author.id });

        if(!user) {
            await createUser(message.author.id)
        }

        var user = await users.findOne({ user_id: message.author.id });
        
    
        
        if(user.flags.banned) return;

        await code.execute(client, message, args);


    } catch (err) {
        console.error(err)
    }
    


    
    
})


// process.on("uncaughtException", (err) => {
//     console.error(err)
// })

// process.on("unhandledRejection", (err) => {
//     console.error(err)
// })




client.login(token)