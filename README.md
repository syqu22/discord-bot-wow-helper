# discord-bot-wow-helper

![Avatar](/img/avatar.png)

## About

Discord bot written in JS, built using [discord.js](https://discord.js.org/) based on [old project](https://github.com/syqu22/discord-bot-wow-helper-old).

## Technology

- `discord.js` for much easier interaction with Discord API
- `axios` for HTTP requests with Blizzard and WarcraftLogs API
- `toad-scheduler` for tasks scheduling
- `jest` for testing
- `eslint` for linting

## Commands

- `/logs` - to view logs information
- `/character`- to view character information
- `/affixes` - to see affixes
- `/token` - to see current WoW token prices
- `/help` - to get detailed information about commands
- `/about` to get more info about the bot
- `/vote` - to vote for the bot to help it grow

## Screenshots

`/logs`

![Logs](/img/logs.png)

`/character`

![Character](/img/character.png)

`/token`

![Token](/img/token.png)

`/affixes`

![Affixes](/img/affixes.png)

`/about`

![About](/img/about.png)

`/help`

![Help](/img/help.png)

`/vote`

![Vote](/img/vote.png)

## Installation

If you want to download and launch the bot locally you need to

1. Clone the git repository:

    ```sh
    git clone https://github.com/syqu22/discord-bot-wow-helper.git
    ```

2. Rename the `.env.sample` to `.env`, then fill it     with all the needed keys. `discord_token` and `discord_client` are both needed to start the bot. `blizzard_client` and `blizzard_client` are necessary to connect with blizzard api and `warcraftlogs_client` is for warcraft logs api access.

3. Download all the needed packages:

    ```sh
    npm install
    ```

4. Run the bot:

    ```sh
    npm start
    ```

You can run tests using:

```sh
npm run test
```

and linting:

```sh
npm run lint
```
