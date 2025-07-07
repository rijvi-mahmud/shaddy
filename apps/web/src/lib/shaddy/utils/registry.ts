'use server'
import fs from 'node:fs/promises'
import path from 'node:path'

export async function readComponentCode(
  filePath: string,
  type?: string
): Promise<string> {
  const fullPath = path.join(process.cwd(), 'src', filePath)
  const code = await fs.readFile(fullPath, 'utf-8')

  console.log({ fullPath, code })

  if (type === 'hook') {
    return replaceImportPathForHook(code)
  }
  return replaceImportPathForHook(code)
}

function replaceImportPathForHook(code: string): string {
  return code.replace(/@\/registry\/hooks/g, '@/hooks')
}
