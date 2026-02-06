const mineflayer = require('mineflayer');
const config = require('./config.json');

function createBot() {
    const bot = mineflayer.createBot({
        host: config.host,
        port: parseInt(config.port),
        username: config.username,
        version: config.version,
        hideErrors: true,
        // মেমোরি বাঁচানোর জন্য নিচের অপশনগুলো জরুরি
        physicsEnabled: true,
        viewDistance: 'tiny'
    });

    bot.on('spawn', () => {
        console.log(`✅ [${bot.username}] সফলভাবে জয়েন করেছে!`);
        
        // প্রতি ৫ সেকেন্ড পর পর জাম্প এবং ছোট মুভমেন্ট
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, config.movement_interval);
    });

    bot.on('end', () => {
        console.log("ডিসকানেক্ট হয়েছে। ১০ সেকেন্ড পর রিকানেক্ট করছি...");
        setTimeout(createBot, config.reconnect_delay);
    });

    bot.on('error', (err) => {
        console.log('Bot Error:', err.message);
    });
}

createBot();