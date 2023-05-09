module.exports = {
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        targets: {
          chrome: 59,
          edge: 13,
          firefox: 50,
        },
      },
    ],
  ],
};
