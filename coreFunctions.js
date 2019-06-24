const fs = require('fs');
const Discord = require('discord.js');
const configuration = require('config.json');

//checkPermissions: Returns permission level of inputted ID
function checkPermissions(id) {
    if (configuration.config.admins.includes(id)) return 0;
    else if (client.guilds.get(configuration.config.main_server).available && client.guilds.get(configuration.config.main_server).roles.get(configuration.config.roles.global_mod).members.includes(id)) return 1;
    else return 10;
}

function botLog(input) {
    var webhook = new Discord.WebhookClient(configuration.config.logs.bot.webhook.id, configuration.config.logs.bot.webhook.token);
    webhook.send(input);
}