import { ProjectItem } from '@/components/Portfolio/ProjectItem'
// import { projectsData } from '@/data/projects'

export type ProjectsIndexProps = {
  className?: string
}

export const ProjectsIndex: React.FC<ProjectsIndexProps> = ({
  className = '',
}) => {
  return (
    <section
      id="projects"
      className={'d-flex flex-column align-items-center py-5 ' + className}
    >
      <h2 className="h1 text-center title-underline">Projects</h2>
      <p className="mt-4">それぞれQiita記事へのリンクになっています</p>
      <div className="row row-cols-md-2 row-cols-xl-3 w-75">
        {/* {projectsData.map((project) => (
          <div className="col-md p-3 my-3" key={project.getTitle()}>
            <ProjectItem project={project} />
          </div>
        ))} */}
      </div>
    </section>
  )
}
