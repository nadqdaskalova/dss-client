// babel.config.js

const babelConfig = {
  plugins: ['closure-elimination'],
  presets: [
    ['@babel/preset-env', { loose: true, modules: 'commonjs', targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  ignore: [/node_modules/]
}

if (process.env.NODE_ENV === 'production') babelConfig.presets.push('transform-remove-console')

module.exports = babelConfig
