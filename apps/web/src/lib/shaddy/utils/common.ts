export function replaceImportPathForHook(code: string): string {
  return code.replace(/@\/registry\/hooks/g, '@/hooks')
}
