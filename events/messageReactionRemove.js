const configuration = require('../config.json');
const core = require('../coreFunctions.js')
module.exports = (client, Discord, messageReaction, user) => {
    if (!client.messages) {
        core.initEnmap("messages", client)
    }
  if (!client.servers) {
        core.initEnmap("servers", client)
    }
    if (messageReaction.emoji.name === "⭐") {
        //Star reaction
        //Check if it's in the global starboard
        if (messageReaction.message.channel.id === configuration.config.channels.global_starboard) {
            if (user.id === client.user.id) return; //ignore self
            var foundMsg = client.messages.find(msg => msg.globalBoardMessage == messageReaction.message.id).messageid

            var reactedOnMessage = client.messages.get(foundMsg, "starsInfo.message")
            var reactedOnGlobal = client.messages.get(foundMsg, "starsInfo.global")
            var reactedOnServer = client.messages.get(foundMsg, "starsInfo.server")
            
            reactedOnGlobal.splice(reactedOnGlobal.findIndex(id => id == user.id), 1)
          
            var allReactions = reactedOnMessage.concat(reactedOnGlobal, reactedOnServer)
            var reactionsNoDupe = Array.from(new Set(allReactions));
            var starCount = reactionsNoDupe.length;
            client.messages.set(foundMsg, starCount, "stars");
            client.messages.set(foundMsg, reactedOnGlobal, "starsInfo.global");
            client.channels.get(client.messages.get(foundMsg, "channelid")).fetchMessage(client.messages.get(foundMsg, "messageid")).then(fetched => {
            if (starCount < configuration.config.global_threshold && client.messages.get(foundMsg, "globalBoardMessage")) {
              client.channels.get(configuration.config.channels.global_starboard).fetchMessage(client.messages.get(foundMsg, "globalBoardMessage")).then(fetched => {
                  fetched.delete()
                  client.messages.set(foundMsg, false, "globalBoard")
                  client.messages.delete(foundMsg, "globalBoardMessage")
              })
            }
              if (starCount >= configuration.config.global_threshold) {//Will be 6 later
                let embed = new Discord.RichEmbed()
                embed.setTitle(fetched.author.tag + " in " + fetched.guild.name)
                embed.setThumbnail(fetched.author.displayAvatarURL)
                embed.setColor("#FFAD00")
                embed.setTimestamp()
                embed.setDescription(fetched.content)
                if (fetched.attachments.first()) {
                  embed.setImage(fetched.attachments.first().url)
                }
                client.channels.get(configuration.config.channels.global_starboard).fetchMessage(client.messages.get(fetched.id, "globalBoardMessage")).then(fetched_gs => {
                  fetched_gs.edit(":star: **" + starCount.toString() + "** | <#" + fetched.channel.id + ">", embed)
                }).catch(e => {
                  core.botLog("`[ERROR]` Failed to fetch message on Global Starboard")
                })
            }
            })
        
        } else if (0 === 1) {
            //Server starboard, not doing this yet
        } else {
            //Not on a starboard
            var reactedOnMessage = client.messages.get(messageReaction.message.id, "starsInfo.message")
            var reactedOnGlobal = client.messages.get(messageReaction.message.id, "starsInfo.global")
            var reactedOnServer = client.messages.get(messageReaction.message.id, "starsInfo.server")
            reactedOnMessage.splice(reactedOnMessage.findIndex(id => id == user.id), 1)
            var allReactions = reactedOnMessage.concat(reactedOnGlobal, reactedOnServer)
            var reactionsNoDupe = Array.from(new Set(allReactions));
            var starCount = reactionsNoDupe.length;
            client.messages.set(messageReaction.message.id, starCount, "stars");
            client.messages.set(messageReaction.message.id, reactedOnMessage, "starsInfo.message");
          
            if (starCount < configuration.config.global_threshold && client.messages.get(messageReaction.message.id, "globalBoardMessage")) {
              client.channels.get(configuration.config.channels.global_starboard).fetchMessage(client.messages.get(messageReaction.message.id, "globalBoardMessage")).then(fetched => {
                  fetched.delete()
                  client.messages.set(messageReaction.message.id, false, "globalBoard")
                  client.messages.delete(messageReaction.message.id, "globalBoardMessage")
              })
            }
            if (starCount >= configuration.config.global_threshold) {//Will be 6 later
                let embed = new Discord.RichEmbed()
                embed.setTitle(messageReaction.message.author.tag + " in " + messageReaction.message.guild.name)
                embed.setThumbnail(messageReaction.message.author.displayAvatarURL)
                embed.setColor("#FFAD00")
                embed.setTimestamp()
                embed.setDescription(messageReaction.message.content)
              if (messageReaction.message.attachments.first()) {
                  embed.setImage(messageReaction.message.attachments.first().url)
                }
                client.channels.get(configuration.config.channels.global_starboard).fetchMessage(client.messages.get(messageReaction.message.id, "globalBoardMessage")).then(fetched => {
                  fetched.edit(":star: **" + starCount.toString() + "** | <#" + messageReaction.message.channel.id + ">", embed)
                }).catch(e => {
                  core.botLog("`[ERROR]` Failed to fetch message on Global Starboard")
                })
              }
        }
    }
}
