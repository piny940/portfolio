import { BlogEdit } from '@/components/BlogEdit'
import { useGetBlogWithTagsQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'

const BlogEditPage = (): JSX.Element => {
  const router = useRouter()
  const { blogId } = router.query

  const [{ data, error }] = useGetBlogWithTagsQuery({
    variables: { id: parseInt(blogId as string) },
    pause: !router.isReady,
  })

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return <BlogEdit blog={data.blog} />
}

export default BlogEditPage
