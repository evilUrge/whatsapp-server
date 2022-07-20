import { existsSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { randomBytes } from "crypto";
import { hostname } from "os";
import { join } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import qrcode from "@cansiny0320/qrcode-terminal";
import jwt from "jsonwebtoken";

export const BASE_PATH = join(fileURLToPath(import.meta.url), "..", "..");
export function findChromiumExecutable(_test = false) {
  return (
    (_test
      ? [_test || "node"]
      : ["chromium", "chromium-browser", "chrome", "google-chrome"]
    )
      .map((term) => execSync(`whereis ${term}`).toString("utf8").split(" ")[1])
      .filter((term) => term && term.split("/").includes("bin"))[0] || false
  );
}
export function generateQRCode(TEXT, params = { small: true }) {
  return qrcode.generate(TEXT, params);
}
export function isSecretFileExists(SECRET_NAME = ".secret") {
  return existsSync(`${BASE_PATH}/${SECRET_NAME}`);
}
export function generateJWT(SECRET_NAME = ".secret", expiresIn = "24h") {
  const PATH_TO_SECRET = `${BASE_PATH}/${SECRET_NAME}`;
  isSecretFileExists(SECRET_NAME) ||
    writeFileSync(PATH_TO_SECRET, randomBytes(32).toString("base64"));
  const secret = readFileSync(PATH_TO_SECRET, "utf8");
  return jwt.sign({ hostname: hostname() }, secret, { expiresIn });
}
export function validateJWT(TOKEN, SECRET_NAME = ".secret") {
  if (!isSecretFileExists(SECRET_NAME)) {
    throw new Error(`${SECRET_NAME} file does not exist`);
  }
  try {
    return jwt.verify(TOKEN, readFileSync(`${BASE_PATH}/${SECRET_NAME}`, "utf8"));
  } catch (err) {
    console.error(err.message);
    return false;
  }
}
export function wipeSecret(SECRET_NAME = ".secret") {
  if (!isSecretFileExists(SECRET_NAME)) {
    return console.info("There is no secret file to wipe");
  }
  return unlinkSync(`${BASE_PATH}/${SECRET_NAME}`);
}
