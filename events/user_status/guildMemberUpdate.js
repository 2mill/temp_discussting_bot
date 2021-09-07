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
					log_channels(logChannelNames, channels, newMember.guild.channels).then(
						new_channels => {
							//At this point, the program is able to
							//not duplicated channels by accident.
							//Need to write notes on my solution later.
							for (let channel of new_channels) {
								console.log(channel);
								// channel.send("something")
							}
						}
					)

				}
			)


			// Entering Callback hell for a second so I can
			//Modulize later. Comments will be added.
        }
    }
}

async function log_channels(loggingList, channels, channelManager) {
	// Figure out why it's mapping room ID instead of room name...
	let fuckIt = Array.from(channels.values());
	console.log(fuckIt)
	let againFuck = [];
	for (let channel of fuckIt) {
		againFuck.push(channel.name);
	}
	loggingList.forEach(element => {
		if (!againFuck.includes(element)) {
			fuckIt.push(channelManager.create(element));
		}
		
	});
	return fuckIt
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