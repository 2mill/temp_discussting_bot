module.exports = class Command {

    constructor(options) {
        this.name = options.name;
        this.shortDescription = options.description;
        this.usage = options.usage;
        this.arguments = options.arguments;
        this.requirements = options.requirements;
        this.guildOnly = options.guildOnly;
    }

    async run() {
    }






    


}