# Deploy on MassarCloud cPanel (engineering.reliablecompany.sa)

Host the Next.js app on a **subdomain** while keeping the main site at [reliablecompany.sa](https://reliablecompany.sa) unchanged.

**CMS on cPanel:** No Vercel KV or Blob required. Content saves to `data/cms-store.json`; uploads go to `public/uploads/`.

---

## Prerequisites

- MassarCloud cPanel with **Setup Node.js App** (Node 18+)
- Subdomain: `engineering.reliablecompany.sa`
- SSH or cPanel **Terminal** access (for `npm run build`)

---

## 1. Create subdomain

1. cPanel → **Subdomains**
2. Subdomain: `engineering`
3. Domain: `reliablecompany.sa`
4. Document root: `engineering.reliablecompany.sa` (default is fine)
5. **Create**

Do **not** put files in `public_html` — that folder is for the main site.

---

## 2. Upload the project

Upload the full repo into the subdomain folder, e.g.:

```
/home/USERNAME/engineering.reliablecompany.sa/
```

**Include:** `src/`, `data/`, `public/`, `package.json`, `server.js`, etc.  
**Exclude:** `node_modules/`, `.next/` (rebuild on server)

Or clone from GitHub:

```bash
cd ~
git clone https://github.com/sujalsuthar/reliable.git engineering.reliablecompany.sa
cd engineering.reliablecompany.sa
```

---

## 3. Install and build

```bash
cd ~/engineering.reliablecompany.sa
npm install
npm run build
```

cPanel **Setup Node.js App** also has **Run NPM Install** — use that for install, but you still need `npm run build` in Terminal.

---

## 4. Create Node.js application

cPanel → **Setup Node.js App** → **CREATE APPLICATION**

| Field | Value |
|--------|--------|
| Node.js version | **18.20** or newer |
| Application mode | **Production** |
| Application root | `engineering.reliablecompany.sa` |
| Application URL | `engineering.reliablecompany.sa` |
| Application startup file | `server.js` |

### Environment variables (Add Variable)

| Name | Value |
|------|--------|
| `NODE_ENV` | `production` |
| `SITE_URL` | `https://engineering.reliablecompany.sa` |
| `ADMIN_USERNAME` | `admin` (or your choice) |
| `ADMIN_PASSWORD` | strong password |
| `ADMIN_SESSION_SECRET` | long random string (**min. 32 characters**) |

**Do not set** `KV_*` or `BLOB_*` on cPanel unless you want cloud storage.

Click **Create**, then **Restart** the application.

---

## 5. Folder permissions

Ensure the Node process can write CMS data:

- `data/` → writable (755 or 775)
- `public/uploads/` → writable (755 or 775)

cPanel **File Manager** → right-click folder → **Change Permissions**.

---

## 6. SSL

cPanel → **SSL/TLS Status** → run **AutoSSL** for `engineering.reliablecompany.sa`.

Test:

- https://engineering.reliablecompany.sa
- https://engineering.reliablecompany.sa/admin/login

---

## 7. Verify CMS persistence

1. Log in to `/admin/login`
2. Change site name or add a test blog post
3. Refresh the homepage — change should remain
4. In File Manager, confirm `data/cms-store.json` was updated
5. Upload an image — confirm file appears in `public/uploads/`

---

## Updating the site later

```bash
cd ~/engineering.reliablecompany.sa
git pull                    # or upload changed files only
npm install
npm run build
```

Then **Restart** the Node.js app in cPanel.

**Important:** Do not delete `data/cms-store.json` or `public/uploads/` when updating code.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 503 / app won't start | Run `npm run build`; check `server.js` exists; Restart app |
| Admin login fails | Check `ADMIN_PASSWORD` in cPanel env vars |
| CMS save fails | Make `data/` writable |
| Image upload fails | Make `public/uploads/` writable |
| Wrong URLs in SEO | Set `SITE_URL` and rebuild (`npm run build`) |
| Main site broken | App must be in subdomain folder, not `public_html` |

---

## Vercel vs cPanel

| | Vercel | cPanel |
|---|--------|--------|
| CMS storage | Upstash Redis (KV) | `data/cms-store.json` |
| Image uploads | Vercel Blob | `public/uploads/` |
| Startup | Auto | `server.js` |
| Env vars | Vercel dashboard | cPanel Node.js app |

See also [README](../README.md) for local development and Vercel deployment.
