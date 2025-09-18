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
        // Get the Slack webhook URL and message data from the request
        const { webhookUrl, messageData, imageUrl, imageData } = req.body;

        // Validate required fields
        if (!webhookUrl || !messageData) {
            return res.status(400).json({ 
                error: 'Missing required fields: webhookUrl and messageData' 
            });
        }

        // Validate webhook URL format
        if (!webhookUrl.startsWith('https://hooks.slack.com/services/')) {
            return res.status(400).json({ 
                error: 'Invalid Slack webhook URL format' 
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
            // For base64 image data (Team View)
            slackPayload.attachments = [{
                "image_url": `data:image/png;base64,${imageData}`,
                "fallback": "Performance Report Chart"
            }];
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
