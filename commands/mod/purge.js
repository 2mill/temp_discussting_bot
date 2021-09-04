const Master = require('../Master.js');

module.exports = class Purge extends Master {
    constructor() {

        const info = {
            name: 'purge',
            description: 'Deltes n messages, max of 20. Cannot delete messages older than 14 days.',
            usage:'purge [1-20]',
            category: 'moderation',
            modOnly: true,
            permissions: [
                'MANAGE_MESSAGES'
            ]
        }
        super(info);
    }

    run(message, args, content) {

        let number = /\d{1,4}/.exec(content);
        if (number)  {
            number = Number(number.shift());
        }



        //check permissions & guild


        const guild = message.guild;
        if (!guild) return;
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


        this.actions.bulkDelete(message, number);








    }
}