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
            // For base64 image data, try uploading to temporary image host
            try {
                console.log('📤 Uploading base64 image to temporary host...');
                
                // Try imgbb.com first (better mobile support)
                let uploadResponse = await fetch('https://api.imgbb.com/1/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `key=f9d2c9fb6d9a5e8a26b23c4b8a5e4d1f&image=${encodeURIComponent(imageData)}`
                });
                
                if (uploadResponse.ok) {
                    const uploadResult = await uploadResponse.json();
                    if (uploadResult.success && uploadResult.data && uploadResult.data.url) {
                        console.log('✅ Image uploaded to imgbb successfully:', uploadResult.data.url);
                        
                        // Use multiple attachment formats for better mobile compatibility
                        slackPayload.attachments = [{
                            "image_url": uploadResult.data.url,
                            "fallback": "Performance Report Chart",
                            "title": "📊 Performance Report Chart",
                            "title_link": uploadResult.data.url,
                            "color": "#36a64f"
                        }];
                        
                        // Also add the image URL as a fallback in the text
                        slackPayload.text += `\n\n📊 Chart: ${uploadResult.data.url}`;
                    } else {
                        console.log('⚠️ imgbb upload failed, trying fallback...');
                        
                        // Fallback to freeimage.host
                        uploadResponse = await fetch('https://freeimage.host/api/1/upload', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `key=6d207e02198a847aa98d0a2a901485a5&source=${encodeURIComponent(imageData)}&format=json`
                        });
                        
                        if (uploadResponse.ok) {
                            const fallbackResult = await uploadResponse.json();
                            if (fallbackResult.status_code === 200 && fallbackResult.image && fallbackResult.image.url) {
                                console.log('✅ Image uploaded to freeimage.host successfully:', fallbackResult.image.url);
                                
                                slackPayload.attachments = [{
                                    "image_url": fallbackResult.image.url,
                                    "fallback": "Performance Report Chart",
                                    "title": "📊 Performance Report Chart",
                                    "title_link": fallbackResult.image.url,
                                    "color": "#36a64f"
                                }];
                                
                                slackPayload.text += `\n\n📊 Chart: ${fallbackResult.image.url}`;
                            } else {
                                console.log('⚠️ All image upload services failed, sending text-only');
                            }
                        } else {
                            console.log('⚠️ All image upload services failed, sending text-only');
                        }
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
