import { platform } from "os";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import { generateQRCode } from "./utils.js";

export default class WhatsApp {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      ...(platform() === "linux" && {
        puppeteer: {
          headless: true,
          executablePath: findChromiumExecutable(),
        },
      }),
    });
    this.client.on("qr", (qr) => generateQRCode(qr, { small: true }));
    // this.client.initialize(); // get me back once a new version is out
  }
  async teardown(ml = 50000) {
    await new Promise((r) => setTimeout(r, ml));
    return this.client.destroy();
  }
  message(message, number, teardown = true, timeout = 10000) { // TODO: chnage teardown to false once a new version is out
    this.client.initialize(); // ugly hack to make sure the client is initialized due to a messging bug
    this.client.on("ready", () => {
      this.client.sendMessage(`${number}@c.us`, message);
      console.info(`Message has been sent to ${number}`);
      if (teardown) this.teardown(timeout);
    });
  }
}
