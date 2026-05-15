import "dotenv/config";

export function getEnv() {
  const domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;

  if (!domain || !clientId || !clientSecret) {
    console.error("Missing required env vars: AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET");
    process.exit(1);
  }

  return { domain, clientId, clientSecret };
}

export async function confirm(message: string): Promise<void> {
  process.stdout.write(`${message} (y/N): `);
  const answer = await new Promise<string>((resolve) => {
    process.stdin.setEncoding("utf-8");
    process.stdin.once("data", (data) => resolve(data.toString().trim()));
  });
  if (answer.toLowerCase() !== "y") {
    console.log("Aborted.");
    process.exit(0);
  }
}

export async function getAccessToken(domain: string, clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch(`https://${domain}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      audience: `https://${domain}/api/v2/`,
    }),
  });

  if (!res.ok) {
    console.error("Failed to get token:", await res.text());
    process.exit(1);
  }

  const { access_token } = await res.json() as { access_token: string };
  console.log("Token acquired.");
  return access_token;
}
