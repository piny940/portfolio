import { useGetAllQuery } from '@/graphql/types'
import { Button, Typography } from '@mui/material'
import { ContentCopy as CopyIcon } from '@mui/icons-material'
import Error from 'next/error'
import { useCallback, useState } from 'react'

export const AllShow = (): JSX.Element => {
  const [{ data, error }] = useGetAllQuery()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [data])

  if (error) return <Error statusCode={400} />
  if (!data) return <>loading...</>
  return (
    <div>
      <pre>
        <Button
          sx={{
            position: 'absolute',
            color: copied ? 'lightGreen' : 'white',
            top: 10,
            right: 10,
          }}
          onClick={copyToClipboard}
        >
          {copied && (
            <Typography sx={{ mr: 1 }} variant="caption">
              Copied!
            </Typography>
          )}
          <CopyIcon />
        </Button>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
