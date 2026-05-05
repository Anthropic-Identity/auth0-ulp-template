# ULP Page Template

Deploys a Universal Login page template to an Auth0 tenant via the Management API. To test, you must have:

- A custom domain configured for the tenant
- Load the login page on the custom domain, not the `auth0` domain

## Setup

Copy `.env.example` to `.env` and fill in your values:

- `AUTH0_DOMAIN` — your tenant domain (e.g. `example.auth0.com`)
- `AUTH0_CLIENT_ID` amd `AUTH0_CLIENT_SECRET` — a Machine-to-Machine app authorized on the Management API with the `update:branding` scope

Install dependencies:

```
npm install
```

2. Edit `template.html` as needed.

## Usage

```
npm run push
```

This pushes the contents of `template.liquid` to your tenant's Universal Login template.

## References

- [Customize ULP templates](https://auth0.com/docs/customize/login-pages/universal-login/customize-templates)
- [Management API — PUT universal login](https://auth0.com/docs/api/management/v2/branding/put-universal-login)
