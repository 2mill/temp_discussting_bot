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
			let newGames = userGamesPlaying(newMember);
			let logChannelNames = generateRoomNames(newGames, 'logs');
			findGameLoggingChannels(logChannelNames, newMember.guild.channels).then(
				channels => {
					log_channels(logChannelNames, channels, newMember.guild.channels)
				}
			)


			// Entering Callback hell for a second so I can
			//Modulize later. Comments will be added.
        }
    }
}

async function log_channels(loggingList, channels, channelManager) {
	console.log(channels.keys())
	for (let logChannel of loggingList) {

		let channel = await channels.get(logChannel);
		console.log(`${logChannel} -> ${channel}`)
		if (!channel) {
			console.log('Had to create a new channel');
			channel = await channelManager.create(logChannel);
		}
		// console.log(channel)
	}
	
}

let userGamesPlaying = user => {
	//See if you can figure out importing better.
	return user.presence.activities.filter(
		activity => activity.type === "PLAYING"
	);
}


async function findGameLoggingChannels(gameLoggingChannelNames, channelManager) {
	let channels = await channelManager.fetch();
	// console.log(channels);
	return channels.filter(channel => {
		if (gameLoggingChannelNames.includes(channel.name.toLowerCase())) {
			console.log(`${channel.name} match`);
		}
		return gameLoggingChannelNames.includes(channel.name.toLowerCase())
	})
}

let generateRoomNames = (games, template) => {
	let temp = []
	for (let game of games) {
		temp.push(`${game}-${template}`.toLowerCase().replaceAll(" ", "-"));
	}
	return temp;
}