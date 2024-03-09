import { Theme } from '@/resources/types'
import { IncomingMessage } from 'http'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

interface MyDocumentProps extends DocumentInitialProps {
  initialTheme: Theme
}
function MyDocument({ initialTheme }: MyDocumentProps) {
  return (
    <Html className="bg-body text-body" data-bs-theme={initialTheme} lang="ja">
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<MyDocumentProps> => {
  const initialProps = await Document.getInitialProps(ctx)
  const req = ctx.req as IncomingMessage & {
    cookies: Partial<{
      [key in string]: string
    }>
  }
  const initialTheme = (req?.cookies?.theme ?? 'light') as Theme

  return { ...initialProps, initialTheme }
}

export default MyDocument
