import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline";
import readlinePromises from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRES_IN = "1d";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) continue;

    const separatorIndex = trimmedLine.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function loadLocalEnv() {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));
  loadEnvFile(path.join(cwd, ".env"));
}

function promptHidden(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input,
      output,
      terminal: true,
    });

    rl._writeToOutput = (text) => {
      if (text === query) {
        output.write(text);
      }
    };

    rl.question(query, (answer) => {
      rl.close();
      output.write("\n");
      resolve(answer);
    });
  });
}

async function promptForCredentials() {
  if (!input.isTTY) {
    const lines = fs.readFileSync(0, "utf8").split(/\r?\n/);
    return {
      username: (lines[0] ?? "").trim(),
      password: lines[1] ?? "",
    };
  }

  const rl = readlinePromises.createInterface({ input, output });

  try {
    const username = await rl.question("Username: ");
    rl.close();

    const password = await promptHidden("Password: ");

    return {
      username: username.trim(),
      password,
    };
  } finally {
    if (!rl.closed) rl.close();
  }
}

function createAdminToken() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured. Add it to .env first.");
  }

  return jwt.sign(
    {
      userId: 1,
      email: "admin@example.com",
      role: "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  );
}

async function main() {
  loadLocalEnv();

  const { username, password } = await promptForCredentials();

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    console.error("Invalid username or password.");
    process.exitCode = 1;
    return;
  }

  const token = createAdminToken();

  console.log("Auth Success")
  console.log(token);
}

main().catch((error) => {
  console.error(
    error instanceof Error ? error.message : "Failed to create JWT."
  );
  process.exitCode = 1;
});
