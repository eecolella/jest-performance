const presetOptions = {
  targets: {
    node: 'current',
  },
}

module.exports = {
  presets: [
    ['@babel/preset-env', presetOptions],
    ['@babel/preset-typescript', presetOptions],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-optional-chaining',
  ],
}
