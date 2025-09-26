export const sendSlackMessage = async (attachments: unknown) => {
  if (!process.env.SLACK_CHANNEL_ID || process.env.SLACK_CHANNEL_ID === '') {
    console.log('SLACK_CHANNEL_ID is not set')
    return
  }
  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SLACK_OAUTH_TOKEN}`,
    },
    body: JSON.stringify({
      attachments,
      token: process.env.SLACK_OAUTH_TOKEN,
      channel: process.env.SLACK_CHANNEL_ID,
    }),
  })
  if (!response.ok) {
    throw new Error(`error occurred in sendSlackMessage: ${response}`)
  }
}
