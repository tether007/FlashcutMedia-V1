# Define paths and settings
$inputFile = ".\public\videos\corousel_vid3.mp4"
$outputFile = ".\public\videos\corousel_vid3-low.mp4"
$ffmpeg = "ffmpeg"  # Ensure FFmpeg is installed and in PATH

# Check if file exists
if (Test-Path $inputFile) {
    # Run FFmpeg to create a mobile-optimized version
    & $ffmpeg -i $inputFile `
        -vf "scale=480:trunc(ow/a/2)*2" `
        -c:v libx264 `
        -preset fast `
        -crf 28 `
        -c:a aac `
        -b:a 96k `
        -movflags +faststart `
        $outputFile
} else {
    Write-Host "File not found: $inputFile"
}
