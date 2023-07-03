import { Skills } from './Skills'
import { Profiles } from './Profile'
import { Works } from './Projects'

export const Index: React.FC = () => {
  return (
    <div id="index">
      <Profiles className="bg-body" />
      <Skills className="bg-body-tertiary" />
      <Works className="bg-body" />
    </div>
  )
}
