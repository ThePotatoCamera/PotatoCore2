(async (applicationId, commandId) => {
    const {REST} = require('@discordjs/rest')
    const {Routes} = require('discord-api-types/v9')

    const fs = require('fs')

    const commands = []
    const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`)
        commands.push(command.data.toJSON())
    }

    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

    await deploy()

    async function deploy() {
        try {
            if (process.env.ENVIRONMENT === 'development') {
                // We only register the commands to the specificed server.
                await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
                    {body: commands}
                )
            } else {
                // We send the commands to all servers. This could take some time.
                await rest.put(
                    Routes.applicationCommands(process.env.CLIENTID),
                    {body: commands}
                )
            }
        } catch (e) {
            console.error('[ERROR] ' + e)
        }
    }
})();
