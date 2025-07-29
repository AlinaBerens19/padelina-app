// babel.config.js
module.exports = function(api) {
  api.cache(true); // Включить кеширование для Babel
  return {
    presets: ['babel-preset-expo'], // Базовый пресет Expo
    plugins: [
      // Ваши другие плагины Babel (если есть)
      // Например:
      // ['module-resolver', {
      //   'alias': {
      //     '@components': './src/components',
      //   }
      // }],

      'react-native-reanimated/plugin', // <-- ЭТОТ ПЛАГИН ДОЛЖЕН БЫТЬ ПОСЛЕДНИМ!
    ],
  };
};