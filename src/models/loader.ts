export interface Loader {
  load: <T>() => T
}

export class YamlLoader implements Loader {
  load = <T>() => {}
}
