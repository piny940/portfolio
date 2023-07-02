import { WorkItem } from '@/components/Portfolio/WorkItem'
import { worksData } from '@/data/works'

export type WorksProps = {
  className?: string
}

export const Works: React.FC<WorksProps> = ({ className = '' }) => {
  return (
    <div className={'d-flex flex-column align-items-center py-5 ' + className}>
      <h1 className="text-center title-underline">Works</h1>
      <div className="row row-cols-md-2 row-cols-xl-3 w-75 mt-4">
        {worksData.map((work) => (
          <div className="col-md p-3 my-3" key={work.title}>
            <WorkItem work={work} />
          </div>
        ))}
      </div>
    </div>
  )
}
