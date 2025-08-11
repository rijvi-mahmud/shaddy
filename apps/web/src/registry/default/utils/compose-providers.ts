import { createElement, Fragment } from 'react'

type ComponentAndProps<P> = [React.ComponentType<P>, P]
type ProviderConfig<P = any> = React.ComponentType<P> | ComponentAndProps<P>

type ProvidersTuple = readonly ProviderConfig<any>[]

interface ComposeProviders {
  <T extends ProvidersTuple>(
    providers: T,
    displayName?: string
  ): React.FC<React.PropsWithChildren<{}>>
}

export const composeProviders: ComposeProviders = (
  providers: ProvidersTuple,
  displayName?: string
) => {
  // Create a reversed copy of providers to ensure the first provider in the array becomes the outermost wrapper.
  // This avoids mutating the original array and preserves intuitive nesting order.
  const reversedProviders = providers.slice().reverse()
  function Composed(props: React.PropsWithChildren<{}>) {
    return reversedProviders.reduce<React.ReactElement>(
      (children, provider) => {
        if (Array.isArray(provider)) {
          const [Provider, providerProps] = provider
          return createElement(Provider, providerProps, children)
        }
        const Provider = provider
        return createElement(Provider, null, children)
      },
      createElement(Fragment, null, props.children)
    )
  }
  Composed.displayName = displayName
  return Composed
}
