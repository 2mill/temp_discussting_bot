exports.sendMessage = (message, content)  => {
    message.channel.send(content);
}

exports.bulkDelete = async (message, count) => {
    message.channel.startTyping();
    if (count > 20) {
        return;
    }

    //reply bulk delete
    if (!count && message.reference) {
        count = await message.channel.fetch({after: message.reference.messageID}).size;
    } else {
        return;
    }


    message.channel.bulkDelete(count, true)
        .then(messages => console.log(`Bulk delted ${messages.size} messages in #${message.channel.name}:${message.channel.guild.name}`))
        .catch('Failure');

    message.channel.stopTyping(true); 
    return;
}

