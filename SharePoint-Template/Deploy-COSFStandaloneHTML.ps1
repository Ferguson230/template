<#
.SYNOPSIS
    Deploys the COSF standalone intranet HTML to SharePoint and wires up
    the home page via the ContentEmbed (Embed) web part.

.NOTES
    Run from the SharePoint-Template folder:
        cd "C:\Users\Ferguson\Downloads\City Intranet Template\SharePoint-Template"
        .\Deploy-COSFStandaloneHTML.ps1

    Requirements:
        Install-Module PnP.PowerShell -AllowClobber -Force   (if not already installed)

    Fixes vs previous version:
        - DefaultWebPartType Embed  →  ContentEmbed  (correct PnP enum name)
        - OneColumnFullWidth        →  OneColumn     (FullWidth rejects non-Hero web parts)
        - SiteAssets access denied  →  tries SiteAssets first, falls back to Documents
        - Adds explicit error check after file upload so script stops early if it failed
#>

$SiteUrl  = "https://turnuphosting.sharepoint.com"
$ClientId = "3f213d96-2f6b-4843-9514-5d2c4f3a2f3e"
$HtmlFile = Join-Path $PSScriptRoot "..\cosf-intranet.html"
$PageName = "home.aspx"

# ── 1. Connect ──────────────────────────────────────────────────────────────
Write-Host "`n[1/5] Connecting to $SiteUrl ..." -ForegroundColor Cyan
Connect-PnPOnline -Url $SiteUrl -ClientId $ClientId -Interactive

# ── 2. Upload HTML — try SiteAssets, fall back to Documents ─────────────────
Write-Host "[2/5] Uploading cosf-intranet.html ..." -ForegroundColor Cyan

if (-not (Test-Path $HtmlFile)) {
    Write-Error "HTML file not found at: $HtmlFile"
    exit 1
}

$uploaded  = $false
$embedUrl  = ""
$siteHost  = ([System.Uri]$SiteUrl).Scheme + "://" + ([System.Uri]$SiteUrl).Host
$webRelUrl = (Get-PnPWeb).ServerRelativeUrl.TrimEnd('/')

foreach ($lib in @("SiteAssets", "Documents")) {
    try {
        Write-Host "    Trying library: $lib ..." -ForegroundColor Gray
        Add-PnPFile -Path $HtmlFile -Folder $lib -NewFileName "cosf-intranet.html" -ErrorAction Stop | Out-Null
        $embedUrl = "$siteHost$webRelUrl/$lib/cosf-intranet.html"
        Write-Host "    ✅ Uploaded to: $embedUrl" -ForegroundColor Green
        $uploaded = $true
        break
    } catch {
        Write-Host "    ⚠ Failed ($lib): $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

if (-not $uploaded) {
    Write-Error @"
Could not upload the HTML file to SiteAssets or Documents.
Manual fix: open SharePoint → Site contents → SiteAssets → Upload → cosf-intranet.html
Then rerun this script with -SkipUpload switch (add below).
"@
    exit 1
}

# ── 3. Clean up home page ───────────────────────────────────────────────────
Write-Host "[3/5] Clearing existing web parts from $PageName ..." -ForegroundColor Cyan
$page = Get-PnPPage -Identity $PageName -ErrorAction Stop

foreach ($ctrl in ($page.Sections | ForEach-Object { $_.Controls })) {
    Remove-PnPPageComponent -Page $PageName -InstanceId $ctrl.InstanceId -Force -ErrorAction SilentlyContinue
}
$page = Get-PnPPage -Identity $PageName
foreach ($s in ($page.Sections | Sort-Object Order -Descending)) {
    Remove-PnPPageSection -Page $PageName -Section $s.Order -Force -ErrorAction SilentlyContinue
}

# ── 4. Add ContentEmbed web part in a OneColumn section ─────────────────────
Write-Host "[4/5] Adding ContentEmbed web part ..." -ForegroundColor Cyan

# OneColumn = standard single-column section (works with all web part types)
# OneColumnFullWidth = ONLY accepts Hero or Image web parts — do NOT use here
Add-PnPPageSection -Page $PageName -SectionTemplate OneColumn -Order 1

$iframeHtml = "<iframe src='$embedUrl' " +
              "style='border:0;width:100%;height:1400px;display:block;' " +
              "title='City of South Fulton Employee Intranet'></iframe>"

Add-PnPPageWebPart `
    -Page      $PageName `
    -DefaultWebPartType ContentEmbed `
    -Section   1 `
    -Column    1 `
    -WebPartProperties @{
        "embedCode"       = $iframeHtml
        "cachedEmbedCode" = $iframeHtml
        "shouldScaleWidth" = $true
        "tempState"       = "{}"
    }

# ── 5. Publish ───────────────────────────────────────────�