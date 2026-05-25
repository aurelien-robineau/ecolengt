const GENERATED_TS = new Set(['src/payload-types.ts', 'src/payload-generated-schema.ts'])

/** @type {import('lint-staged').Configuration} */
export default {
  '*.{js,jsx,ts,tsx,mjs,cjs}': (files) => {
    const sourceFiles = files.filter((file) => !GENERATED_TS.has(file.replace(/\\/g, '/')))
    if (sourceFiles.length === 0) return []
    return [`prettier --write ${sourceFiles.join(' ')}`, `eslint --fix ${sourceFiles.join(' ')}`]
  },
  '*.{json,css,scss,md,yml,yaml}': 'prettier --write',
}
