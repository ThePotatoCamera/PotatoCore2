exports.run = async (client, interaction) => {
    console.log(`[EVENT] Interaction created: ${interaction.id}, ${interaction.type}`)
    switch (interaction.type) {
        case "APPLICATION_COMMAND":
            await executeCommand(client, interaction)
            break
        case "MESSAGE_COMPONENT":
            await executeMessageComponent(client, interaction)
            break
    }

    async function executeCommand(client, interaction) {
        const command = client.commands.get(interaction.commandName)

        if (!command) interaction.reply({
            content: `The command ${command} does not exist :/`,
            ephemeral: true
        })

        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply({content: 'There was an error executing this command.', ephemeral: true})
        }
    }

    async function executeMessageComponent() {
        const execute = client.executes.get(interaction.customId)
        await execute.run(interaction)
    }

}
