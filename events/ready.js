require('../coreFunctions.js');
module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('online');
    //botLog("`[LOGIN]` Bot is online");
};