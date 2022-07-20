import express from "express";
import bearerToken from "express-bearer-token";
import { default as WhatsApp } from "./whatsapp.js";
import { isSecretFileExists, generateJWT, validateJWT } from "./utils.js";

const app = express();
app.use(bearerToken());

export default function (port = 3352) {
  app.use(express.json());
  if (!isSecretFileExists()) {
    const JWT = generateJWT(".secret", "365 days");
    console.log(
      `# A secret file has been created\n# a JWT bearer token has been generated\n# Please keep a copy of this in a secure place`
    );
    console.log(`JWT: ${JWT}`);
  }
  const client = new WhatsApp();
  app.post("/message", async (req, res) => {
    if (!req.token) {
      return res.status(401).send("Unauthorized");
    }
    if (!validateJWT(req.token)) {
      return res.status(401).send("Unauthorized");
    }
    if (!req.body) {
      return res.send("No message body").status(400);
    } else if (!req.body.message || !req.body.recipient) {
      return res.send("Missing params").status(400);
    }
    client.message(req.body.message, req.body.recipient);
    return res
      .send(`"${req.body.message}" will be sent to ${req.body.recipient}`)
      .status(200);
  });
  return app.listen(port, () =>
    console.info(
      `Server started on port ${port}!\nUse this URL to send messages: http://localhost:${port}/message`
    )
  );
}
