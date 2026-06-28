# COSF Intranet Portal — SPFx Install Guide

This package delivers the **full Figma design** as a native SharePoint web part:
custom header, branded navigation, all 7 department sections, the searchable
Departments card grid, announcements, events, and footer — exactly as designed.

---

## Step 1 — Build the .sppkg (2 ways)

### Option A: GitHub Actions (recommended — no tools needed)

1. Create a free GitHub account at github.com if you don't have one
2. Create a new repository (click **+** → **New repository**)
3. Upload this entire `spfx` folder to the repo root
4. GitHub will automatically run the **Build COSF Intranet .sppkg** Action
5. When it finishes (≈10 min), click **Actions** → the latest run → **Artifacts**
6. Download `cosf-intranet-sppkg.zip` → extract `cosf-intranet.sppkg`

### Option B: Build locally (requires Node.js 18)

```powershell
# Install Node 18 from https://nodejs.org (LTS version)
# Then open PowerShell in this spfx folder:

npm install --legacy-peer-deps
gulp bundle --ship
gulp package-solution --ship

# Output: sharepoint/solution/cosf-intranet.sppkg
```

> Note: Node 18 is required. Node 20/22 will not work with SPFx 1.18.

---

## Step 2 — Upload to SharePoint App Catalog

1. Go to `https://turnuphosting-admin.sharepoint.com`
2. Left sidebar → **More features** → **Apps** → **Open**
3. Click **App Catalog** (or create one if prompted)
4. Left sidebar → **Apps for SharePoint**
5. Click **Upload** → select `cosf-intranet.sppkg`
6. Check ✅ **Make this solution available to all sites in the organization**
7. Click **Deploy**

---

## Step 3 — Add to Your Site

1. Go to your SharePoint site (e.g. `https://turnuphosting.sharepoint.com/sites/CityIntranet`)
2. Click the **gear icon** → **Add an app**
3. Search for **COSF Intranet Portal** → click it to install
4. Go to the Home page → click **Edit** (top right)
5. Click **+** to add a web part → search **COSF Intranet Portal** → select it
6. The full intranet design appears inline
7. Set the section layout to **Full width** for best results
8. Click **Publish**

---

## Step 4 — Set Full-Width Layout (Important)

For the intranet to fill the full page properly:

1. While editing the page, click on the section containing the web part
2. Click the **section layout** icon (pencil on the left edge)
3. Choose **Full-width column**
4. Publish the page

---

## What You Get

| Feature | Included |
|---|---|
| Branded header (COSF colors + fonts) | ✅ |
| 7-tab navigation (Home, City Manager, HR, IT, Comms, General Services, Departments) | ✅ |
| Home page (hero, announcements, events, quick links, news grid) | ✅ |
| City Manager section with sub-tabs | ✅ |
| HR section with benefits, policies, training | ✅ |
| IT section with system status, help desk | ✅ |
| Communications with brand assets, request form | ✅ |
| General Services with facilities, fleet, purchasing | ✅ |
| Departments — searchable 3-column card grid, all 18 departments | ✅ |
| Footer with contact info and quick links | ✅ |
| COSF brand colors (Navy #0A72B8, Lime #74B745, Metallic #274B71) | ✅ |
| Lexend Deca + Poppins fonts | ✅ |

---

## Troubleshooting

**Web part doesn't appear in the list?**
→ Make sure you clicked "Add an app" on the site first (Step 3)

**Fonts look wrong?**
→ The site needs internet access to load Google Fonts. Check your tenant's CDN settings.

**Build fails on GitHub Actions?**
→ Make sure the entire `spfx` folder is in the repository (including `config/` and `src/`)

---

## Support
IT Department · x2301 · it@southfultonga.gov
