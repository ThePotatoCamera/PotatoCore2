# PotatoCore2

The base for Discord.js bots that simplifies creating a bot.

## Requirements

The core requires at least Node.js 16

## Getting started

The most basic packages needed are included, just run `npm install --save-dev` and you're good to go.

## Environment variables

In order to start programming using this base, you'll need to set some environment variables.

- `TOKEN`: Token used to connect to the Discord API. [Get one on the developer portal](https://discord.com/developers)
- `CLIENTID`: ID of the client, needed to register the slash commands on the Discord API.
- `GUILDID`: ID of the development server. Used to only register the commands on the server, avoiding the cache.
- `ENVIRONMENT`: The environment the bot is running in. This is used to determine if we register the commands on the `GUILDID` server or to everyone.
This variable must be put on `development` while you are testing in order to avoid the command cache.

You only have to copy the `.env.example` file to `.env` and fill in the values.

## Create your first command
Just copy the `command.js.template` file and rename it to the command name. From there, just modify the data and the
executed code.

## Important folders

You should check out these folders and try to understand the files inside them:

### Events folder
This folder contains all the events that the bot can listen to. You can add more events by creating a new file and
naming it the same as the event name.

### Executes
This folder contains all code that can be executed by various interactions, such as clicking a button.

### Utils
This folder contains miscellaneous functions that are used as auxiliary functions. Here you can find the
`deploycommands.js` file, which is used to register the commands on the Discord API.

## How to run
You can just run `npm run test` to start the bot.

## DiscordJS documentation
Need more info? Just check the [DiscordJS documentation](https://discord.js.org/#/docs/main/stable/general/welcome)!
