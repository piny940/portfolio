import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { Projects } from '@/models/project'

export type ProjectsIndexProps = {
  className?: string
  projects: Projects
}

export const ProjectsIndex: React.FC<ProjectsIndexProps> = ({
  className = '',
  projects,
}) => {
  return (
    <section
      id="projects"
      className={'d-flex flex-column align-items-center py-5 ' + className}
    >
      <h2 className="h1 text-center title-underline">Projects</h2>
      <p className="mt-4">それぞれQiita記事へのリンクになっています</p>
      <div className="row row-cols-md-2 row-cols-xl-3 w-75 d-flex align-items-stretch">
        {projects.sortedByFavorite().map((project) => (
          <div className="col-md p-3 my-3" key={project.getTitle()}>
            <ProjectItem project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}
