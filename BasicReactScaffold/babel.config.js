const presets = ['@babel/preset-env', '@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
];

if (process.env.NODE_ENV === "development") {
  plugins.push('react-refresh/babel');
}

module.exports = { presets, plugins };