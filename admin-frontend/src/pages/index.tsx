import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Typography variant="h4" component="h1">
        Home
      </Typography>
      <List>
        <ListItemButton component={Link} href="/blogs">
          <ListItemText primary="Blogs" />
        </ListItemButton>
        <ListItemButton component={Link} href="/projects">
          <ListItemText primary="Projects" />
        </ListItemButton>
        <ListItemButton component={Link} href="/technologies">
          <ListItemText primary="Technologies" />
        </ListItemButton>
      </List>
    </>
  )
}

export default Home
