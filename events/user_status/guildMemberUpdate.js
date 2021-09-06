const chalk = require('chalk');
const symbols = require('log-symbols');
const { ActivityType } = require('discord.js')
module.exports = class Ready {
    constructor() {
        this.name = 'guildMemberUpdate'
        this.sender = false;
    }
    eventHandler() {
        return function(oldMember, newMember) {
			console.log("UPDATE!")
			let games = userGamesPlaying(newMember);
			// Entering Callback hell for a second so I can
			//Modulize later. Comments will be added.
			newMember.guild.channels.fetch().then(
				channels => {
					for (let game of games) {
						let logChannelName = `${game.name}-logs`;
						let exists = channels.filter(channel => channel.name === logChannelName) === 0;
						if (exists) {
							console.log(`${logChannelName} exists`);
						} else {
							newMember.guild.channels.create(logChannelName);
							console.log(`created ${logChannelName}`);
						}
					}
				}
			)

        }
    }
}

let userGamesPlaying = user => {
	//See if you can figure out importing better.
	return user.presence.activities.filter(
		activity => activity.type === "PLAYING"
	)
}
