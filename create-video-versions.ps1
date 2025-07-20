$problematicVideos = @(
    "corousel_vid2.mp4",
    "corousel_vid4.mp4",
    "corousel_vid6.mp4"
)

# Get the absolute path to the videos directory
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$inputPath = Join-Path $projectRoot "public\videos"

Write-Host "Looking for videos in: $inputPath"

foreach ($video in $problematicVideos) {
    $inputFile = Join-Path $inputPath $video
    $outputFile = Join-Path $inputPath ($video -replace '.mp4$', '-optimized.mp4')
    
    if (-not (Test-Path $inputFile)) {
        Write-Host "Error: Could not find video file: $inputFile"
        continue
    }
    
    Write-Host "Processing $video..."
    
    # Re-encode with web-safe settings
    ffmpeg -y -i $inputFile `
        -c:v libx264 `
        -profile:v baseline `
        -level 3.0 `
        -preset medium `
        -crf 23 `
        -movflags +faststart `
        -pix_fmt yuv420p `
        -c:a aac `
        -b:a 128k `
        -ar 44100 `
        $outputFile

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Successfully processed $video"
    } else {
        Write-Host "Error processing $video"
    }
}