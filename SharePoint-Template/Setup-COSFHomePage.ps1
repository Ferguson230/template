#Requires -Modules PnP.PowerShell
<#
.SYNOPSIS
  Sets up the COSF Intranet home page with Hero, News, and Quick Links web parts.
  Run this AFTER Invoke-PnPSiteTemplate has completed.

.USAGE
  Connect-PnPOnline -Url "https://turnuphosting.sharepoint.com" -ClientId "3f213d96-2f6b-4843-9514-5d2c4f3a2f3e" -Interactive
  .\Setup-COSFHomePage.ps1
#>

param(
  [string]$SiteUrl = "https://turnuphosting.sharepoint.com"
)

Write-Host "Setting up COSF home page web parts..." -ForegroundColor Cyan

# Get home page
try {
  $page = Get-PnPPage -Identity "home.aspx" -ErrorAction Stop
  Write-Host "Found home.aspx" -ForegroundColor Green
} catch {
  Write-Host "Creating home.aspx..." -ForegroundColor Yellow
  $page = Add-PnPPage -Name "home.aspx" -Title "City of South Fulton Intranet" -LayoutType Article
}

# Clear and rebuild sections
$page.ClearPage()
$page.Save()

# Reload after clear
$page = Get-PnPPage -Identity "home.aspx"

# Section 1: Hero (full width)
Add-PnPPageSection -Page $page -SectionTemplate OneColumn -Order 1
Add-PnPPageWebPart -Page $page -DefaultWebPartType Hero -Section 1 -Column 1 -Order 1
Write-Host "  Added Hero" -ForegroundColor Green

# Save before adding two-column section (required to get correct column indexes)
Set-PnPPage -Identity "home.aspx" -Publish
$page = Get-PnPPage -Identity "home.aspx"

# Section 2: News (left) + Quick Links (right)
Add-PnPPageSection -Page $page -SectionTemplate TwoColumn -Order 2
Add-PnPPageWebPart -Page $page -DefaultWebPartType News      -Section 2 -Column 1 -Order 1
Add-PnPPageWebPart -Page $page -DefaultWebPartType QuickLinks -Section 2 -Column 2 -Order 1
Write-Host "  Added News + Quick Links" -ForegroundColor Green

# Section 3: Content Rollup (announcements / highlighted content)
Add-PnPPageSection -Page $page -SectionTemplate OneColumn -Order 3
Add-PnPPageWebPart -Page $page -DefaultWebPartType ContentRollup -Section 3 -Column 1 -Order 1
Write-Host "  Added Content Rollup" -ForegroundColor Green

# Publish and set as home
Set-PnPPage -Identity "home.aspx" -Publish
Set-PnPHomePage -RootFolderRelativeUrl "SitePages/home.aspx"

Write-Host ""
Write-Host "Home page ready! Open $SiteUrl" -ForegroundColor Cyan
Write-Host "Use the SharePoint Edit button to customize web part content and images." -ForegroundColor Yellow
