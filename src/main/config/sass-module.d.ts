/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}
