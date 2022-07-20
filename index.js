#!/bin/sh
":"; //# comment; exec /usr/bin/env node --noharmony "$0" "$@"

import { readFileSync } from "fs";
import { Command } from "commander";
import chalk from "chalk";
import pkg from "figlet";
const { textSync } = pkg;
import { default as server } from "./src/server.js";
import { default as WhatsApp } from "./src/whatsapp.js";
import { BASE_PATH, wipeSecret } from "./src/utils.js";

const { name, description, version } = JSON.parse(
  readFileSync(`${BASE_PATH}/package.json`, "utf8")
);

const app = new Command();

console.log(chalk.green(textSync(name)));

try {
  app.name(name).description(description).version(version);

  // Start server
  app
    .command("server")
    .description("Start in server mode")
    .argument("<port>", "Port to listen on")
    .action((port) => {
      if (!port.match(/^\d+$/)) {
        throw new Error("Port must be a number");
      }
      console.log(chalk.yellow(`Starting server on port ${port}`));
      server(port);
    });

  // Start client
  app
    .command("message")
    .description("Send a direct message")
    .argument("<message>", "string to send")
    .argument("<recipient>", "recipient's phone number")
    .action((message, recipient) => {
      if (recipient.startsWith("+")) {
        recipient = recipient.slice(1);
      }
      if (!recipient.match(/^\d+$/)) {
        throw new Error("Recipient must be a phone number");
      }
      console.log(chalk.yellow(`Sending message "${message}" to ${recipient}`));
      const client = new WhatsApp();
      client.message(message, recipient, true);
    });

  // Wipe secret file
  app
    .command("wipe")
    .description("Wipe secret file")
    .action(() => {
      console.log(chalk.yellow(`Wiping secret file`));
      wipeSecret();
    });

  app.parse();
} catch (err) {
  console.error(err);
  console.error(chalk.red.bold(err.message));
  app.outputHelp();
}
