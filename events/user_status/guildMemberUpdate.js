const chalk = require('chalk');
const symbols = require('log-symbols');
const { ActivityType, ChannelManager } = require('discord.js')
module.exports = class Ready {
    constructor() {
        this.name = 'presenceUpdate'
        this.sender = false;
    }
    eventHandler() {
        return function(oldPresence, newPresence) {
			let diff = diffNewGames(
				activitesNamesOnly(userGamesPlaying(oldPresence)),
				activitesNamesOnly(userGamesPlaying(newPresence)),
			)
			console.log(diff);
			//No game update so no change.
			if (diff.length === 0) return;
			let loggingChannelsNames = generateRoomNames(diff, 'logs');
			generateMissingChannels(loggingChannelsNames, newPresence.guild.channels).then(
				channels => {
					console.log(channels)
					channels.forEach(channel => {
						if (loggingChannelsNames.includes(channel.name)) {
							channel.send(`USER: @${newPresence.user.username}\nSTARTED`);
						}
					})
				}
			);
        }


    }
}

let diffNewGames = (oldPresenceGames, newPresenceGames) => newPresenceGames.filter(game => !oldPresenceGames.includes(game));


async function generateMissingChannels(channelNames, channelManager) {
	//This works, but I think can use some nice cleanup somewhere.
	let channels = await channelManager.fetch()
	let existingChannelNames = [];
	//If the channel already exists, then push it into the channel list.
	channels.forEach(channel => {
		if (channelNames.includes(channel.name)) existingChannelNames.push(channel.name);
	});
	console.log(existingChannelNames);
	//Otherwise, make a new channel.
	channelNames.forEach(channel => {
		if (!existingChannelNames.includes(channel)) channelManager.create(channel);
	})
	return channels;

}

let userGamesPlaying = presence => {
	//See if you can figure out importing better.
	return presence.activities.filter(
		activity => activity.type === "PLAYING"
	);
}
let activitesNamesOnly = activities => {
	return activities.map(activity => activity.name);
}

let generateRoomNames = (games, template) => {
	//I can clean this up with map now I think.
	let temp = []
	for (let game of games) {
		temp.push(`${game}-${template}`.toLowerCase().replaceAll(" ", "-"));
	}
	return games.map(game => `${game}-${template}`.toLowerCase().replaceAll(" ", "-"));
}