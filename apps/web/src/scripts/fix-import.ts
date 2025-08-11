export function fixImport(content: string) {
  const regex =
    /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib|utils))\/([\w-]+)/g

  const replacement = (
    match: string,
    path: string,
    type: string,
    component: string
  ) => {
    if (type.endsWith('components')) {
      return `@/components/${component}`
    } else if (type.endsWith('ui')) {
      return `@/components/ui/${component}`
    } else if (type.endsWith('hooks')) {
      return `@/hooks/${component}`
    } else if (type.endsWith('lib')) {
      return `@/lib/${component}`
    } else if (type.endsWith('utils')) {
      return `@/utils/${component}`
    }

    return match
  }

  return content.replace(regex, replacement)
}
