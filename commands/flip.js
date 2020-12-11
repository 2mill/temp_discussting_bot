module.exports = {
    name: 'flip',
    description: 'Flips a 2 sided coin',    
    execute(message) {
        message.channel.send('Flipping coin...');
        const x = Math.floor(Math.random() * 2) == 0;
        if (x) {
            message.channel.send('heads');
        } else {
            message.channel.send('tails');
        }
    }


}