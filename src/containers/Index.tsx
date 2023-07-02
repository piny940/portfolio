import { Skills } from './Skills'
import { Profiles } from './Profile'
import { Works } from './Works'

export const Index: React.FC = () => {
  return (
    <div id="index">
      <Profiles />
      <Skills className="bg-body-tertiary" />
      <Works />
    </div>
  )
}
