# Script to update all IMPLEMENTED requirements and enabler statuses to Ready for Implementation
# This version handles both regular and bold-formatted IMPLEMENTED
$specificationsPath = "c:\Dev\lease-sentry\specifications"

# Get all enabler files
$enablerFiles = Get-ChildItem -Path $specificationsPath -Recurse -Filter "*-enabler.md"

$updatedFiles = @()
$totalUpdates = 0

foreach ($file in $enablerFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $fileUpdates = 0
    
    # Count occurrences before replacement
    $statusMatches = ([regex]::Matches($originalContent, '- \*\*Status\*\*:\s*\*\*IMPLEMENTED\*\*')).Count
    $reqMatches1 = ([regex]::Matches($originalContent, '\| Implemented \|')).Count
    $reqMatches2 = ([regex]::Matches($originalContent, '\| IMPLEMENTED \|')).Count
    $reqMatches3 = ([regex]::Matches($originalContent, '\| \*\*IMPLEMENTED\*\* \|')).Count
    
    # Replace enabler status: - **Status**: **IMPLEMENTED**
    $content = $content -replace '- \*\*Status\*\*:\s*\*\*IMPLEMENTED\*\*', '- **Status**: Ready for Implementation'
    
    # Replace requirements: | Implemented |
    $content = $content -replace '\| Implemented \|', '| Ready for Implementation |'
    
    # Replace requirements: | IMPLEMENTED |
    $content = $content -replace '\| IMPLEMENTED \|', '| Ready for Implementation |'
    
    # Replace requirements: | **IMPLEMENTED** |
    $content = $content -replace '\| \*\*IMPLEMENTED\*\* \|', '| Ready for Implementation |'
    
    # Check if any changes were made
    if ($content -ne $originalContent) {
        $fileUpdates = $statusMatches + $reqMatches1 + $reqMatches2 + $reqMatches3
        
        # Save the updated content
        Set-Content -Path $file.FullName -Value $content -NoNewline
        
        $updatedFiles += @{
            File               = $file.Name
            Path               = $file.FullName
            Updates            = $fileUpdates
            StatusUpdates      = $statusMatches
            RequirementUpdates = $reqMatches1 + $reqMatches2 + $reqMatches3
        }
        
        $totalUpdates += $fileUpdates
        
        Write-Host "Updated $($file.Name):" -ForegroundColor Green
        if ($statusMatches -gt 0) {
            Write-Host "  - Enabler status: $statusMatches" -ForegroundColor Yellow
        }
        if (($reqMatches1 + $reqMatches2 + $reqMatches3) -gt 0) {
            Write-Host "  - Requirements: $($reqMatches1 + $reqMatches2 + $reqMatches3)" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total files updated: $($updatedFiles.Count)" -ForegroundColor Green
Write-Host "Total updates: $totalUpdates" -ForegroundColor Green
Write-Host ""

if ($updatedFiles.Count -gt 0) {
    Write-Host "Updated files:" -ForegroundColor Cyan
    foreach ($fileInfo in $updatedFiles) {
        Write-Host "  - $($fileInfo.File)" -ForegroundColor Yellow
        Write-Host "    Status: $($fileInfo.StatusUpdates), Requirements: $($fileInfo.RequirementUpdates)" -ForegroundColor Gray
    }
}
else {
    Write-Host "No files needed updating." -ForegroundColor Yellow
}
