import { skill } from '@/resources/enums'

const PROJECT_IMAGE_URL = '/images/projects'
const GITHUB_URL = 'https://github.com'
const PROJECT_DETAIL_URL = '/documents/projects'

export interface ProjectType {
  title: string
  id: string
  description: string
  link: string | null
  github?: string | null
  imageSrc?: string | null
  detailSrc?: string
  qiita?: string
  skills: skill[]
}

const PROJECTS_DATA: ProjectType[] = [
  {
    title: '歌枠データベース',
    id: 'song-list',
    description: 'Vtuberが歌った曲を検索できます',
    link: 'https://song-list.piny940.com',
    skills: [skill.rails, skill.react, skill.next, skill.typescript],
  },
  {
    title: 'スタンプ作成補助',
    id: 'kokosuko-stamp',
    description:
      'Youtubeのコメント欄でタイムスタンプを作成するのを補助する拡張機能',
    link: 'https://chrome.google.com/webstore/detail/kokosuki-stamp/pnbpecefaimbeadmmombelidgkkgfeeg?hl=ja',
    github: 'https://github.com/piny940/kokosuko-stamp',
    detailSrc: '',
    skills: [],
  },
  {
    title: '絵文字召喚bot',
    id: 'emoji-creater',
    description: 'slack上で使える絵文字を自動で生成するslackアプリです',
    github: 'https://github.com/piny940/emoji-creater',
    detailSrc: '',
    skills: [],
    link: null,
  },
  {
    title: 'チャットアプリ',
    id: 'clubroom',
    description:
      'discordのようにグループごとにメンバーやトークルームを作ることができます。',
    github: 'https://github.com/piny940/clubroom',
    detailSrc: '',
    skills: [],
    link: null,
  },
  {
    title: 'ポートフォリオ',
    id: 'portfolio',
    description: 'Piny940のポートフォリオです',
    github: 'https://github.com/piny940/portfolio',
    link: 'https://piny940.com',
    detailSrc: '',
    skills: [],
  },
  {
    title: 'スタンプラリー',
    id: 'mashiro-calender',
    description: 'Vtuber凪乃ましろさん休暇中のスタンプラリー',
    github: 'https://github.com/piny940/mashiro-calender',
    detailSrc: '',
    skills: [],
    link: null,
  },
  {
    title: 'オセロアプリ',
    id: 'python-reverse',
    description: '大学の授業でオセロアプリをチーム開発しました。',
    github: 'https://github.com/piny940/python-reverse',
    detailSrc: '',
    skills: [],
    link: null,
  },
  {
    title: 'メカ少女シューティング',
    id: 'mekashojo',
    description: '大学のサークルでシューティングゲームをチームで開発しました。',
    link: 'https://kmc-jp.booth.pm/items/3438923',
    detailSrc: '',
    skills: [],
    qiita: 'https://qiita.com/piny940/items/d5519acb423ad22c51a8',
  },
]

export class ProjectData {
  #project: ProjectType

  constructor(id: string) {
    const project = PROJECTS_DATA.find((project) => project.id === id)
    if (!project) throw new Error('Project not fond')
    this.#project = project
  }

  getTitle = () => this.#project.title
  getId = () => this.#project.id
  getDescription = () => this.#project.description
  getLink = () => this.#project.link
  getQiita = () => this.#project.qiita
  getDetailSrc = () =>
    this.#project.detailSrc === undefined
      ? `${PROJECT_DETAIL_URL}/${this.#project.id}.md`
      : this.#project.detailSrc

  getSkills = () => this.#project.skills
  getGithub = () => {
    return this.#project.github === undefined
      ? `${GITHUB_URL}/${this.#project.id}`
      : this.#project.github
  }

  getImageSrc = () => {
    return this.#project.imageSrc === undefined
      ? `${PROJECT_IMAGE_URL}/${this.#project.id}.png`
      : this.#project.imageSrc
  }
}

export const projectsData = PROJECTS_DATA.map(
  (project) => new ProjectData(project.id)
)
