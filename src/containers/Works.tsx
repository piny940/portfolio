import { WorkItem } from '@/components/Portfolio/WorkItem'
import { worksData } from '@/data/works'

export type WorksProps = {
  className?: string
}

export const Works: React.FC<WorksProps> = ({ className = '' }) => {
  return (
    <div className={'d-flex flex-column align-items-center p-5 ' + className}>
      <h1 className="text-center title-underline">Works</h1>
      <div className="row row-cols-lg-2 w-75 mt-4">
        {worksData.map((work) => (
          <div className="col p-3 my-3" key={work.title}>
            <WorkItem work={work} />
          </div>
        ))}
      </div>
    </div>
  )
}
