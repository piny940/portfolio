import { useRouter } from 'next/router'

const Project: React.FC = () => {
  const router = useRouter()
  const title = router.query.title
  return <div className="">{title}</div>
}

export default Project
