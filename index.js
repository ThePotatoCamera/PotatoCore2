require('dotenv').config()

const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });

// Event system

fs.readdir('./events', (err, files) => {
    if (err) console.error('[ERROR] ' + err)
    files.forEach(file => {
        const eventFunction = require('./events/' + file)
        const eventName = file.split('.')[0]
        client.on(eventName, (...args) => eventFunction.run(client, ...args))
    })
})

// Command system

client.commands = new Collection()

fs.readdir('./commands', (err, files) => {
    if (err) return console.error('[ERROR] ' + err)
    files.forEach(file => {
        if (file.endsWith('.ignore')) {
            const disabledName = file.split('.')[0]
            console.warn(`[CMD] Command ${disabledName} is disabled.`)
        }
        else if (file.endsWith('.template')) return
        else if (!file.endsWith('.js')) {
            return console.warn(`[CMD] File ${file} is not a JS file. Maybe wrong file type?`)
        }
        const command = require(`./commands/${file}`)
        client.commands.set(command.data.name, command)
    })
})

// Execute system

client.executes = new Collection()

fs.readdir('./executes', (err, files) => {
    if (err) return console.error('[ERROR] ' + err)
    files.forEach(file => {
        if (file.endsWith('.ignore')) {
            const disabledName = file.split('.js')[0]
            console.warn(`[EXECUTE] Execute ${disabledName} is disabled.`)
        }
        else if (file.endsWith('.template')) return
        else if (!file.endsWith('.js')) {
            return console.warn(`[EXECUTE] File ${file} is not a JS file. Maybe wrong file type?`)
        }
        const execute = require(`./executes/${file}`)
        client.executes.set(execute.data.name, execute)
    })
})

client.login(process.env.TOKEN)
