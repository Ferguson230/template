<#
.SYNOPSIS
    Wires up home.aspx to show cosf-intranet.html via a ContentEmbed web part.
    Run AFTER manually uploading cosf-intranet.html to SiteAssets in the browser.

.USAGE
    cd "C:\Users\Ferguson\Downloads\City Intranet Template\SharePoint-Template"
    .\Deploy-COSFWebPartOnly.ps1
#>

$SiteUrl  = "https://turnuphosting.sharepoint.com"
$ClientId = "3f213d96-2f6b-4843-9514-5d2c4f3a2f3e"
$EmbedUrl = "https://ferguson230.github.io/template/SharePoint-Template/cosf-intranet.html"
$PageName = "home.aspx"

# ── 1. Connect ──────────────────────────────────────────────────────────────
Write-Host "`n[1/4] Connecting ..." -ForegroundColor Cyan
Connect-PnPOnline -Url $SiteUrl -ClientId $ClientId -Interactive

# ── 2. Clear existing web parts ─────────────────────────────────────────────
Write-Host "[2/4] Clearing home page web parts ..." -ForegroundColor Cyan
$page = Get-PnPPage -Identity $PageName -ErrorAction Stop

foreach ($ctrl in ($page.Sections | ForEach-Object { $_.Controls })) {
    Remove-PnPPageComponent -Page $PageName -InstanceId $ctrl.InstanceId -Force -ErrorAction SilentlyContinue
}
$page = Get-PnPPage -Identity $PageName
foreach ($s in ($page.Sections | Sort-Object Order -Descending)) {
    Remove-PnPPageSection -Page $PageName -Section $s.Order -Force -ErrorAction SilentlyContinue
}

# ── 3. Add ContentEmbed web part ─────────────────────────────────────────────
Write-Host "[3/4] Adding ContentEmbed web part pointing to $EmbedUrl ..." -ForegroundColor Cyan

# OneColumn  = standard section that accepts ALL web part types
# ContentEmbed = correct PnP enum name for the SharePoint Embed web part
Add-PnPPageSection -Page $PageName -SectionTemplate OneColumn -Order 1

$iframeCode = "<iframe src='$EmbedUrl' style='border:0;width:100%;height:1500px;display:block;' title='City of South Fulton Employee Intranet'></iframe>"

Add-PnPPageWebPart `
    -Page      $PageName `
    -DefaultWebPartType ContentEmbed `
    -Section   1 `
    -Column    1 `
    -WebPartProperties @{
        "embedCode"        = $iframeCode
        "cachedEmbedCode"  = $iframeCode
        "shouldScaleWidth" = $true
        "tempState"        = "{}"
    }

# ── 4. Publish ───────────────────────────────────────────────────────────────
Write-Host "[4/4] Publishing ..." -ForegroundColor Cyan
Set-PnPPage -Identity $PageName -Publish
Set-PnPHomePage -RootFolderRelativeUrl "SitePages/$PageName"

Write-Host "`n✅  Done!  Open $SiteUrl" -ForegroundColor Green
