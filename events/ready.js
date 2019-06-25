var core = require('../coreFunctions.js');
var configuration = require('../config.json');
const Discord = require('discord.js');
module.exports = (client, Discord) => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('online');
  
    if (!client.messages) {
        core.initEnmap("messages", client)
    }
  
    //Fetch messages
    var messages = client.messages.map(x => x.messageid);
    messages.forEach(msg => {
      client.channels.get(client.messages.get(msg, "channelid")).fetchMessage(client.messages.get(msg, "messageid")).catch(e => {
        //IF MESSAGE HAS BEEN DELETED
        if (client.messages.get(msg, "globalBoard")) { //Remove from global starboard if on global starboard
          client.channels.get(configuration.config.channels.global_starboard).fetchMessage(client.messages.get(msg, "globalBoardMessage")).then(fetched => fetched.delete())
        }
        client.messages.delete(msg)//Remove from database
      })
    })
  
    core.botLog("`[LOGIN]` Bot is online");
};
