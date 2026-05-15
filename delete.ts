import { confirm, getAccessToken, getEnv } from "./mgmt.ts";

const { domain, clientId, clientSecret } = getEnv();

console.log(`Deleting template on tenant: ${domain}`);
await confirm("Confirm delete");

const access_token = await getAccessToken(domain, clientId, clientSecret);

const deleteRes = await fetch(`https://${domain}/api/v2/branding/templates/universal-login`, {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${access_token}`,
  },
});

if (!deleteRes.ok) {
  console.error("Failed to delete template:", await deleteRes.text());
  process.exit(1);
}

console.log("Template deleted successfully.");
process.exit(0);
