const chalk = require('chalk');
const symbols = require('log-symbols');
const { ActivityType, ChannelManager, CommandInteractionOptionResolver } = require('discord.js')
const GUILD_CATEGORY = "GUILD_CATEGORY";
const CATEGORY_NAME = "BOT-LOGS";
module.exports = class Ready {
    constructor() {
        this.name = 'presenceUpdate'
        this.sender = false;
    }

// This branch is going to clean up this code to be more efficient.
    eventHandler() {
        return function(oldPresence, newPresence) {
			if (oldPresence.activities === null || newPresence.activities === null) return;
			const channelManager = newPresence.guild.channels;
			const diff = diffNewGames(
				activitesNamesOnly(userGamesPlaying(oldPresence)),
				activitesNamesOnly(userGamesPlaying(newPresence)),
			)
			if (diff.length === 0) return;
			//No game update so no change.
			const loggingChannelsNames = generateRoomNames(diff, 'logs');
			console.log(gameLogger(diff, newPresence.guild.channels, loggingChannelsNames));
			
			channelManager.fetch().then(channels => {
				let parent = findCategory(channels, CATEGORY_NAME);
				if (!parent) {
					parent = createCategory(chanels, CATEGORY_NAME);
				}
			});



			console.log(loggingChannelsNames);
			generateMissingChannels(loggingChannelsNames, newPresence.guild.channels).then(
				channels => {
					channels.forEach(channel => {
						if (loggingChannelsNames.includes(channel.name)) {
							channel.send(`@${newPresence.user.username} PLAYING`);
						}
					});
				}
			);
        }


    }
}

// The point of this function is to make one function call and then do all of the work
async function gameLogger(diff, channelManager, loggingChannelsNames) {
	const channels = await channelManager.fetch();
	const parent = getCategory(channels, channelManager, CATEGORY_NAME);
	//TODO: FIGURE OUT HOW TO MAP LOG CHANNEL NAMES TO ACTUAL CHANNELS AND FIX UNDFINEDs

	let existingChannels = new Map();
	loggingChannelsNames.forEach(loggingChannel => {
		existingChannels.set(loggingChannel, false);
	});
	channels.forEach(channel => {
		if (loggingChannelsNames.includes(channel.name)) {
			existingChannels.set(channel.name, channel);
		}
	});
	let finalList = existingChannels.values();

	return nameToChannel.values();
}






	//TODO: THEN RETURN A COLLECTION OF ONLY THE CHANNELS NEEDED


let diffNewGames = (oldPresenceGames, newPresenceGames) => newPresenceGames.filter(game => !oldPresenceGames.includes(game));
//Checks to see if a log category has been created otherwise, makes one.



/**
 * 
 * @param {A collection of channels} channels 
 * @param {The guild channel manager} channelManager 
 * @param {The name of the desired category} categoryName 
 * @returns 
 */
async function getCategory(channels, channelManager, categoryName) {
	let categories = findCategory(channels, categoryName);
	if (!categories) {
		//Needs to be wrapped into an array to due the nature of findCategory.
		categories = [await createCategory(channelManager, categoryName, force)];
	}
	//Even if findCategory finds multiple categories, it will still return the first one it finds.
	return categories.pop();
}
/**
 * 
 * @param {The given channels} channels 
 * @param {The category name that is wanted to find} categoryName 
 * @returns {Array if found else false boolean}
 */
let findCategory = (channels, categoryName) => {
	let categfoundCategoriesory = channels.filter(channel => isCategory(channel) && channel.name === categoryName);
	//Due to the nature of Discord.js returning a collection instead of an array with filter.
	//It's needed that we collect the actual values instead. Hence .values() being used here.
	return category.size === 0 ? false : category.values();
}

let isCategory = (channel) => channel.type === GUILD_CATEGORY;
//If force is not set, and the category already exists, then the new category will not be made.
let createCategory = async (channelManager, categoryName, force=false) => findCategory(channelManager, categoryName) && force ? channelManager.create(categoryName, {type: GUILD_CATEGORY}) : force;
let missingChannels = async (existingChannels, channelList) => {
	let foundChannels = existingChannels.filter(channel => channelList.includes(channel.name)).values();
}


async function generateMissingChannels(channelNames, channelManager) {
	//This works, but I think can use some nice cleanup somewhere.
	let channels = await channelManager.fetch()
	let existingChannelNames = [];
	let parent = findCategory(channels, "BOT-LOGS");

	if (!parent) {
		parent = [await createCategory(channelManager, "BOT-LOGS")];
	} else {
		parent = Array.from(parent.values());
	}
	//If the channel already exists, then push it into the channel list.
	channels.forEach(channel => {
		if (channelNames.includes(channel.name)) existingChannelNames.push(channel.name);
	});
	//Otherwise, make a new channe//.
	channelNames.forEach(channel => {
		if (!existingChannelNames.includes(channel)) channelManager.create(channel, {
			parent: parent.pop(),
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