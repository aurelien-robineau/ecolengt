const GENERATED_TS = new Set(['src/payload-types.ts', 'src/payload-generated-schema.ts'])

/** @type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  '*.{js,jsx,ts,tsx,mjs,cjs}': (files) => {
    const sourceFiles = files.filter((file) => !GENERATED_TS.has(file.replace(/\\/g, '/')))
    if (sourceFiles.length === 0) return []
    return [
      `prettier --write ${sourceFiles.map((file) => `"${file}"`).join(' ')}`,
      `eslint --fix --max-warnings=-1 ${sourceFiles.map((file) => `"${file}"`).join(' ')}`,
    ]
  },
  '*.{json,css,scss,md,yml,yaml}': (files) =>
    `prettier --write ${files.map((file) => `"${file}"`).join(' ')}`,
}

export default lintStagedConfig
