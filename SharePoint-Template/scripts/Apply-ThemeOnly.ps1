<#
.SYNOPSIS
    Apply only the COSF brand theme to a SharePoint site (no structural changes).
.EXAMPLE
    .\Apply-ThemeOnly.ps1 -SiteUrl "https://cosf.sharepoint.com/sites/intranet"
#>
param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ThemeFile = Join-Path (Split-Path -Parent $ScriptDir) "theme\cosf-theme.json"

Connect-PnPOnline -Url $SiteUrl -Interactive

$themeJson = Get-Content $ThemeFile -Raw | ConvertFrom-Json
$palette   = @{}
$themeJson.PSObject.Properties | Where-Object { $_.Name -notmatch "^_" } | ForEach-Object {
    $palette[$_.Name] = $_.Value
}

Set-PnPWebTheme -Theme $palette -WebUrl $SiteUrl
Write-Host "COSF theme applied to $SiteUrl" -ForegroundColor Green

Disconnect-PnPOnline
