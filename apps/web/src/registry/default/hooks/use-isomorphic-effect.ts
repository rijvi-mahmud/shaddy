import { useEffect, useLayoutEffect } from 'react'

/**
 * A hook that uses `useLayoutEffect` on the client and `useEffect` on the server.
 * This ensures that the effect runs correctly in both environments.
 *
 * React calls all hooks during SSR, including `useLayoutEffect`. However, `useLayoutEffect` does not run its effect on the server and will show a warning because it is meant to run after DOM layout, which is not available on the server.
 *
 * To avoid this warning, `useIsomorphicEffect` uses `useEffect` during SSR and `useLayoutEffect` on the client.
 *
 * @param {React.EffectCallback} effect - The effect callback function to run.
 * @param {React.DependencyList} [deps] - An optional array of dependencies for the effect.
 *
 * @example
 * // Example usage in a component
 * useIsomorphicEffect(() => {
 *   console.log('This runs on both client and server');
 * }, []);
 *
 * @example
 * // Example demonstrating SSR behavior
 * useLayoutEffect(() => {
 *   console.log("running layout effect");
 * }, []);
 *
 * // When rendered in an SSR framework like Next.js:
 * // 1. The server calls the component and notices `useLayoutEffect`.
 * // 2. React does not run the effect but shows a warning in the terminal:
 * //    "Warning: useLayoutEffect does nothing on the server because it cannot access the DOM."
 * // 3. To avoid this warning, use `useIsomorphicEffect` instead.
 */

export const useIsomorphicEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList
) => {
  const isClient = typeof window !== 'undefined'
  const effectHook = isClient ? useLayoutEffect : useEffect

  return effectHook(effect, deps)
}
