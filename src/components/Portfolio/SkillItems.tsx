import { SkillItem } from '@/components/Portfolio/SkillItem'
import { Technology } from '@/content/types'

export type SkillsItemsProps = {
  technologies: Technology[]
  row?: number
  collapseCount?: number
}

export const SkillItems: React.FC<SkillsItemsProps> = ({
  technologies,
  row = 3,
  collapseCount = 0,
}) => {
  return (
    <ul
      className={`list-unstyled row row-cols-1 row-cols-sm-2 row-cols-md-${row} gy-5`}
    >
      {technologies.map((technology, idx) => (
        <li
          className={'col ' + (idx < technologies.length - collapseCount ? '' : 'd-none d-md-block')}
          key={technology.slug}
        >
          <SkillItem technology={technology} />
        </li>
      ))}
    </ul>
  )
}
