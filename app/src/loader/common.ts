import { readFileSync } from 'fs'
import { IFileLoader, IYamlLoader } from './_common'
import { load } from 'js-yaml'
import { Client, cacheExchange, fetchExchange } from 'urql'

export class FileLoader implements IFileLoader {
  load = (filename: string) => {
    try {
      return readFileSync(filename, 'utf8')
    } catch {
      return ''
    }
  }
}

export class YamlLoader implements IYamlLoader {
  #fileLoader: FileLoader

  constructor() {
    this.#fileLoader = new FileLoader()
  }

  load = <T = any>(filename: string): T => {
    const content = this.#fileLoader.load(filename)
    return load(content) as T
  }
}

export const gqlClient = new Client({
  url: 'http://localhost:8080/v1/query',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = process.env.BACKEND_TOKEN || ''
    return {
      headers: { authorization: `Bearer ${token}` },
    }
  },
})
