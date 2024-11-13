import { Index } from '@/components/Index'

export default function Page() {
  return (
    <Index
      loginUrl={`${process.env.AUTH_SERVER_URL}/oauth/authorize?client_id=${
        process.env.CLIENT_ID
      }&response_type=code&redirect_uri=${
        process.env.APP_URL
      }/callback&scope=openid&max_age=${process.env.TOKEN_TTL}`}
    />
  )
}
