module.exports = {
  root: true,
  defaultSeverity: "error",
  plugins: ["stylelint-order", "stylelint-scss"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html/html",
    "stylelint-config-html/vue",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  rules: {
    "no-descending-specificity": null,
    "no-empty-source": null,
    "font-family-no-missing-generic-family-keyword": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "function",
          "if",
          "each",
          "include",
          "mixin",
        ],
      },
    ],
    "function-no-unknown": null,
    "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
    "selector-no-vendor-prefix": null,
    "keyframes-name-pattern": null,
    "selector-class-pattern": null,
    "value-no-vendor-prefix": null,
    "rule-empty-line-before": [
      "always",
      { ignore: ["after-comment", "first-nested"] },
    ],
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
  overrides: [
    {
      files: ["*.vue", "**/*.vue", "*.html", "**/*.html"],
      customSyntax: "postcss-html",
      rules: {
        // 禁止未知的伪类选择器
        "selector-pseudo-class-no-unknown": [
          true,
          { ignorePseudoClasses: ["deep", "global"] },
        ],
        // 禁止未知的伪元素选择器
        "selector-pseudo-element-no-unknown": [
          true,
          { ignorePseudoElements: ["v-deep", "v-global", "v-slotted"] },
        ],
      },
    },
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
};
