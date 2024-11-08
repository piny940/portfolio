'use client'
import { useGetMeQuery } from '@/graphql/types'
import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import Link from 'next/link'

export const Index = (): JSX.Element => {
  const [{ data }] = useGetMeQuery()

  return (
    <>
      <Typography variant="h4" component="h1">
        Home
      </Typography>
      <List>
        {data?.me ? (
          <>
            <ListItemButton component={Link} href="/all">
              <ListItemText primary="All" />
            </ListItemButton>
            <ListItemButton component={Link} href="/blogs">
              <ListItemText primary="Blogs" />
            </ListItemButton>
            <ListItemButton component={Link} href="/projects">
              <ListItemText primary="Projects" />
            </ListItemButton>
            <ListItemButton component={Link} href="/technologies">
              <ListItemText primary="Technologies" />
            </ListItemButton>
            <ListItemButton component={Link} href="/tech_stacks">
              <ListItemText primary="TechStacks" />
            </ListItemButton>
          </>
        ) : (
          <ListItemButton
            component={Link}
            href={`${process.env.NEXT_PUBLIC_AUTH_SERVER_URL}/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/callback&scope=openid`}
          >
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
      </List>
    </>
  )
}
