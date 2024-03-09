import { Theme } from '@/resources/types'
import { GetServerSidePropsContext } from 'next'

export const getThemeFromCookie = (ctx: GetServerSidePropsContext) => {
  return (ctx.req.cookies.theme ?? 'light') as Theme
}
