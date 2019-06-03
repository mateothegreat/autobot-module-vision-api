# google vision api bot for discord

Uses google vision api to analyze images and returns the strategy(s).

![screenshot.png](screenshot.png)

## Installation

Install the node module in your bot project root directory:
(if you don't have a bot yet see https://autobots.rocks)

```
npm install @autobot/module-vision-api
```

Add the following configuration variable to your `.env` file:

```
VISION_BOT_COMMAND_PREFIX=?
VISION_BOT_ADMIN_ROLE=<name of the role with to use this command>
GOOGLE_APPLICATION_CREDENTIALS=<absolute path to google cloud service account key>
```

## Commands

| Command                           | Description                                   |
|-----------------------------------|-----------------------------------------------|
| `?face <some url to an image>     | Processes an image against google vision api. |
