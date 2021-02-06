module.exports = {
    name: 'purge',
    description: 'Deletes n messages before this message',
    verbose: 'Deletes n previous messages, including the command message. Server only, requires permissions',
    usage: 'purge <n>',
    args: false,
    execute(message, args) {
        const limit = 20;//Limit of messages that can be purged at once


        const guild = message.guild;


        if (!guild.available) return;
        const member = message.member;
        const channel = message.channel;
        const botPermissionsFor = channel.permissionsFor(guild.me);

        //Bot permissiosn in the channel
        const botPermissionsIn = guild.me.permissionsIn(channel);
        //User permissions in specified channel
        const userChannelPermissions = channel.permissionsFor(member);
        //Check user permissions for channel to have manage message
        const userHasPermission = (userChannelPermissions.bitfield & 8192) !== 0;
        //Same thing for bot
        const botHasPermission = (botPermissionsIn.bitfield & 8192) !== 0;


        if (!botHasPermission && !userHasPermission) return;

        if (args.length && message.reference) {
            console.log(message.reference.messageID);
            channel.messages.fetch({ after: message.reference.messageID })
                .then((messages) => {

                    const size = messages.size;
                    if (size) {
                        messages.array()[0].channel.bulkDelete(size);
                    }
                }
                )
                .catch(console.error);
        }


        if (!Number.isInteger(Number(args[0]))) return;

        const n = Number(args[0]);
        //Limit
        if (n > 20) return;
        channel.messages.fetch({ limit: n }).then(messages => {
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

            arr[0].channel.bulkDelete(size);


            //Brain garbo rn
            //read this tomorrow and try to figure it out pepela




        }).catch(console.error);
        /**
         * TODO: New purge feature that figures out if messages are older than 14 days.
         */



    }
}