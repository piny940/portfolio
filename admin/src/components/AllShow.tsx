import { useGetAllQuery } from '@/graphql/types'
import { Button, Typography } from '@mui/material'
import { ContentCopy as CopyIcon } from '@mui/icons-material'
import Error from 'next/error'
import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { Box } from '@mui/system'

export const AllShow = (): JSX.Element => {
  const context = useMemo(
    () => ({
      additionalTypenames: ['Project', 'Blog', 'TechStack', 'Technology'],
    }),
    []
  )
  const [{ data, error }] = useGetAllQuery({ context })
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [data])

  if (error) return <Error statusCode={400} />
  if (!data) return <>loading...</>
  return (
    <Box>
      <Box mt={2}>
        <Button component={Link} href="/all/new" fullWidth variant="contained">
          新規作成
        </Button>
      </Box>
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
    </Box>
  )
}
