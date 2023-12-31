import Link from 'next/link'

const Custom404: React.FC = () => {
  return (
    <div className="container">
      <h1>ページが見つかりませんでした。(404)</h1>
      <p>
        <Link href="/">ホームへ戻る</Link>
      </p>
    </div>
  )
}

export default Custom404
