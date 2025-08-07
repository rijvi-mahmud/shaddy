const localUrl =
  (process.env.NODE_ENV === 'production'
    ? 'https://shaddy-docs.vercel.app'
    : 'http://localhost:3000') + '/r/'
export const localGlobalDependencyGenerator = (registry: string[]) => {
  return registry.map((dep) => {
    if (dep.includes(':local')) {
      // Remove the :local directive and prepend the localUrl
      const cleanDep = dep.replace(':local', '')
      return localUrl + cleanDep
    }
    // Return unchanged if no :local directive
    return dep
  })
}
