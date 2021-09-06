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
			newMember.guild.channels.fetch();
			let guildChannels = newMember.guild.channels.cache
			let oldGames = userGamesPlaying(oldMember);
			let newGames = userGamesPlaying(newMember);
			for (let game of newGames) {
				for (let ogame of oldGames) {
					if (game.name === ogame.name) {
						if (guildChannels.includes(`${game.name}-logs`)) {
							console.log("found channel");
						} else {
							newMember.guild.channels.create(`${game.name}-logs`);
						}
					}
				}
			}



			// Entering Callback hell for a second so I can
			//Modulize later. Comments will be added.

        }
    }
}

let userGamesPlaying = user => {
	//See if you can figure out importing better.
	return user.presence.activities.filter(
		activity => activity.type === "PLAYING"
	)
}
