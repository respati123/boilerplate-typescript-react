const { DefinePlugin } = require("webpack")
const { merge } = require("webpack-merge")
const webpackCommon = require("./webpack.common")
const path = require("path")
const { config } = require("dotenv")
const { existsSync } = require("fs")



module.exports = (_, { env }) => {
  const currentPath = path.join(__dirname, "..")

  const basePath = currentPath + '/.env/.env'

  const envPath = basePath + '.' + env.ENVIRONTMENT

  const finalPath = existsSync(envPath) ? envPath : basePath


  const fileEnv = config({ path: finalPath }).parsed


  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev['proccess.env.${next}'] = JSON.stringify(fileEnv[next])
    return prev
  }, {})


  let configEnv = {}
  if(env.ENVIRONTMENT) {
    configEnv = require(`./webpack.${env.ENVIRONTMENT}.js`)
  }

  return merge(webpackCommon, {
    ...configEnv,
    plugins: [
      new DefinePlugin(envKeys)
    ]
  })
}