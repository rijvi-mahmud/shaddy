import { useCallback, useState } from 'react'

type CopiedValue = string | null
type CopyFunc = (text: string) => Promise<boolean>
type CopyStatus = 'idle' | 'success' | 'error'
type UseClipboardCopyReturn = [CopiedValue, CopyFunc, CopyStatus]

/**
 * Custom hook to copy text to clipboard.
 *
 * @returns An array containing the copied text, a function to copy text, and the current copy status.
 */

export function useClipboardCopy(): UseClipboardCopyReturn {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')

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
    setCopyStatus('idle')

    try {
      await clipboard.writeText(stringText)
      setCopiedText(stringText)
      setCopyStatus('success')
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      setCopyStatus('error')
      return false
    }
  }, [])

  /** Reset copy status after a delay */
  setTimeout(() => {
    if (copyStatus === 'success' || copyStatus === 'error') {
      setCopyStatus('idle')
    }
  }, 2000)

  return [copiedText, copy, copyStatus]
}
