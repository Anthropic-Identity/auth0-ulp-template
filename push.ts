import "dotenv/config";
import { readFileSync } from "fs";

const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;
const clientSecret = process.env.AUTH0_CLIENT_SECRET;

if (!domain || !clientId || !clientSecret) {
  console.error("Missing required env vars: AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET");
  process.exit(1);
}

console.log(`Pushing to tenant: ${domain}`);
await new Promise((resolve) => setTimeout(resolve, 3000));

// Get Management API token via client credentials
const tokenRes = await fetch(`https://${domain}/oauth/token`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    audience: `https://${domain}/api/v2/`,
  }),
});

if (!tokenRes.ok) {
  console.error("Failed to get token:", await tokenRes.text());
  process.exit(1);
}

const { access_token } = await tokenRes.json() as { access_token: string };
console.log("Token acquired.");

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
