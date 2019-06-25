const core = require('../coreFunctions.js')
        const Enmap = require('enmap');
module.exports = {
    controls: {
        permission: 10
    },
    do: (message, client, args, Discord) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
          return message.reply("You must have the **Manage Server** permission to use this command.")
        }

            if (!client.servers) {
                core.initEnmap("servers", client)
            }

          client.servers.ensure(`${message.guild.id}`, {
            guildid: message.guild.id
          });
      
        if (!message.mentions.channels.first()) {
          if (client.servers.get(message.guild.id, 'starboard')) {
            return message.reply("Please mention a channel (example: #channel) to set it as your server's starboard! Your current starboard channel is <#" + client.servers.get(message.guild.id, 'starboard') + ">.")
          } else return message.reply("Please mention a channel (example: #channel) to set it as your server's starboard!")
        }
        else {
          client.servers.set(message.guild.id, message.mentions.channels.first().id, 'starboard')
          if (!client.servers.get(message.guild.id, "threshold")) {
            client.servers.set(message.guild.id, 3, 'threshold')
            return message.reply("The server starboard channel for **" + message.guild.name + "** has been set to <#" + message.mentions.channels.first().id + ">! The star threshold was automatically set to **3** and can be changed with the `*setthreshold` command.")
          } else return message.reply("The server starboard channel for **" + message.guild.name + "** has been set to <#" + message.mentions.channels.first().id + ">!")
          
        }
      
    }
}
