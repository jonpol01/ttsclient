import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    eslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 13,
                sourceType: "module",
            },
            globals: {
                File: "readonly",
                FormData: "readonly",
                Blob: "readonly",
                Request: "readonly",
                fetch: "readonly",
                console: "readonly",
                URL: "readonly",
                document: "readonly",
                HTMLInputElement: "readonly",
                FileReader: "readonly",
                indexedDB: "readonly",
                MediaStream: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "no-redeclare": "off",
            "@typescript-eslint/no-redeclare": [
                "error",
                {
                    ignoreDeclarationMerge: true,
                },
            ],
        },
    },
    {
        files: ["**/*.{js,cjs}"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                __dirname: "readonly",
            },
        },
    },
];
