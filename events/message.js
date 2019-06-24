const core = require("../coreFunctions.js");
const fs = require('fs');
const configuration = require('../config.json');
module.exports = (client, message, Discord) => {

  //Check if message is a command
  fs.readdir("./commands/", (err, files) => {
    files.forEach(file => {
        const commandName = file.split(".")[0]; //Command to check against
        const command = require("../commands/" + commandName); //Command file
        if (message.channel.type !== "text" || message.author.bot === true) return; //Ignore DMs and bots

        let commandText = message.content.split(" ")[0].toLowerCase() //Input command
        if (commandText === configuration.config.prefix + commandName) { //Check if command matches
            let args = message.content.split(" ").splice(1);
            var permission = core.checkPermissions(message.author.id);

            if (permission > command.controls.permission) return message.react("🚫");
            if (command.controls.enabled === false) return message.reply("This command has been disabled globally.");
            return command.do(message, client, args, Discord);
        
        }
    });
    })
};