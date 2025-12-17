import tsconfigPaths from 'vite-tsconfig-paths'
import { defineProject, mergeConfig } from 'vitest/config'

import { baseConfig } from './base-config.js'

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    plugins: [tsconfigPaths()],
    test: {
      environment: 'jsdom',
    },
  })
)
