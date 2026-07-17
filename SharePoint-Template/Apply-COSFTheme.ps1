<#
  Apply-COSFTheme.ps1
  ═══════════════════
  Registers the COSF Intranet Theme (v2.0.0 schema) at the tenant level
  and applies it to the intranet site.

  Run this ONCE as a Global Admin or SharePoint Admin.
  After this, Invoke-PnPSiteTemplate will find the theme by name
  and apply it via the <pnp:BrandingSettings> block.

  Usage:
    .\Apply-COSFTheme.ps1 -TenantUrl "https://turnuphosting-admin.sharepoint.com" `
                          -SiteUrl   "https://turnuphosting.sharepoint.com"
#>
param(
    [string]$TenantUrl = "https://turnuphosting-admin.sharepoint.com",
    [string]$SiteUrl   = "https://turnuphosting.sharepoint.com"
)

# ── 1. Connect ────────────────────────────────────────────────────────────────
Connect-PnPOnline -Url $TenantUrl -Interactive

# ── 2. COSF Theme (Microsoft v2.0.0 schema) ──────────────────────────────────
#    Colors:
#      #0A72B8  COSF Blue   — primary, links, buttons
#      #274B71  Metallic    — nav header (Strong emphasis), dark sections
#      #1D3A56  Top Bar     — darkest shade
#      #74B745  Lime        — accent stripe, highlights
$themeJson = @"
{
  "isInverted": false,
  "palette": {
    "themeDarker":         "#1D3A56",
    "themeDark":           "#274B71",
    "themeDarkAlt":        "#0967A6",
    "themePrimary":        "#0A72B8",
    "themeSecondary":      "#1A7FBF",
    "themeTertiary":       "#3990CC",
    "themeLight":          "#92C2E9",
    "themeLighter":        "#C5DFF5",
    "themeLighterAlt":     "#F0F7FC",
    "neutralDark":         "#151515",
    "neutralPrimary":      "#1D1D1D",
    "neutralPrimaryAlt":   "#2F2F2F",
    "neutralSecondary":    "#3A3A3A",
    "neutralSecondaryAlt": "#595959",
    "neutralTertiary":     "#7A7A7A",
    "neutralTertiaryAlt":  "#C8C8C8",
    "neutralLight":        "#EAEAEA",
    "neutralLighter":      "#F4F4F4",
    "neutralLighterAlt":   "#FAFAFA",
    "neutralQuaternaryAlt":"#DADADA",
    "neutralQuaternary":   "#D0D0D0",
    "black":               "#0B0B0B",
    "white":               "#FFFFFF",
    "primaryBackground":   "#FFFFFF",
    "primaryText":         "#1D1D1D",
    "bodyBackground":      "#FFFFFF",
    "bodyText":            "#1D1D1D",
    "disabledBackground":  "#F4F4F4",
    "disabledText":        "#C8C8C8",
    "error":               "#A4262C",
    "accent":              "#74B745",
    "backgroundColor":     "#FFFFFF"
  },
  "secondaryColors": {
    "light": [
      { "themePrimary": "#0A72B8", "backgroundColor": "#FFFFFF" },
      { "themePrimary": "#FFFFFF", "backgroundColor": "#0A72B8" },
      { "themePrimary": "#0A72B8", "backgroundColor": "#E8F4FC" },
      { "themePrimary": "#E8F4FC", "backgroundColor": "#0A72B8" },
      { "themePrimary": "#FFFFFF", "backgroundColor": "#274B71" },
      { "themePrimary": "#74B745", "backgroundColor": "#274B71" },
      { "themePrimary": "#0A72B8", "backgroundColor": "#F5F5F5" },
      { "themePrimary": "#242424", "backgroundColor": "#F5F5F5" },
      { "themePrimary": "#1D3A56", "backgroundColor": "#FFFFFF" },
      { "themePrimary": "#FFFFFF", "backgroundColor": "#1D3A56" },
      { "themePrimary": "#74B745", "backgroundColor": "#FFFFFF" },
      { "themePrimary": "#FFFFFF", "backgroundColor": "#74B745" },
      { "themePrimary": "#1D3A56", "backgroundColor": "#E8F4FC" }
    ],
    "dark": []
  },
  "displayMode": "light",
  "themeSchemaVersion": "2.0.0",
  "version": "2.0.0"
}
"@

# ── 3. Register theme at tenant level ─────────────────────────────────────────
Write-Host "Registering COSF Intranet Theme at tenant level..." -ForegroundColor Cyan
Add-PnPTenantTheme -Identity "COSF Intranet Theme" -Palette $themeJson -IsInverted $false -Overwrite
Write-Host "✓ Theme registered" -ForegroundColor Green

# ── 4. Apply theme to the intranet site ───────────────────────────────────────
Write-Host "Applying theme to $SiteUrl ..." -ForegroundColor Cyan
Connect-PnPOnline -Url $SiteUrl -Interactive
Set-PnPWebTheme -Theme "COSF Intranet Theme"
Write-Host "✓ Theme applied to site" -ForegroundColor Green

# ── 5. Set header to Strong (COSF navy nav bar) ────────────────────────────────
Set-PnPWeb -HeaderEmphasis Strong
Write-Host "✓ Header emphasis set to Strong (COSF navy nav bar)" -ForegroundColor Green

Write-Host ""
Write-Host "Done! The intranet site now uses the COSF brand colors:" -ForegroundColor Yellow
Write-Host "  Nav bar:  #274B71 (Metallic Navy)"
Write-Host "  Primary:  #0A72B8 (COSF Blue)  — links, buttons"
Write-Host "  Accent:   #74B745 (Lime Green)  — highlights"
