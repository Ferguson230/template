<#
.SYNOPSIS
    City of South Fulton — SharePoint Intranet Deployment Script
.DESCRIPTION
    Applies the COSF intranet design to an existing SharePoint Online site.
    SAFE: Does NOT delete existing lists, libraries, pages, or content.
    Applies: brand theme, navigation, lists, and site structure.
.PARAMETER SiteUrl
    Full URL of the SharePoint site (e.g. https://cosf.sharepoint.com/sites/intranet)
.PARAMETER TemplateOnly
    Switch: apply only the PnP template (navigation + lists), skip theme registration
.PARAMETER ThemeOnly
    Switch: apply only the brand theme, skip navigation and lists
.EXAMPLE
    .\Deploy-COSFIntranet.ps1 -SiteUrl "https://cosf.sharepoint.com/sites/intranet"
.EXAMPLE
    .\Deploy-COSFIntranet.ps1 -SiteUrl "https://cosf.sharepoint.com/sites/intranet" -ThemeOnly
.NOTES
    Requires: PnP.PowerShell module (v2.x or later)
    Install:  Install-Module PnP.PowerShell -Scope CurrentUser
    Author:   City of South Fulton — IT Department
    Version:  2.0
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,

    [switch]$TemplateOnly,
    [switch]$ThemeOnly
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── Resolve script root ───────────────────────────────────────────────
$ScriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir     = Split-Path -Parent $ScriptDir
$ThemeFile   = Join-Path $RootDir "theme\cosf-theme.json"
$TemplateFile = Join-Path $RootDir "pnp-template\cosf-intranet.xml"
$SiteScriptFile = Join-Path $RootDir "site-design\cosf-site-script.json"

# ── Banner ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   City of South Fulton — Intranet Deployment v2.0       ║" -ForegroundColor Cyan
Write-Host "║   A City on the Rise!                                    ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target site : $SiteUrl" -ForegroundColor Yellow
Write-Host "Theme file  : $ThemeFile"
Write-Host "Template    : $TemplateFile"
Write-Host ""

# ── Prerequisites check ───────────────────────────────────────────────
if (-not (Get-Module -ListAvailable -Name PnP.PowerShell)) {
    Write-Error "PnP.PowerShell module not found. Run: Install-Module PnP.PowerShell -Scope CurrentUser"
}

if (-not (Test-Path $ThemeFile)) {
    Write-Error "Theme file not found: $ThemeFile"
}
if (-not (Test-Path $TemplateFile)) {
    Write-Error "PnP template not found: $TemplateFile"
}

# ── Connect ───────────────────────────────────────────────────────────
Write-Host "Connecting to SharePoint..." -ForegroundColor Cyan
try {
    Connect-PnPOnline -Url $SiteUrl -Interactive
    Write-Host "Connected successfully." -ForegroundColor Green
}
catch {
    Write-Error "Failed to connect: $_"
}

# ── Step 1: Register the theme (tenant admin required) ────────────────
if (-not $TemplateOnly) {
    Write-Host ""
    Write-Host "[1/3] Registering COSF brand theme..." -ForegroundColor Cyan

    $themeJson = Get-Content $ThemeFile -Raw | ConvertFrom-Json
    $palette   = @{}
    $themeJson.PSObject.Properties | Where-Object { $_.Name -notmatch "^_" } | ForEach-Object {
        $palette[$_.Name] = $_.Value
    }

    try {
        # Try tenant-level theme registration (requires Tenant Admin)
        $tenantUrl = $SiteUrl -replace "/sites/.*", ""
        Connect-PnPOnline -Url $tenantUrl -Interactive
        Add-PnPTenantTheme -Name "City of South Fulton" -Palette $palette -IsInverted $false -Overwrite
        Write-Host "    Theme registered at tenant level." -ForegroundColor Green

        # Reconnect to the site
        Connect-PnPOnline -Url $SiteUrl -Interactive
    }
    catch {
        Write-Warning "Could not register at tenant level (need Global/SharePoint Admin). Applying theme directly to site instead."
        # Apply palette directly to the site
        Set-PnPWebTheme -Theme $palette -WebUrl $SiteUrl
    }

    # Apply theme to the site
    try {
        Set-PnPWebTheme -Name "City of South Fulton" -WebUrl $SiteUrl
        Write-Host "    Theme applied to site." -ForegroundColor Green
    }
    catch {
        Write-Warning "Theme name apply failed — theme was applied directly via palette."
    }
}

# ── Step 2: Apply PnP provisioning template ───────────────────────────
if (-not $ThemeOnly) {
    Write-Host ""
    Write-Host "[2/3] Applying PnP provisioning template..." -ForegroundColor Cyan
    Write-Host "      (Navigation, lists, and site structure — NO data overwrite)" -ForegroundColor DarkGray

    $params = @{
        Path              = $TemplateFile
        ClearNavigation   = $false   # Adds nav nodes; does not wipe existing ones first
        OverwriteSystemPropertyBagValues = $true
    }

    try {
        Invoke-PnPSiteTemplate @params
        Write-Host "    PnP template applied." -ForegroundColor Green
    }
    catch {
        Write-Warning "PnP template apply encountered an issue: $_"
        Write-Warning "Partial application may have occurred. Check the site and re-run if needed."
    }
}

# ── Step 3: Apply additional site settings via CSOM ──────────────────
if (-not $ThemeOnly) {
    Write-Host ""
    Write-Host "[3/3] Applying site branding settings..." -ForegroundColor Cyan

    try {
        # Set site title & description
        $web = Get-PnPWeb
        Set-PnPWeb -Title $web.Title -Description "City of South Fulton Employee Intranet"

        # Enable modern pages if not already
        Enable-PnPFeature -Identity "B6917CB1-93A0-4B97-A84D-7CF49975D4EC" -Scope Web -Force

        # Set header layout to Extended (shows nav bar prominently)
        Set-PnPWebHeader -HeaderLayout Extended -HeaderEmphasis None

        Write-Host "    Site settings applied." -ForegroundColor Green
    }
    catch {
        Write-Warning "Some site settings could not be applied: $_"
    }
}

# ── Done ──────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor Yellow
Write-Host "  1. Open the site and verify the navigation looks correct"
Write-Host "  2. Go to Settings > Change the look > Theme and confirm 'City of South Fulton' is active"
Write-Host "  3. Upload the city logo to Site Assets and set it via Set-PnPSiteLogo"
Write-Host "  4. Edit the Home page in SharePoint to add the News, Events, and Quick Links web parts"
Write-Host "  5. Populate the 'Department Directory' list with current staff info if needed"
Write-Host ""
Write-Host "  Support: IT Department x2301" -ForegroundColor DarkGray
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Green

Disconnect-PnPOnline
