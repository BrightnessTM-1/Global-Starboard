const configuration = require('../config.json');
const core = require('../coreFunctions.js')
module.exports = (client, Discord, messageReaction, user) => {
    if (messageReaction.emoji.name === "⭐") {
        //Star reaction
        //Check if it's in the global starboard
        if (messageReaction.message.channel.id === configuration.config.channels.global_starboard) {
            //TODO: Update stars on reaction add
        } else if (0 === 1) {
            //Server starboard, not doing this yet
        } else {
            //Not on a starboard
            var reactedOnMessage = client.messages.get(messageReaction.message.id, "starsInfo.message")
            var reactedOnGlobal = client.messages.get(messageReaction.message.id, "starsInfo.global")
            var reactedOnServer = client.messages.get(messageReaction.message.id, "starsInfo.server")
            reactedOnMessage.push(user.id)
            var allReactions = reactedOnMessage.concat(reactedOnGlobal, reactedOnServer)
            var reactionsNoDupe = Array.from(new Set(allReactions));
            var starCount = reactionsNoDupe.length;
            client.messages.set(messageReaction.message.id, starCount, "stars");
            client.messages.set(messageReaction.message.id, reactedOnMessage, "starsInfo.message");
            if (starCount > 0) {//Will be 6 later
              if (!client.messages.get(messageReaction.message.id, "globalBoardMessage")) {
                client.messages.set(messageReaction.message.id, true, "globalBoard");
                
                let embed = new Discord.RichEmbed()
                embed.setTitle(messageReaction.message.author.tag + " in " + messageReaction.message.guild.name)
                embed.setThumbnail(messageReaction.message.author.displayAvatarURL)
                embed.setColor("#FFAD00")
                embed.setTimestamp()
                embed.setDescription(messageReaction.message.content)
                client.channels.get(configuration.config.channels.global_starboard).send(":star: **" + starCount.toString() + "** | <#" + messageReaction.message.channel.id + ">", embed).then(sent => {
                  client.messages.set(messageReaction.message.id, sent.id, "globalBoardMessage");
                }).catch(e => {
                  core.botLog("`[ERROR]` Failed to post message to Global Starboard")
                })
              } else {
                let embed = new Discord.RichEmbed()
                embed.setTitle(messageReaction.message.author.tag + " in " + messageReaction.message.guild.name)
                embed.setThumbnail(messageReaction.message.author.displayAvatarURL)
                embed.setColor("#FFAD00")
                embed.setTimestamp()
                embed.setDescription(messageReaction.message.content)
                client.channels.get(configuration.config.channels.global_starboard).fetchMessage(client.messages.get(messageReaction.message.id, "globalBoardMessage")).then(fetched => {
                  fetched.edit(":star: **" + starCount.toString() + "** | <#" + messageReaction.message.channel.id + ">", embed)
                }).catch(e => {
                  core.botLog("`[ERROR]` Failed to fetch message on Global Starboard")
                })
              }
            }
        }
    }
}
