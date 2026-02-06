const mineflayer = require('mineflayer');
const config = require('./config.json');


process.on('uncaughtException', (err) => console.log('Caught Exception: ' + err));
process.on('unhandledRejection', (reason, p) => console.log('Unhandled Rejection: ' + reason));

function createBot() {
    const bot = mineflayer.createBot({
        host: config.host,
        port: parseInt(config.port),
        username: config.username,
        version: config.version,
        hideErrors: true,
        viewDistance: 'tiny' য
    });

    bot.on('spawn', () => {
        console.log(`✅ [${bot.username}] 
        

        setInterval(() => {
            console.log("বট এখনো সচল আছে...");
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // ডিসকানেক্ট হলে ১০ সেকেন্ড পর আবার চেষ্টা করবে
    bot.on('end', () => {
        console.log("বট ডিসকানেক্ট হয়েছে। ১০ সেকেন্ড পর রিকানেক্ট হচ্ছে...");
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('Error Message:', err.message);
        if (err.message.includes('ECONNREFUSED')) {
            console.log('সার্ভার অফলাইন অথবা আইপি ভুল!');
        }
    });
}

createBot();
