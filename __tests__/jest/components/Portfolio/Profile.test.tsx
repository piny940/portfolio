import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { Profiles, ProfilesProps } from '@/components/Portfolio/Profile'
import { Profile } from '@/content/types'

const profile: Profile = Mock.from<Profile>({
  name: 'mikan',
  handle: 'piny940',
  description: 'テスト用のプロフィールです。',
  links: {
    github: 'https://github.com/piny940',
    qiita: 'https://qiita.com/piny940',
    x: 'https://x.com/piny940',
  },
})

describe('<Profiles />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<ProfilesProps>({ profile })
    const component = render(<Profiles {...props} />)

    expect(component).toBeTruthy()
  })
})
