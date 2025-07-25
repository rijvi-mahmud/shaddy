const fs = require('fs').promises
const path = require('path')
async function buildRegistry() {
  const registry = JSON.parse(
    await fs.readFile(path.join(__dirname, '../registry/registry.json'), 'utf8')
  )
  const output = {}

  for (const item of registry) {
    const files = await Promise.all(
      item.files.map(async (file) => {
        let content = await fs.readFile(
          path.join(__dirname, `../${file.path}`),
          'utf8'
        )
        // If the item is a hook, replace import paths
        if (item.type && item.type.startsWith('hooks')) {
          content = replaceImportPathForHook(content)
        }
        return { path: file.path, content }
      })
    )
    output[item.name] = {
      component: `() => import('../${item.files[0].path.replace('.tsx', '')}').then(mod => mod.${item.files[0].path.split('/').pop().replace('.tsx', '')})`,
      source: files[0].content,
      dependencies: item.dependencies,
    }
  }

  const registryString = JSON.stringify(output, null, 2)
  // Remove quotes around the component function string
  const finalRegistryString = registryString.replace(
    /"component": "(.*?)"/gs,
    (_, fn) => `"component": ${fn.replace(/\\"/g, '"')}`
  )

  await fs.writeFile(
    path.join(__dirname, '../registry/index.tsx'),
    `export const registry = ${finalRegistryString};`
  )
  console.log('Registry built successfully!')
}

buildRegistry().catch(console.error)

function replaceImportPathForHook(code) {
  return code.replace(/@\/registry\/hooks/g, '@/hooks')
}
