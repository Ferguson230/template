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

try {
  # Get or create the home page
  $page = Get-PnPPage -Identity "home.aspx" -ErrorAction Stop
  Write-Host "Found home.aspx" -ForegroundColor Green
}
catch {
  Write-Host "Creating home.aspx..." -ForegroundColor Yellow
  $page = Add-PnPPage -Name "home.aspx" -Title "City of South Fulton Intranet" -LayoutType Article
}

# Clear existing sections so we start clean
$page.ClearPage()
$page.Update()
$page = Get-PnPPage -Identity "home.aspx"

# --- Section 1: Full-width Hero ---
Add-PnPPageSection -Page $page -SectionTemplate OneColumn -Order 1
Add-PnPPageWebPart -Page $page -DefaultWebPartType Hero -Section 1 -Column 1 -Order 1
Write-Host "  Added Hero web part" -ForegroundColor Green

# --- Section 2: Two-column News + Quick Links ---
Add-PnPPageSection -Page $page -SectionTemplate TwoColumn -Order 2

Add-PnPPageWebPart -Page $page -DefaultWebPartType News -Section 2 -Column 1 -Order 1
Write-Host "  Added News web part" -ForegroundColor Green

Add-PnPPageWebPart -Page $page -DefaultWebPartType QuickLinks -Section 2 -Column 2 -Order 1
Write-Host "  Added Quick Links web part" -ForegroundColor Green

# --- Section 3: Highlighted content (announcements) ---
Add-PnPPageSection -Page $page -SectionTemplate OneColumn -Order 3
Add-PnPPageWebPart -Page $page -DefaultWebPartType HighlightedContent -Section 3 -Column 1 -Order 1
Write-Host "  Added Highlighted Content web part" -ForegroundColor Green

# Publish and set as home page
Set-PnPPage -Identity "home.aspx" -Publish
Set-PnPHomePage -RootFolderRelativeUrl "SitePages/home.aspx"

Write-Host ""
Write-Host "Home page ready!" -ForegroundColor Cyan
Write-Host "Open $SiteUrl to see the result." -ForegroundColor Cyan
Write-Host "Use the SharePoint Edit button to customize web part content." -ForegroundColor Yellow
