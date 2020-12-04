module.exports = {
    name : 'monka',
    description: 'keep a 6 feet distance',
    execute(message) {
        let temp = "";

        for (let i = 0; i < 5; i++) {
            message.channel.send('------------- 6 LINE DISTANCE --------------');
        }
    }
}