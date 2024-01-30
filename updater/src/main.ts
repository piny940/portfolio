import { updateBlogs } from './blog'
import { initConfig } from './config'

initConfig()

const main = async () => {
  updateBlogs()
}

main()
