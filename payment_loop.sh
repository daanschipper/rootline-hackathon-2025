#!/bin/bash

# Calculate delay between requests (60 seconds / 100 requests = 0.6 seconds)
DELAY=0.6

# Counter for tracking requests
count=0

echo "Starting payment requests at 100 per minute..."

while true; do
    # Increment counter
    ((count++))
    
    # Generate unique reference for each request
    TIMESTAMP=$(date +%s%3N)
    REFERENCE="order-${TIMESTAMP}"
    
    # Execute curl request in background to avoid blocking
    curl -X POST https://payment-api.staging.rootline.com/v1/payments \
        -H "Content-Type: application/json" \
        -H "x-api-key: sk_rootline_staging_ABmUeOwdSJjmu0Mm9MlGuSvBPU7GJnFloO6fRKtOM2FRTIf0xunzPEaiFEhHNi6FCiZgbX8SKAoVtLNSZrTgcqyGW9fS6B3uc" \
        -H "rootline-version: 2024-04-23" \
        -d "{
            \"account_id\": \"acc_2b8tGla2q1AUr70B3mMAxU\",
            \"reference\": \"${REFERENCE}\",
            \"amount\": {
                \"currency\": \"EUR\",
                \"quantity\": \"2500.00\"
            },
            \"return_url\": \"https://www.zenythluxury.life\",
            \"splits\": [{
                \"account_id\": \"acc_4DdxkSfkEGUbYKmUlsxWgd\",
                \"amount\": {
                    \"currency\": \"EUR\",
                    \"quantity\": \"2500.00\"
                },
                \"reference\": \"${REFERENCE}\"
            }]
        }" &
    
    # Print progress every 10 requests
    if [ $((count % 10)) -eq 0 ]; then
        echo "Processed $count requests..."
    fi
    
    # Sleep for the calculated delay
    sleep $DELAY
done
