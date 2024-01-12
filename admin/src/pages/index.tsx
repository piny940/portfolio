import { useGetMeQuery } from '@/graphql/types'
import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  const [{ data, error }] = useGetMeQuery()

  if (error) return <div>{error.message}</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <Typography variant="h4" component="h1">
        Home
      </Typography>
      <List>
        {data.me ? (
          <>
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
          <ListItemButton component={Link} href="/login">
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
      </List>
    </>
  )
}

export default Home
