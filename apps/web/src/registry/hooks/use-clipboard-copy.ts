import { useCallback, useState } from 'react'

type CopiedValue = string | null
type CopyFunc = (text: string) => Promise<boolean>

/**
 * A custom hook that provides a function to copy text to the clipboard.
 * @returns An array containing the copied value and the `copy` function.
 *
 * @example
 * const [copiedText, copy] = useCopyToClipboard();
 * copy("Hello, World!").then(success => {
 *   if (success) {
 *     console.log("Copied successfully!");
 *   } else {
 *     console.log("Copy failed.");
 *   }
 * });
 */
export function useClipboardCopy(): [CopiedValue, CopyFunc] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFunc = useCallback(async (text) => {
    const stringText = typeof text === 'string' ? text : String(text)
    const { clipboard } = navigator

    if (!clipboard) {
      console.warn('Clipboard is not supported in this browser')
      setCopiedText(null)
      return false
    }

    if (!stringText) {
      console.warn('No text provided to copy')
      setCopiedText(null)
      return false
    }

    try {
      await clipboard.writeText(stringText)
      setCopiedText(stringText)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  return [copiedText, copy]
}
