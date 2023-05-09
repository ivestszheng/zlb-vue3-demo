module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended", // prettier 规则应加在最后，确保优先级最高
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "prettier/prettier": 2,
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-restricted-syntax": "off",
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index"],
      },
    ],
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    ZwLog: "readonly",
    ZWJSBridge: "readonly",
  },
};
