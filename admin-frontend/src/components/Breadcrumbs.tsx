import Link from 'next/link'
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'

export type BreadcrumbProps = {
  paths: Array<{
    name: string
    path: string
  }>
}

export const Breadcrumbs = ({ paths }: BreadcrumbProps): JSX.Element => {
  const router = useRouter()

  console.log(router)
  return (
    <MuiBreadcrumbs sx={{ m: 1 }} aria-label="breadcrumb">
      {paths.slice(0, paths.length - 1).map((path) => (
        <MuiLink
          key={path.path}
          underline="hover"
          component={Link}
          color="inherit"
          href={path.path}
        >
          {path.name}
        </MuiLink>
      ))}
      <Typography color="text.primary">
        {paths[paths.length - 1].name}
      </Typography>
    </MuiBreadcrumbs>
  )
}
