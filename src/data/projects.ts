import { skill } from '@/resources/enums'
import { ProjectType } from '@/resources/types'

export const projectsData: ProjectType[] = [
  {
    title: '歌枠データベース',
    id: 'song-list',
    description: 'Vtuberが歌った曲を検索できます',
    link: 'https://song-list.piny940.com',
    github: 'https://github.com/piny940/song-list',
    imageSrc: '/images/projects/song-list.png',
    detailSrc: '/documents/projects/song-list.md',
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
  },
  {
    title: 'チャットアプリ',
    id: 'clubroom',
    description:
      'discordのようにグループごとにメンバーやトークルームを作ることができます。',
    github: 'https://github.com/piny940/clubroom',
    detailSrc: '',
    skills: [],
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
  },
  {
    title: 'オセロアプリ',
    id: 'python-reverse',
    description: '大学の授業でオセロアプリをチーム開発しました。',
    github: 'https://github.com/piny940/python-reverse',
    detailSrc: '',
    skills: [],
  },
  {
    title: 'メカ少女シューティング',
    id: 'mekashojo',
    description: '大学のサークルでシューティングゲームをチームで開発しました。',
    link: 'https://kmc-jp.booth.pm/items/3438923',
    detailSrc: '',
    skills: [],
  },
]
