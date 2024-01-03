import Link from 'next/link'

const Custom500: React.FC = () => {
  return (
    <div className="container">
      <h1>サーバーでエラーが発生しました。</h1>
      <p>
        <Link href="/">ホームに戻る</Link>
      </p>
    </div>
  )
}

export default Custom500
