# Script to update all remaining Implemented/IMPLEMENTED capabilities and enablers to Ready for Implementation
$specificationsPath = "c:\Dev\lease-sentry\specifications"

# Get all capability and enabler files
$capabilityFiles = Get-ChildItem -Path $specificationsPath -Recurse -Filter "*-capability.md"
$enablerFiles = Get-ChildItem -Path $specificationsPath -Recurse -Filter "*-enabler.md"
$allFiles = $capabilityFiles + $enablerFiles

$updatedFiles = @()
$totalUpdates = 0

foreach ($file in $allFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $fileUpdates = 0
    
    # Count occurrences before replacement
    $implementedCount = ([regex]::Matches($originalContent, '- \*\*Status\*\*:\s*IMPLEMENTED')).Count
    $implementedCaseCount = ([regex]::Matches($originalContent, '- \*\*Status\*\*:\s*Implemented')).Count
    
    # Replace status: - **Status**: IMPLEMENTED
    $content = $content -replace '- \*\*Status\*\*:\s*IMPLEMENTED', '- **Status**: Ready for Implementation'
    
    # Replace status: - **Status**: Implemented
    $content = $content -replace '- \*\*Status\*\*:\s*Implemented', '- **Status**: Ready for Implementation'
    
    # Check if any changes were made
    if ($content -ne $originalContent) {
        $fileUpdates = $implementedCount + $implementedCaseCount
        
        # Save the updated content
        Set-Content -Path $file.FullName -Value $content -NoNewline
        
        $fileType = if ($file.Name -like "*-capability.md") { "Capability" } else { "Enabler" }
        
        $updatedFiles += @{
            File    = $file.Name
            Path    = $file.FullName
            Type    = $fileType
            Updates = $fileUpdates
        }
        
        $totalUpdates += $fileUpdates
        
        Write-Host "Updated $fileType $($file.Name): $fileUpdates status change(s)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total files updated: $($updatedFiles.Count)" -ForegroundColor Green
Write-Host "Total status changes: $totalUpdates" -ForegroundColor Green
Write-Host ""

if ($updatedFiles.Count -gt 0) {
    $capCount = ($updatedFiles | Where-Object { $_.Type -eq "Capability" }).Count
    $enbCount = ($updatedFiles | Where-Object { $_.Type -eq "Enabler" }).Count
    
    Write-Host "Breakdown:" -ForegroundColor Cyan
    Write-Host "  Capabilities: $capCount" -ForegroundColor Yellow
    Write-Host "  Enablers: $enbCount" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "Updated files:" -ForegroundColor Cyan
    foreach ($fileInfo in $updatedFiles | Sort-Object Type, File) {
        Write-Host "  [$($fileInfo.Type)] $($fileInfo.File)" -ForegroundColor $(if ($fileInfo.Type -eq "Capability") { "Magenta" } else { "Yellow" })
    }
}
else {
    Write-Host "No files needed updating." -ForegroundColor Yellow
}
