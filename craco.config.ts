/* craco.config.js */
import * as path from 'path'

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
}