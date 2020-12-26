const disc = require('discord.js');
module.exports = class Command {
    constructor(options) {
        this.name = options.name;
        this.shortDescription = options.description;
        this.usage = options.usage;
        this.arguments = options.arguments;
        this.requirements = options.requirements;
        this.guildOnly = options.guildOnly;
    }
    veborseEmbedd() {
        let embedd = new disc.MessageEmbed()
            .setTitle(`${this.name} help`)
            .setDescription(`${this.shortDescription}`)
            .setColor('#52307C');

        embedd.setTimestamp();
        return embedd;
    }
    async run() {
    }






    


}