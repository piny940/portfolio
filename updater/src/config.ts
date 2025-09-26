export const initConfig = () => {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env.development' })
  }
}
