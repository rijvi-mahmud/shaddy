import { useCallback } from 'react'
import { Style } from '@/registry/registry-styles'
import { useLocalStorage } from '@/registry/default/hooks/use-local-storage'

type Config = {
  style: Style['name']
  radius: number
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun'
  installationType: 'cli' | 'manual'
}

const defaultConfig: Config = {
  style: 'default',
  radius: 0.5,
  packageManager: 'pnpm',
  installationType: 'cli',
}

const CONFIG_KEY = 'config'

export function useConfig() {
  const [config, setConfig, removeConfig] = useLocalStorage<Config>(
    CONFIG_KEY,
    defaultConfig,
    {
      onError: (error, key) =>
        console.error(`Error with config localStorage key "${key}":`, error),
    }
  )

  const updateConfig = useCallback(
    (updates: Partial<Config>) => {
      setConfig((prev) => ({ ...prev, ...updates }))
    },
    [setConfig]
  )

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig)
  }, [setConfig])

  return {
    config,
    setConfig,
    updateConfig,
    resetConfig,
    removeConfig,
  }
}
