import { getAccessToken, getEnv } from "./mgmt.ts";

const { domain, clientId, clientSecret } = getEnv();

const access_token = await getAccessToken(domain, clientId, clientSecret);

const res = await fetch(`https://${domain}/api/v2/branding/templates/universal-login`, {
  headers: {
    "Authorization": `Bearer ${access_token}`,
  },
});

if (!res.ok) {
  console.error("Failed to get template:", await res.text());
  process.exit(1);
}

const { body } = await res.json() as { body: string };
console.log(body);
process.exit(0);
