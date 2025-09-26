import { BlogEdit } from '@/components/BlogEdit'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useGetBlogWithTagsQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { JSX } from 'react'

const BlogEditPage = (): JSX.Element => {
  const router = useRouter()
  const { blogId } = router.query

  const [{ data, error }] = useGetBlogWithTagsQuery({
    variables: { id: parseInt(blogId as string) },
    pause: !router.isReady,
  })
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Blogs', path: '/blogs' },
      { name: 'Edit Blog', path: `/blogs/${data?.blog?.id}/edit` },
    ],
    [data?.blog?.id],
  )

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return (
    <>
      <Breadcrumbs paths={paths} />
      <BlogEdit blog={data.blog} />
    </>
  )
}

export default BlogEditPage
