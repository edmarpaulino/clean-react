import { defineConfig } from 'cypress'
import webpackPreprocessor from '@cypress/webpack-preprocessor'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.js']
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
              }
            ]
          }
        }
      }

      on('file:preprocessor', webpackPreprocessor(options))

      return config
    },
    baseUrl: 'http://localhost:8080',
    fixturesFolder: false,
    supportFile: './src/main/test/cypress/support/index.ts',
    specPattern: './src/main/test/cypress/**/*.spec.ts'
  }
})
