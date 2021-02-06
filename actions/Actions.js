exports.sendMessage = (message, content)  => {
    message.channel.send(content);
}

exports.bulkDelete = (message, count) => {


    if (count > 20) {
        return;
    }

    //reply bulk delete
    if (!count) {
        if (message.reference) {
            console.log(message.reference.messageID);
            message.channel.messages.fetch({ after: message.reference.messageID })
                .then((messages) => {

                    let size = messages.size;
                    if (size) {
                        messages.array()[0].channel.bulkDelete(size);
                    }
                }
                )
                .catch(console.error);
        }
        return;
    }


    message.channel.messages.fetch({ limit: count }).then(messages => {
        let size = messages.size;
        let arr = messages.array();
        for (let m of arr) {
            //This works, don't fuck with it
            const thisTime = Date.now();
            const underTwoWeeks = Math.abs(m.createdTimestamp - thisTime) > 1209600000;

            if (underTwoWeeks) {
                console.log(m.message.content);
                size--;
            }
        }

        console.log(size);
        arr[0].channel.bulkDelete(++size).catch();
    }).catch(console.error);
    return;
}

