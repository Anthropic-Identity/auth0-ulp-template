import { readFileSync } from "fs";
import { confirm, getAccessToken, getEnv } from "./mgmt.ts";

const { domain, clientId, clientSecret } = getEnv();

console.log(`Pushing to tenant: ${domain}`);
await confirm("Confirm push");

const access_token = await getAccessToken(domain, clientId, clientSecret);

// Read template
const template = readFileSync("template.liquid", "utf-8");

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
