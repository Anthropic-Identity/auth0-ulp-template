import { readFileSync, readdirSync } from "fs";
import { confirm, getAccessToken, getEnv } from "./mgmt.ts";

const { domain, clientId, clientSecret } = getEnv();

const templateName = process.argv[2];
let templateFile = "template.liquid";

if (templateName) {
  const files = readdirSync(".");
  const match = files.find(
    (f) => f.endsWith(".liquid") && f.includes(templateName)
  );
  if (!match) {
    console.error(`No template file found matching: ${templateName}`);
    process.exit(1);
  }
  templateFile = match;
}

console.log(`Pushing to tenant: ${domain}`);
await confirm(`Confirm push of ${templateFile}`);

const access_token = await getAccessToken(domain, clientId, clientSecret);

// Read template
const template = readFileSync(templateFile, "utf-8");

// PUT the universal login template
const updateRes = await fetch(`https://${domain}/api/v2/branding/templates/universal-login`, {
  method: "PUT",
  headers: {
    "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ template }),
});

if (!updateRes.ok) {
  console.error("Failed to update template:", await updateRes.text());
  process.exit(1);
}

console.log("Template updated successfully.");
process.exit(0);
