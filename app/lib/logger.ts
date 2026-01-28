import fs from "fs";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const logFilePath = path.join(process.cwd(), "logs", "app.log");
const errorFilePath = path.join(process.cwd(), "logs", "error.log");

function ensureLogDirExists() {
  const dir = path.join(process.cwd(), "logs");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function writeToFile(filePath: string, message: string) {
  ensureLogDirExists();
  fs.appendFileSync(filePath, message + "\n");
}

function formatMessage(level: string, args: unknown[]) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${args.map(String).join(" ")}`;
}

export const logger = {
  log: (...args: unknown[]) => {
    const msg = formatMessage("LOG", args);
    console.log(msg);
    if (isProd) writeToFile(logFilePath, msg);
  },

  warn: (...args: unknown[]) => {
    const msg = formatMessage("WARN", args);
    console.warn(msg);
    if (isProd) writeToFile(logFilePath, msg);
  },

  error: (...args: unknown[]) => {
    const msg = formatMessage("ERROR", args);
    console.error(msg);
    if (isProd) {
      writeToFile(logFilePath, msg);
      writeToFile(errorFilePath, msg);
    }
  },
};
