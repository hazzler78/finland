# PowerShell script för att testa API:et

Write-Host "Testar POST /api/contacts..." -ForegroundColor Cyan

$body = @{
    name = "Test"
    email = "test@example.com"
    subject = "Test"
    message = "Test message"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "https://sahkopomo.pages.dev/api/contacts" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Yellow
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    if ($_.Exception.Response) {
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            $reader.Close()
            Write-Host "Response body:" -ForegroundColor Yellow
            Write-Host $responseBody
            # Try to parse as JSON
            try {
                $json = $responseBody | ConvertFrom-Json
                Write-Host "Parsed error:" -ForegroundColor Red
                Write-Host "  Error: $($json.error)" -ForegroundColor Red
                if ($json.details) {
                    Write-Host "  Details: $($json.details)" -ForegroundColor Red
                }
            } catch {
                # Not JSON, just show raw
            }
        } catch {
            Write-Host "Could not read response body" -ForegroundColor Yellow
        }
    }
}

Write-Host "`nTestar GET /api/contacts..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "https://sahkopomo.pages.dev/api/contacts" `
        -Method GET
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Yellow
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    if ($_.Exception.Response) {
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            $reader.Close()
            Write-Host "Response body:" -ForegroundColor Yellow
            Write-Host $responseBody
            # Try to parse as JSON
            try {
                $json = $responseBody | ConvertFrom-Json
                Write-Host "Parsed error:" -ForegroundColor Red
                Write-Host "  Error: $($json.error)" -ForegroundColor Red
                if ($json.details) {
                    Write-Host "  Details: $($json.details)" -ForegroundColor Red
                }
            } catch {
                # Not JSON, just show raw
            }
        } catch {
            Write-Host "Could not read response body" -ForegroundColor Yellow
        }
    }
}

Write-Host "`nTestar GET /api/suppliers..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "https://sahkopomo.pages.dev/api/suppliers" `
        -Method GET
    
    Write-Host "✅ Success! Status: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Antal leverantörer: $($data.Count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    if ($_.Exception.Response) {
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            $reader.Close()
            Write-Host "Response body:" -ForegroundColor Yellow
            Write-Host $responseBody
            # Try to parse as JSON
            try {
                $json = $responseBody | ConvertFrom-Json
                Write-Host "Parsed error:" -ForegroundColor Red
                Write-Host "  Error: $($json.error)" -ForegroundColor Red
                if ($json.details) {
                    Write-Host "  Details: $($json.details)" -ForegroundColor Red
                }
            } catch {
                # Not JSON, just show raw
            }
        } catch {
            Write-Host "Could not read response body" -ForegroundColor Yellow
        }
    }
}
