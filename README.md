```
           _           _
 __      _| |__   __ _| |_ ___  __ _ _ __  _ __        ___  ___ _ ____   _____ _ __
 \ \ /\ / / '_ \ / _` | __/ __|/ _` | '_ \| '_ \ _____/ __|/ _ \ '__\ \ / / _ \ '__|
  \ V  V /| | | | (_| | |_\__ \ (_| | |_) | |_) |_____\__ \  __/ |   \ V /  __/ |
   \_/\_/ |_| |_|\__,_|\__|___/\__,_| .__/| .__/      |___/\___|_|    \_/ \___|_|
                                    |_|   |_|
```
express.js rest server for WhatsApp web.

# Why
Because WhatsApp only have an API for their business accounts, and they don't have an API for personal accounts.

Started by just having my home assistant server to be able to message my contacts.
---

---
| :exclamation:  JWT Token is being created at the first run   |
|----------------------------------------

When running this for the first time, it will create a new JWT token and a secret.
The secret will be stored in the project root, and the JWT token will be only presented once!
Use this JWT token as a bearer token when making REST calls.

You can reset the JWT token by running the `wipe` cmd (see below).

---
## How to run locally
```bash
npm install
npm start
```

## How to install
```bash
npm i -g whatsapp-server
```
## Available commands
```bash
whatsapp-server --help # to see the options
whatsapp-server server <port> # Start in server mode server
whatsapp-server message <message> <recipient> # Send a direct message
whatsapp-server wipe # Wipe all messages
```
---
## Todo:
 - [X] Make into a CLI util
 - [ ] Include a logger
 - [X] Document
 - [X] Github action
 - [X] JWT auth
 - [X] unittests
 - [X] eslint
