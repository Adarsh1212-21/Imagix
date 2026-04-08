export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body

        if (!prompt || prompt.trim() === '') {
            return res.status(400).json({ success: false, message: "Prompt required" })
        }

        const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
        const apiToken = process.env.CLOUDFLARE_API_TOKEN

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            }
        )

        const imageBuffer = await response.arrayBuffer()
        const base64Image = Buffer.from(imageBuffer).toString('base64')
        const imageUrl = `data:image/png;base64,${base64Image}`

        res.json({ success: true, image: imageUrl })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Error generating image" })
    }
}


