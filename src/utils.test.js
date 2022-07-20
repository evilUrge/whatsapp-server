import { existsSync, readFileSync, unlinkSync } from "fs";
import { jest } from "@jest/globals";
import {
  BASE_PATH,
  findChromiumExecutable,
  generateQRCode,
  generateJWT,
  validateJWT
} from "./utils";
describe("Test utils", () => {
  it("findChromiumExecutable", () => {
    const res = findChromiumExecutable("node");
    expect(res).toBeTruthy();
    expect(res.includes("node")).toBeTruthy();
    expect(res.includes("bin")).toBeTruthy();
  });
  it("generateQRCode", () => {
    const logSpy = jest.spyOn(console, "log");
    generateQRCode("test");
    const res = `▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▄ ██ █ ▄▄▄▄▄ █
█ █   █ █ █▄▀▄█ █   █ █
█ █▄▄▄█ █▄▄▄███ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀ █▄█▄▄▄▄▄▄▄█
█ ▄▄ ▀▀▄▀▄█ █▀▄█▀▄  █ █
█ █ ▀▄▄▄▀▀█ █  ▄▄▄▀█ ▄█
██▄▄█▄█▄█▀▄ ▄█ █▀▄ █ ██
█ ▄▄▄▄▄ ██▀▄▀▀  █▄  ███
█ █   █ █▀ ▄▄█▀▄█▀▀▄ ▄█
█ █▄▄▄█ █ ▀  ▀▄▀█ ▀▄█▀█
█▄▄▄▄▄▄▄█▄▄█▄▄██▄██████
`;
    expect(logSpy).toHaveBeenCalledWith(res);
  });
  it("Create and validate a JWT token", () => {
    const SECRET_LOCATION = `${BASE_PATH}/.test`;
    const token = generateJWT('.test');
    expect(existsSync(SECRET_LOCATION)).toBeTruthy();
    expect(token).toBeTruthy();
    expect(validateJWT(token, '.test')).toBeTruthy();
  });
  afterAll(() =>{
    unlinkSync(`${BASE_PATH}/.test`);
  })
});
