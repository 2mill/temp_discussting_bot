exports.sendMessage = (message, content)  => {
    message.channel.send(content);
}

exports.bulkDelete = (message, count) => {

    message.channel.messages.fetch({ limit: count }).then(messages => {
        let size = messages.size;
        let arr = messages.array();
        for (let m of arr) {
            //This works, don't fuck with it
            const thisTime = Date.now();
            const underTwoWeeks = m.createdTimestamp - thisTime > 1209600000;
            if (underTwoWeeks) size--;
            // console.log(underTwoWeeks);
            // console.log(thisTime);
            // console.log(m.createdTimestamp);
        }

        arr[0].channel.bulkDelete(++size);


        //Brain garbo rn
        //read this tomorrow and try to figure it out pepela




    }).catch(console.error);
    return;
}

