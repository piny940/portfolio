import { ProjectShow } from '@/containers/Project'
import { useRouter } from 'next/router'

const Project: React.FC = () => {
  const router = useRouter()
  const title = router.query.title as string
  return <ProjectShow title={title} />
}

export default Project
