import { ProjectShow } from '@/containers/Project'
import { useRouter } from 'next/router'

const Project: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string
  return <ProjectShow id={id} />
}

export default Project
