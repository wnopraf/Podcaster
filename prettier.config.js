/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react(.*)$)|^(react-(.*)$)",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$",
    "^@/views/(.*)$",
    "^types$",
    "",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/helpers/(.*)$",
    "^@/hooks/(.*)$",
    "^@/styles/(.*)$",
    "",
    "^[./]",
    ".css$",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
