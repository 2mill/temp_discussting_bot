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
			for (let game of games) {
				let log_room = find_room(
					newMember.guild.channels,
					`${game.name}-activity-logs`
				)
				.then(logRoom => {
					if (!logRoom) {
						logRoom = newMember.guild.channels.create(
							`${game.name}-activity-logs`
						)
					} 
					console.log(logRoom)
				})
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

async function find_room(channelManager, room_name) {
	return channelManager.fetch().then(channels => {
		channels.filter(channel => channel === room_name)
	}).catch(console.error);
}

write_log_room = (channel, message) => {

}