/**
 * Custom fetch wrapper with progress tracking and timeout support.
 * This function uses XMLHttpRequest for progress tracking and native fetch for simpler requests.
 * It supports both upload and download progress tracking, request timeouts, and handles various body types.
 * @param input - The resource to fetch.
 * @param init - The request initialization options.
 * @returns A promise that resolves to the response.
 */

export const fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit & {
    timeout?: number
    progress?: {
      upload?: (loaded: number, total: number) => void
      download?: (loaded: number, total: number) => void
    }
  }
): Promise<Response> => {
  /**
   * Use native fetch when no progress tracking is needed.
   * This allows for simpler requests without the overhead of XMLHttpRequest.
   */
  if (!init?.progress?.upload && !init?.progress?.download) {
    /**
     * If timeout is provided, create an AbortController to handle the timeout.
     */
    if (init?.timeout) {
      const controller = new AbortController()

      /**
       * Create a timeout that will abort the request.
       * This ensures that the request will not hang indefinitely.
       */
      const timeoutId = setTimeout(() => {
        controller.abort()
      }, init.timeout)

      /**
       * If a signal is provided, combine it with the controller's signal.
       * This allows for both user-initiated aborts and timeout aborts.
       */
      const signal = init?.signal
        ? AbortSignal.any([init.signal, controller.signal])
        : controller.signal

      return globalThis
        .fetch(input, {
          signal,
          ...init,
        })
        .finally(() => {
          clearTimeout(timeoutId)
        })
    }

    return globalThis.fetch(input, {
      signal: init?.signal,
      ...init,
    })
  }

  const xhr = new XMLHttpRequest()
  xhr.open(init?.method || 'GET', input.toString())

  /**
   * Handle different body types appropriately.
   * This includes FormData, Blob, ArrayBuffer, and ReadableStream.
   */
  let body: any = init?.body
  const isFormData = body instanceof FormData
  const isBlob = body instanceof Blob || body instanceof ArrayBuffer
  const isReadableStream =
    typeof ReadableStream !== 'undefined' && body instanceof ReadableStream

  /**
   * Handle ReadableStream (convert to Blob).
   * This is necessary because XMLHttpRequest does not support ReadableStream directly.
   * We create a Response from the ReadableStream and convert it to Blob.
   * This allows us to send the stream data as a Blob in the request.
   * If the conversion fails, we throw an error with a descriptive message.
   */
  if (isReadableStream) {
    try {
      /**
       * Create a Response from the ReadableStream and convert to Blob.
       * This allows us to send the stream data as a Blob in the request.
       */
      const response = new Response(body as ReadableStream)
      body = await response.blob()
    } catch (error) {
      throw new Error(
        'Failed to process ReadableStream body: ' + (error as Error).message
      )
    }
  } else if (!isFormData && !isBlob && body) {
    xhr.setRequestHeader('Content-Type', 'application/json')
    body = JSON.stringify(body)
  }

  /**
   * Apply custom headers.
   * This allows the user to set headers like Authorization, Content-Type, etc.
   */
  Object.entries(init?.headers || {}).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value as string)
  })

  return new Promise((resolve, reject) => {
    /**
     * Handle request abortion.
     * This allows the request to be aborted using an AbortSignal.
     */
    let abortListener: ((event: Event) => void) | undefined

    if (init?.signal) {
      abortListener = () => {
        xhr.abort()
        reject(new Error('Request aborted'))
      }
      init.signal.addEventListener('abort', abortListener)
    }

    /**
     * Handle timeout.
     * This allows the request to be aborted if it takes too long.
     * If a timeout is provided, the request will be aborted after the specified duration.
     */
    if (init?.timeout) {
      xhr.timeout = init.timeout
      xhr.ontimeout = () => reject(new Error('Request timed out'))
    }

    /**
     * Handle upload progress.
     * This allows the user to track the progress of file uploads.
     * @param event The progress event.
     */
    xhr.upload.onprogress = (event) => {
      if (init?.progress?.upload && event.lengthComputable) {
        init.progress.upload(event.loaded, event.total)
      }
    }

    /**
     * Handle download progress.
     * @param event The progress event for download tracking.
     * This allows the user to track the progress of file downloads.
     * note: XMLHttpRequest does not support download progress for all response types.
     * It works best with 'text', 'json', and 'document' response types.
     */
    xhr.onprogress = (event) => {
      if (init?.progress?.download && event.lengthComputable) {
        init.progress.download(event.loaded, event.total)
      }
    }

    xhr.onload = () => {
      /**
       * Clean up abort listener
       * This ensures that the abort listener is removed after the request completes.
       */
      if (init?.signal && abortListener) {
        init.signal.removeEventListener('abort', abortListener)
      }

      /**
       * Determine response body based on responseType.
       * This allows us to handle different response types correctly.
       * For example, if the responseType is 'arraybuffer' or 'blob', we use xhr.response.
       * Otherwise, we use xhr.responseText.
       */
      let responseBody: any
      if (xhr.responseType === 'arraybuffer' || xhr.responseType === 'blob') {
        responseBody = xhr.response
      } else {
        responseBody = xhr.responseText
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        /**
         * Handle successful response.
         * This includes final progress updates for download tracking.
         * If the response has a Content-Length header, we use it to calculate the total size
         * and call the download progress callback with the final loaded size.
         * This ensures that the user gets the final download progress update.
         * @note: The Content-Length header may not always be present, especially for chunked
         * responses or when the server does not provide it. In such cases, total will be 0.
         * This means the download progress will not be accurate, but it will still provide
         * the loaded size.
         */
        if (init?.progress?.download) {
          const total = xhr.getResponseHeader('Content-Length')
            ? parseInt(xhr.getResponseHeader('Content-Length') || '0', 10)
            : 0
          init.progress.download(responseBody.length || 0, total)
        }

        resolve(
          new Response(responseBody, {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders()),
          })
        )
      } else {
        reject(new Error(`Request failed with status ${xhr.status}`))
      }
    }

    xhr.onerror = () => {
      /**
       * Clean up abort listener
       * This ensures that the abort listener is removed if an error occurs.
       */
      if (init?.signal && abortListener) {
        init.signal.removeEventListener('abort', abortListener)
      }
      reject(new Error('Network error'))
    }

    xhr.send(body)
  })
}

/**
 * Parse HTTP headers from a string into a Headers object.
 * @param headerStr The raw HTTP headers string.
 * @returns A Headers object containing the parsed headers.
 */
function parseHeaders(headerStr: string): Headers {
  const headers = new Headers()
  const headerPairs = headerStr.trim().split(/[\r\n]+/)

  headerPairs.forEach((line) => {
    const parts = line.split(': ')
    const header = parts.shift()
    const value = parts.join(': ')
    if (header) {
      headers.append(header, value)
    }
  })

  return headers
}
