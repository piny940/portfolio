import { EditBlog } from '@/components/EditBlog'
import { useGetBlogQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'

const EditBlogPage = (): JSX.Element => {
  const router = useRouter()
  const { blogId } = router.query

  const [{ data, error }] = useGetBlogQuery({
    variables: { id: parseInt(blogId as string) },
    pause: !router.isReady,
  })

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return <EditBlog blog={data.blog} />
}

export default EditBlogPage
