import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { projectsData } from '@/data/projects'

export type ProjectsIndexProps = {
  className?: string
}

export const ProjectsIndex: React.FC<ProjectsIndexProps> = ({
  className = '',
}) => {
  return (
    <div
      id="projects"
      className={'d-flex flex-column align-items-center py-5 ' + className}
    >
      <h1 className="text-center title-underline">Projects</h1>
      <p className="mt-4">それぞれQiita記事へのリンクになっています</p>
      <div className="row row-cols-md-2 row-cols-xl-3 w-75">
        {projectsData.map((project) => (
          <div className="col-md p-3 my-3" key={project.getTitle()}>
            <ProjectItem project={project} />
          </div>
        ))}
      </div>
    </div>
  )
}
