import { Skills } from './Skills'
import { Profiles } from './Profile'

export const Index: React.FC = () => {
  return (
    <div id="index">
      <Profiles />
      <Skills className="bg-body-tertiary" />
    </div>
  )
}
