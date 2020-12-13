module.exports = {
    name: 'purge',
    description:'Deletes n messages before this message',
    verbose: 'Deletes n previous messages, including the command message. Server only, requires permissions',
    usage: 'purge <n>',
    args: true,
    execute(message, args) {


        const guild = message.guild;

        if (!guild.available) return;
        const member = message.member;
        const channel = message.channel;
        const botPermissionsFor = channel.permissionsFor(guild.me);

        //Bot permissiosn in the channel
        const botPermissionsIn = guild.me.permissionsIn(channel);
        //User permissions in specified channel
        const userChannelPermissions = channel.permissionsFor(member);


        console.log(userChannelPermissions.bitfield);

        //Check user permissions for channel to have manage message
        const userHasPermission = (userChannelPermissions.bitfield & 8192) !== 0;
        //Same thing for bot
        const botHasPermission = (botPermissionsIn.bitfield & 8192) !== 0;

        if (botHasPermission && userHasPermission) {
            message.channel.bulkDelete(args[0] + 1).catch(console.error);
        }




        console.log(userHasPermission);



        


        console.log(botPermissionsFor);
        console.log(botPermissionsIn);



    }
}