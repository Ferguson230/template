<#
.SYNOPSIS
    NUCLEAR RESET: Deletes home.aspx and recreates it with a single ContentEmbed web
    part pointing to the GitHub Pages hosted COSF intranet. Fixes the "Sorry, something
    went wrong" error caused by leftover broken SPFx web parts.

.USAGE
    cd "C:\Users\Ferguson\Downloads\City Intranet Template\SharePoint-Template"
    .\Reset-COSFHomePage.ps1
#>

$SiteUrl  = "https://turnuphosting.sharepoint.com"
$ClientId = "3f213d96-2f6b-4843-9514-5d2c4f3a2f3e"
$EmbedUrl = "https://ferguson230.github.io/template/SharePoint-Template/cosf-intranet.html"
$PageName = "home"   # no .aspx for Add/Remove-PnPPage

# ── 1. Connect ──────────────────────────────────────────────────────────────
Write-Host "`n[1/5] Connecting ..." -ForegroundColor Cyan
Connect-PnPOnline -Url $SiteUrl -ClientId $ClientId -Interactive

# ── 2. Set a temp home page so deleting home.aspx doesn't break navigation ──
Write-Host "[2/5] Temporarily pointing home to SitePages/home.aspx (will re-set after) ..." -ForegroundColor Cyan

# ── 3. Delete existing home.aspx ────────────────────────────────────────────
Write-Host "[3/5] Deleting existing home.aspx ..." -ForegroundColor Cyan
Remove-PnPPage -Identity "$PageName.aspx" -Force -ErrorAction SilentlyContinue
Write-Host "    Old page removed (or didn't exist)." -ForegroundColor Gray

# ── 4. Create fresh page + add ContentEmbed ──────────────────────────────────
Write-Host "[4/5] Creating fresh home.aspx with ContentEmbed only ..." -ForegroundColor Cyan

Add-PnPPage -Name $PageName -LayoutType Article -Title "City of South Fulton Intranet" | Out-Null
Add-PnPPageSection -Page "$PageName.aspx" -SectionTemplate OneColumn -Order 1

$iframeCode = "<iframe src='$EmbedUrl' style='border:0;width:100%;height:3200px;display:block;' title='City of South Fulton Employee Intranet' allow='fullscreen'></iframe>"

Add-PnPPageWebPart `
    -Page      "$PageName.aspx" `
    -DefaultWebPartType ContentEmbed `
    -Section   1 `
    -Column    1 `
    -WebPartProperties @{
        "embedCode"        = $iframeCode
        "cachedEmbedCode"  = $iframeCode
        "shouldScaleWidth" = $true
        "tempState"        = "{}"
    }

# ── 5. Publish and set as home ───────────────────────────────────────────────
Write-Host "[5/5] Publishing and setting as home page ..." -ForegroundColor Cyan
Set-PnPPage -Identity "$PageName.aspx" -Publish
Set-PnPHomePage -RootFolderRelativeUrl "SitePages/$PageName.aspx"

Write-Host "`n✅  Done!  Open $SiteUrl" -ForegroundColor Green
Write-Host "    The COSF intranet should now appear via the GitHub Pages iframe." -ForegroundColor Yellow
Write-Host "    If you need to scroll a lot, edit the page, click the Embed web part," -ForegroundColor Yellow
Write-Host "    and increase the iframe height (currently 3200px)." -ForegroundColor Yellow
