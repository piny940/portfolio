export const sendSlackMessage = async (message: string) => {
  const response = await fetch(process.env.SLACK_WEBHOOK_URL || '', {
    method: 'POST',
    body: JSON.stringify({ text: message }),
  })
  if (!response.ok) {
    throw new Error('error occurred in sendSlackMessage')
  }
}
