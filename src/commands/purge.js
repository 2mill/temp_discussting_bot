module.exports = class Purge extends Commmands {
    constructor(client) {
        super({
            name: 'purge',
            shortDescription: 'Removes N messages previous to this message',
            arguments: {
                '--verbose': {
                    shorthand: 'v',
                    description: 'Verbose Description of the command',
                },
                '--reply': {
                    shorthand: 'r',
                    description: 'Used while purge replying to a message, Limit: 32',
                }
            },
            requiremenets: {
                permissions: {
                    bot: ['MANAGE_MESSAGES'],
                    user: ['MANAGE_MESSAGES'],
                }
            },
            guildOnly: true,
        });
    }

    async run(message, args) {

        console.log(message);
        
    }
}