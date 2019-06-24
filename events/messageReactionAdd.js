const configuration = require('../config.json');
module.exports = (Discord, client, messageReaction, user) => {
    messageReaction.message.guild.fetchMembers()
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
            console.log(reactedOnMessage)
            console.log(reactedOnGlobal)
            console.log(reactedOnServer)
            return;
            if (messageReaction.count > 1) {//Will be 6 later
                let embed = new Discord.RichEmbed()
            }
        }
    }
}