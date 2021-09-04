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
			let games = user_games_playing(newMember)
			console.log(newMember.presence.activities[0].type)
			for (let game of games) {
				console.log(game.name)
			}
        }
    }
}

user_games_playing = user => {
	//See if you can figure out importing better.
	return user.presence.activities.filter(
		activity => activity.type === "PLAYING"
	)
}