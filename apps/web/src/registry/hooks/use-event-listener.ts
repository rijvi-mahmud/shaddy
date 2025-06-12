import { useCallback, useEffect, useRef } from 'react'

/**
 * A custom hook to add an event listener to a specified element.
 *
 * @param {string} eventName - The name of the event to listen for.
 * @param {EventListener} handler - The event handler function.
 * @param {Window | Document | HTMLElement | null} [element] - The target element to attach the event listener to. Defaults to `window` if not provided.
 *
 * @example
 * // Example 1: Add a click event listener to a specific element
 * useEventListener("click", (event) => console.log(event), document.getElementById("myElement"));
 *
 * @example
 * // Example 2: Add a resize event listener to the window
 * useEventListener("resize", () => console.log("Window resized"));
 *
 * @example
 * // Example 3: Add a keydown event listener to the document
 * useEventListener("keydown", (event) => console.log(`Key pressed: ${event.key}`), document);
 */

export const useEventListener = (
  eventName: string,
  handler: EventListener,
  element?: Window | Document | HTMLElement | null
) => {
  const savedHandler = useRef<EventListener | null>(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  const eventListener = useCallback((event: Event) => {
    savedHandler.current?.(event)
  }, [])

  useEffect(() => {
    const targetElement = element ?? window
    if (!targetElement) return
    targetElement.addEventListener(eventName, eventListener)

    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, eventListener])
}
