# ULP Page Template

Deploys a Universal Login page template to an Auth0 tenant via the Management API. To test, you must have:

- A custom domain configured for the tenant
- Load the login page on the custom domain, not the `auth0` domain

## Usage

Watch the demo video for a walk-through:

[![](./video-screenshot.png)](https://drive.google.com/file/d/1UnYCBE7wiwhTL36IrmhYY6csoRudLP-G/view?usp=sharing)

First, setup a [Custom Domain](https://auth0.com/docs/customize/custom-domains) for your tenant.

Next, [create a machine-to-machine application](https://auth0.com/docs/get-started/auth0-overview/create-applications/machine-to-machine-apps) authorized for the Management API with at least the `update:branding` scope.

Copy `.env.example` to `.env` and fill in these values using the application above:

- `AUTH0_DOMAIN`: tenant domain (e.g. `example.auth0.com`)
- `AUTH0_CLIENT_ID`: client ID from the application above
- `AUTH0_CLIENT_SECRET`: client secret from the application above

Install dependencies:

```bash
npm install
```

Check the current page template:

```bash
npm run get
```

Edit `template.liquid` as needed then push to the tenant:

```bash
npm run put
```

This pushes the contents of `template.liquid` to your tenant's Universal Login template.

Finally, load a login page on the custom domain (not the `auth0` domain) to see the changes. 

If you need to delete the template:

```bash
npm run delete
```

## References

- [Customize ULP templates](https://auth0.com/docs/customize/login-pages/universal-login/customize-templates)
- [Management API — GET universal login](https://auth0.com/docs/api/management/v2/branding/get-universal-login)
- [Management API — PUT universal login](https://auth0.com/docs/api/management/v2/branding/put-universal-login)
- [Management API — DELETE universal login](https://auth0.com/docs/api/management/v2/branding/delete-universal-login)
