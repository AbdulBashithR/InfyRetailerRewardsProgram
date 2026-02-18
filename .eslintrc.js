module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
    node: true,
    jest: true,
  },
  extends: ["react-app", "react-app/jest"],
  plugins: ["import"],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-duplicate-imports": "error",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    eqeqeq: ["error", "always"],
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "warn",
    "arrow-body-style": ["warn", "as-needed"],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "@mui/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@/**",
            group: "internal",
          },
          {
            pattern: "src/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    "import/no-unresolved": "off",
  },
};
