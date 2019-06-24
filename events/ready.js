var core = require('../coreFunctions.js');
const Discord = require('discord.js');
module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('online');
    core.botLog("`[LOGIN]` Bot is online");
};