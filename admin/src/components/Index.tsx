'use client'
import { useGetMeQuery } from '@/graphql/types'
import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import Link from 'next/link'

type IndexProps = {
  loginUrl: string
}
export const Index = ({ loginUrl }: IndexProps): JSX.Element => {
  const [{ data, fetching }] = useGetMeQuery()

  if (fetching) return <div>Loading...</div>
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
          <ListItemButton component={Link} href={loginUrl}>
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
      </List>
    </>
  )
}
