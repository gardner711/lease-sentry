# Script to update all IMPLEMENTED requirements to Ready for Implementation
$specificationsPath = "c:\Dev\lease-sentry\specifications"

# Get all enabler files
$enablerFiles = Get-ChildItem -Path $specificationsPath -Recurse -Filter "*-enabler.md"

$updatedFiles = @()
$totalUpdates = 0

foreach ($file in $enablerFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $fileUpdates = 0
    
    # Pattern 1: | FR-XXXXX | ... | Implemented | ... |
    # Pattern 2: | NFR-XXXXX | ... | Implemented | ... |
    # Pattern 3: | FR-XXXXX | ... | IMPLEMENTED | ... |
    # Pattern 4: | NFR-XXXXX | ... | IMPLEMENTED | ... |
    
    # Replace "| Implemented |" with "| Ready for Implementation |"
    $content = $content -replace '\| Implemented \|', '| Ready for Implementation |'
    
    # Replace "| IMPLEMENTED |" with "| Ready for Implementation |"
    $content = $content -replace '\| IMPLEMENTED \|', '| Ready for Implementation |'
    
    # Check if any changes were made
    if ($content -ne $originalContent) {
        # Count the number of replacements
        $matches1 = ([regex]::Matches($originalContent, '\| Implemented \|')).Count
        $matches2 = ([regex]::Matches($originalContent, '\| IMPLEMENTED \|')).Count
        $fileUpdates = $matches1 + $matches2
        
        # Save the updated content
        Set-Content -Path $file.FullName -Value $content -NoNewline
        
        $updatedFiles += @{
            File    = $file.Name
            Path    = $file.FullName
            Updates = $fileUpdates
        }
        
        $totalUpdates += $fileUpdates
        
        Write-Host "Updated $($file.Name): $fileUpdates requirements changed" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total files updated: $($updatedFiles.Count)" -ForegroundColor Green
Write-Host "Total requirements updated: $totalUpdates" -ForegroundColor Green
Write-Host ""

if ($updatedFiles.Count -gt 0) {
    Write-Host "Updated files:" -ForegroundColor Cyan
    foreach ($fileInfo in $updatedFiles) {
        Write-Host "  - $($fileInfo.File) ($($fileInfo.Updates) requirements)" -ForegroundColor Yellow
    }
}
else {
    Write-Host "No files needed updating." -ForegroundColor Yellow
}
