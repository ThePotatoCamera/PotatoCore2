const child_process = require("child_process")

exports.run = async (client) => {
    require('dotenv').config()
    const package = require('../package.json')

    client.user.setPresence({
        status: 'dnd',
        afk: true,
        activities: [{
            name: `A hamster running...`,
            type: "WATCHING"
        }]
    })

    // We invoke a child process in order to register the commands.
    child_process.fork('utils/deploycommands.js')

    console.log('[READY] Commands have been registered.')
    
    client.user.setPresence({
        status: 'online',
        afk: false,
        activities: [{
            name: `${package.name} ${package.version}`,
            type: "PLAYING"
        }]
    })

    console.log('[READY] Bot presence configured.')

    console.log(`[READY] Bot is ready! Running version ${package.version}`)
    }
