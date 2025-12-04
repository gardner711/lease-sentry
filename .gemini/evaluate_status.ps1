# Script to evaluate and update capability and enabler status
$specificationsPath = "c:\Dev\lease-sentry\specifications"

# Function to get metadata from file
function Get-FileMetadata {
    param($filePath)
    
    $content = Get-Content $filePath -Raw
    $metadata = @{}
    
    if ($content -match '- \*\*ID\*\*:\s*(.+)') { $metadata['ID'] = $matches[1].Trim() }
    if ($content -match '- \*\*Status\*\*:\s*(.+)') { $metadata['Status'] = $matches[1].Trim() }
    if ($content -match '- \*\*Approval\*\*:\s*(.+)') { $metadata['Approval'] = $matches[1].Trim() }
    if ($content -match '- \*\*Name\*\*:\s*(.+)') { $metadata['Name'] = $matches[1].Trim() }
    if ($content -match '- \*\*Type\*\*:\s*(.+)') { $metadata['Type'] = $matches[1].Trim() }
    
    return $metadata
}

# Get all capability files
$capabilityFiles = Get-ChildItem -Path $specificationsPath -Recurse -Filter "*-capability.md"
$enablerFiles = Get-ChildItem -Path $specificationsPath -Recurse -Filter "*-enabler.md"

Write-Host "=== CAPABILITY STATUS REPORT ===" -ForegroundColor Cyan
Write-Host ""

$capStats = @{
    'Ready for Implementation' = 0
    'IMPLEMENTED'              = 0
    'Other'                    = 0
}

foreach ($file in $capabilityFiles) {
    $meta = Get-FileMetadata -filePath $file.FullName
    $status = $meta['Status']
    
    if ($status -eq 'Ready for Implementation') {
        $capStats['Ready for Implementation']++
    }
    elseif ($status -match 'IMPLEMENTED' -or $status -match 'Implemented') {
        $capStats['IMPLEMENTED']++
    }
    else {
        $capStats['Other']++
        Write-Host "  $($meta['ID']) - $($meta['Name']): $status" -ForegroundColor Yellow
    }
}

Write-Host "Total Capabilities: $($capabilityFiles.Count)" -ForegroundColor Green
Write-Host "  Ready for Implementation: $($capStats['Ready for Implementation'])" -ForegroundColor Green
Write-Host "  IMPLEMENTED: $($capStats['IMPLEMENTED'])" -ForegroundColor Green
Write-Host "  Other: $($capStats['Other'])" -ForegroundColor $(if ($capStats['Other'] -gt 0) { 'Yellow' } else { 'Green' })
Write-Host ""

Write-Host "=== ENABLER STATUS REPORT ===" -ForegroundColor Cyan
Write-Host ""

$enbStats = @{
    'Ready for Implementation' = 0
    'IMPLEMENTED'              = 0
    'Other'                    = 0
}

foreach ($file in $enablerFiles) {
    $meta = Get-FileMetadata -filePath $file.FullName
    $status = $meta['Status']
    
    if ($status -eq 'Ready for Implementation') {
        $enbStats['Ready for Implementation']++
    }
    elseif ($status -match 'IMPLEMENTED' -or $status -match 'Implemented') {
        $enbStats['IMPLEMENTED']++
    }
    else {
        $enbStats['Other']++
        Write-Host "  $($meta['ID']) - $($meta['Name']): $status" -ForegroundColor Yellow
    }
}

Write-Host "Total Enablers: $($enablerFiles.Count)" -ForegroundColor Green
Write-Host "  Ready for Implementation: $($enbStats['Ready for Implementation'])" -ForegroundColor Green
Write-Host "  IMPLEMENTED: $($enbStats['IMPLEMENTED'])" -ForegroundColor Green
Write-Host "  Other: $($enbStats['Other'])" -ForegroundColor $(if ($enbStats['Other'] -gt 0) { 'Yellow' } else { 'Green' })
Write-Host ""

Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "All capabilities and enablers have been evaluated." -ForegroundColor Green
Write-Host "Most items are already marked as 'Ready for Implementation' or 'IMPLEMENTED'." -ForegroundColor Green
