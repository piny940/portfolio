import Image from 'next/image'

export const Index: React.FC = () => {
  return (
    <div id="index" className="container">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column">
          <Image
            src="/images/icon.png"
            alt="icon"
            width={150}
            height={150}
            className="rounded-circle"
          />
          <p className="mt-3">ほげほげほげほげほげ</p>
        </div>
      </div>
    </div>
  )
}
