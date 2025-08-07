import { useCallback, useEffect, useRef } from 'react'

/**
 * A custom hook to add an event listener to a specified element.
 *
 * @param {string} eventName - The name of the event to listen for.
 * @param {EventListener} handler - The event handler function.
 * @param {Window | Document | HTMLElement | SVGElement | null} [element] - The target element to attach the event listener to. Defaults to `window` if not provided.
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
 *
 * @example
 * // Example 4: Use event delegation to handle clicks on multiple child elements
 * useEventListener(
 *   "click",
 *   (event, target) => console.log(`Clicked on ${target.id}`),
 *   document.getElementById("parent-container"),
 *   { selector: ".clickable-item" }
 * );
 */

/**
 * Union type representing DOM elements that can have event listeners
 * Includes Window, Document, HTMLElement, and SVGElement
 */
type ElementType = Window | Document | HTMLElement | SVGElement

/**
 * Generic type that maps an element type to its corresponding event map's keys
 * This determines which event names are valid for a given element type
 *
 * @template T - The type of element (Window, Document, HTMLElement, or SVGElement)
 * @returns A type representing all valid event names for the given element
 */
type EventNameType<T extends ElementType> = T extends Window
  ? keyof WindowEventMap | string
  : T extends HTMLElement
    ? keyof HTMLElementEventMap | string
    : T extends SVGElement
      ? keyof SVGElementEventMap | string
      : keyof DocumentEventMap | string

/**
 * Helper type that extracts the event type from an event map if the key exists,
 * otherwise falls back to the generic Event type
 *
 * @template EventMap - The event map to look up the key in
 * @template K - The key to look up in the event map
 */
type EventTypeFromMap<EventMap, K extends string> = K extends keyof EventMap
  ? EventMap[K]
  : Event

/**
 * Generic type that resolves to the appropriate event type based on the element and event name
 *
 * @template T - The type of element (Window, Document, HTMLElement, or SVGElement)
 * @template K - The string literal type representing the event name
 * @returns The corresponding event type from the element's event map, or Event as fallback
 */
type EventType<T extends ElementType, K extends string> = T extends Window
  ? EventTypeFromMap<WindowEventMap, K>
  : T extends HTMLElement
    ? EventTypeFromMap<HTMLElementEventMap, K>
    : T extends SVGElement
      ? EventTypeFromMap<SVGElementEventMap, K>
      : EventTypeFromMap<DocumentEventMap, K>

/**
 * Options for the useEventListener hook
 */
type UseEventListenerOptions = AddEventListenerOptions & {
  /**
   * CSS selector string for event delegation
   * When provided, the handler will only be called when the event target matches this selector
   */
  selector?: string
}

/**
 * A type-safe event listener hook that works with different DOM elements
 * and supports event delegation through a selector option
 *
 * @template T - The type of element (Window, Document, HTMLElement, or SVGElement)
 * @template K - The event name, constrained to valid events for the element type T
 *
 * @param eventName - The name of the event to listen for
 * @param handler - The callback function that handles the event with proper typing
 * @param element - The target element to attach the listener to (defaults to window)
 * @param options - Optional addEventListener options or useCapture boolean
 */

export const useEventListener = <
  T extends ElementType,
  K extends EventNameType<T>,
>(
  eventName: K,
  handler: (event: EventType<T, K & string>, delegateTarget?: Element) => void,
  element?: T | null,
  options?: UseEventListenerOptions | boolean
) => {
  const savedHandler = useRef<typeof handler>(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  const eventListener = useCallback(
    (event: Event) => {
      /** Handle normal events without delegation */
      if (typeof options !== 'object' || !options.selector) {
        savedHandler.current(event as EventType<T, K & string>)
        return
      }

      /** Handle event delegation */
      const target = event.target as Element
      if (target && target.closest) {
        const delegateTarget = target.closest(options.selector)
        if (delegateTarget) {
          savedHandler.current(
            event as EventType<T, K & string>,
            delegateTarget
          )
        }
      }
    },
    [options]
  )

  useEffect(() => {
    const targetElement = element ?? window
    if (!targetElement || !('addEventListener' in targetElement)) {
      console.warn(
        `Cannot attach ${eventName} listener: Invalid target element`
      )
      return
    }

    /** Extract standard addEventListener options by removing our custom properties */
    let eventOptions = options
    if (typeof options === 'object') {
      /** Create a new object without the selector property */
      const { selector, ...standardOptions } = options
      eventOptions = standardOptions
    }

    targetElement.addEventListener(eventName, eventListener, eventOptions)

    return () => {
      targetElement.removeEventListener(eventName, eventListener, eventOptions)
    }
  }, [eventName, element, eventListener, options])
}
