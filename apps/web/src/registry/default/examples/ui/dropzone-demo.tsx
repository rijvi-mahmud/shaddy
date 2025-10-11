import React from 'react'
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from '@/registry/default/ui/dropzone'

import { CloudUploadIcon, Trash2Icon } from 'lucide-react'

const DropzoneDemo = () => {
  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        status: 'success',
        result: URL.createObjectURL(file),
      }
    },
    validation: {
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg'],
        'video/*': ['.mp4', '.mov', '.avi'],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 3,
    },
  })

  return (
    <div className="not-prose flex flex-col gap-4">
      <Dropzone {...dropzone}>
        <div>
          <div className="flex justify-between">
            <DropzoneDescription>
              Please select up to 3 media files
            </DropzoneDescription>
            <DropzoneMessage />
          </div>
          <DropZoneArea>
            <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
              <CloudUploadIcon className="size-8" />
              <div>
                <p className="font-semibold">Upload listing media files</p>
                <p className="text-sm text-muted-foreground">
                  Click here or drag and drop to upload
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        </div>

        <DropzoneFileList className="grid grid-cols-3 gap-3 p-0">
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem
              className="overflow-hidden rounded-md p-0 shadow-xs"
              key={file.id}
              file={file}
            >
              {file.status === 'pending' && (
                <div className="aspect-video animate-pulse bg-black/20" />
              )}
              {file.status === 'success' && (
                <>
                  {file.file.type.startsWith('video/') ? (
                    <video
                      src={file.result}
                      controls
                      className="aspect-video object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={file.result}
                      alt={`uploaded-${file.fileName}`}
                      className="aspect-video object-cover"
                    />
                  )}
                </>
              )}
              <div className="flex items-center justify-between p-2 pl-4">
                <div className="min-w-0">
                  <p className="truncate text-sm">{file.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <DropzoneRemoveFile variant="ghost" className="shrink-0">
                  <Trash2Icon className="size-4" />
                </DropzoneRemoveFile>
              </div>
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </Dropzone>
    </div>
  )
}

export default DropzoneDemo
