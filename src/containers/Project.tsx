export type ProjectShowProps = {
  title: string
}

export const ProjectShow: React.FC<ProjectShowProps> = ({ title }) => {
  return (
    <div className="wrapper mx-auto mt-3">
      <h1 className="title-underline">{title}</h1>
    </div>
  )
}
