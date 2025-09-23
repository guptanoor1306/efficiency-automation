// Vercel serverless function to proxy Slack webhook requests
// This bypasses CORS issues when sending Slack messages from the browser

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed. This endpoint only accepts POST requests.' 
        });
    }

    try {
        // Get the Slack webhook URL from environment variables (more secure)
        const webhookUrl = process.env.SLACK_WEBHOOK_URL;
        
        // Get message data from the request
        const { messageData, imageUrl, imageData } = req.body;

        // Validate required fields
        if (!webhookUrl) {
            return res.status(500).json({ 
                error: 'Server configuration error: SLACK_WEBHOOK_URL not configured' 
            });
        }
        
        if (!messageData) {
            return res.status(400).json({ 
                error: 'Missing required field: messageData' 
            });
        }

        // Validate webhook URL format
        if (!webhookUrl.startsWith('https://hooks.slack.com/services/')) {
            return res.status(500).json({ 
                error: 'Invalid Slack webhook URL configuration' 
            });
        }

        console.log('📤 Forwarding request to Slack webhook...');
        
        // Prepare Slack payload with image support
        let slackPayload = { ...messageData };
        
        // Add image attachment if provided
        if (imageUrl) {
            // For image URLs (like Imgur links)
            slackPayload.attachments = [{
                "image_url": imageUrl,
                "fallback": "Performance Report Chart"
            }];
        } else if (imageData) {
            // For base64 image data, try uploading to freeimage.host
            try {
                console.log('📤 Uploading base64 image to temporary host...');
                
                const uploadResponse = await fetch('https://freeimage.host/api/1/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `key=6d207e02198a847aa98d0a2a901485a5&source=${encodeURIComponent(imageData)}&format=json`
                });
                
                if (uploadResponse.ok) {
                    const uploadResult = await uploadResponse.json();
                    if (uploadResult.status_code === 200 && uploadResult.image && uploadResult.image.url) {
                        console.log('✅ Image uploaded successfully:', uploadResult.image.url);
                        slackPayload.attachments = [{
                            "image_url": uploadResult.image.url,
                            "fallback": "Performance Report Chart"
                        }];
                    } else {
                        console.log('⚠️ Image upload failed, sending text-only');
                    }
                } else {
                    console.log('⚠️ Image upload service unavailable, sending text-only');
                }
            } catch (uploadError) {
                console.error('❌ Error uploading image:', uploadError);
                console.log('⚠️ Falling back to text-only report');
            }
        }

        // Forward the request to Slack
        const slackResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slackPayload)
        });

        // Check if Slack request was successful
        if (slackResponse.ok) {
            console.log('✅ Message sent to Slack successfully');
            return res.status(200).json({ 
                success: true, 
                message: 'Message sent to Slack successfully' 
            });
        } else {
            console.error('❌ Slack API error:', slackResponse.status, slackResponse.statusText);
            const errorText = await slackResponse.text();
            return res.status(slackResponse.status).json({ 
                error: 'Slack API error', 
                details: errorText || slackResponse.statusText 
            });
        }

    } catch (error) {
        console.error('❌ Server error:', error);
        return res.status(500).json({ 
            error: 'Internal server error', 
            details: error.message 
        });
    }
}
