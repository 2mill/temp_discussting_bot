const chalk = require('chalk');
const symbols = require('log-symbols');
const { ActivityType, ChannelManager, CommandInteractionOptionResolver } = require('discord.js')
const GUILD_CATEGORY = "GUILD_CATEGORY"
module.exports = class Ready {
    constructor() {
        this.name = 'presenceUpdate'
        this.sender = false;
    }
    eventHandler() {
        return function(oldPresence, newPresence) {
			if (oldPresence.activites === null || newPresence.activites === null) {
				return;
			}
			let diff = diffNewGames(
				activitesNamesOnly(userGamesPlaying(oldPresence)),
				activitesNamesOnly(userGamesPlaying(newPresence)),
			)
			//No game update so no change.
			if (diff.length === 0) return;
			let loggingChannelsNames = generateRoomNames(diff, 'logs');
			generateMissingChannels(loggingChannelsNames, newPresence.guild.channels).then(
				channels => {
					channels.forEach(channel => {
						if (loggingChannelsNames.includes(channel.name)) {
							console.log(channel)
							channel.send(`@${newPresence.user.username} PLAYING`);
						}
					});
				}
			);
        }


    }
}

let diffNewGames = (oldPresenceGames, newPresenceGames) => newPresenceGames.filter(game => !oldPresenceGames.includes(game));
//Checks to see if a log category has been created otherwise, makes one.

let findCategory = (channels, categoryName) => {
	let category = channels.filter(channel => channel.type === GUILD_CATEGORY && channel.name === categoryName);
	return category.size === 0 ? false : category;
}
let createCategory = async (channelManager, categoryName) => channelManager.create(categoryName, {type: GUILD_CATEGORY});
let missingChannels = async (existingChannels, channelList) => {
	let foundChannels = existingChannels.filter(channel => channelList.includes(channel.name)).values();
}


async function generateMissingChannels(channelNames, channelManager) {
	//This works, but I think can use some nice cleanup somewhere.
	let channels = await channelManager.fetch()
	let existingChannelNames = [];
	let parent = findCategory(channels, "BOT-LOGS");

	if (!parent) {
		parent = await createCategory(channelManager, "BOT-LOGS");
	}
	//If the channel already exists, then push it into the channel list.
	channels.forEach(channel => {
		if (channelNames.includes(channel.name)) existingChannelNames.push(channel.name);
	});
	//Otherwise, make a new channe//.
	channelNames.forEach(channel => {
		if (!existingChannelNames.includes(channel)) channelManager.create(channel, {
			parent: parent,
		});
	})
	return channelManager.fetch();

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