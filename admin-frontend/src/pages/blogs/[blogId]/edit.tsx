import { EditBlog } from '@/components/EditBlog'
import Error from 'next/error'
import { useRouter } from 'next/router'

const EditBlogPage = (): JSX.Element => {
  const router = useRouter()
  const { blogId } = router.query
  if (typeof blogId !== 'string') return <Error statusCode={404} />
  const idNum = parseInt(blogId)
  console.log('nan')
  if (Number.isNaN(idNum)) return <Error statusCode={404} />
  return <EditBlog id={idNum} />
}

export default EditBlogPage
