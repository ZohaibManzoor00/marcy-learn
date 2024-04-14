'use client'

import toast from 'react-hot-toast';
import { UploadButton } from '../lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core'

interface FileUploadProps {
  onChange: (url?: string, name?: string) => void; 
  endpoint: keyof typeof ourFileRouter;
}

export default function FileUpload({ onChange, endpoint}: FileUploadProps) {
  return (
    <UploadButton 
        endpoint={endpoint}
        onClientUploadComplete = {(res: { url: string | undefined, name: string | undefined }[]) => {
            onChange(res?.[0].url, res?.[0]?.name)
        }}
        onUploadError={(error: Error) => {
            toast.error(`${error?.message}`)
        }}
    />
  )
}
