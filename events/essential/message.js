const Master = require('../Master.js');
module.exports = class Message extends Master {
    constructor() {
        super(
            'message',
            'processor',
        )
    }

    eventHandler() {
        return function(message) {
            const client = message.client;
            if (message.author.bot) return;
            if (!message.content.startsWith(client.keychain['prefix'])) return;


            /**
             * [0] og message
             * [1] if true, arguments
             * [2] 
             */
            let command = />(\w+).?(-[\w.]+)?([\w\s@#<:>]*)?/.exec(message.content);




            //cuz I am bad w/ Regex

            //Removes the dash from the args field and places it into a set
            //The reason for a set is because it automatically removes duplicates
            if (command[2]) command[2] = new Set(command[2].split('-')[1].split(''));
            //Removes the extra whitespace that I get for the content
            if (command[3]) command[3] = command[3].trim();

            //remove original content
            //put message in for the run;

            //run command
            let loadedCommand = client.commands.get(command[1]);
            if (loadedCommand) {

                //if the command loads, removes the first part, and the command name
                command.shift();
                command.shift();
                command.unshift(message);

                //At this point we should be passing message, content, and args in that order.
                loadedCommand.run(...command)
            }



        }
    }

}