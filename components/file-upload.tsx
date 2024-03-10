'use client'
// import { UploadDropzone } from '@uploadthing/react'
import toast from 'react-hot-toast';
import { UploadButton } from '../lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core'

interface FileUploadProps {
    onChange: (url?: string) => void; 
    endpoint: keyof typeof ourFileRouter;
}

export default function FileUpload({ onChange, endpoint}: FileUploadProps) {
  return (
    <UploadButton 
        endpoint={endpoint}
        onClientUploadComplete = {(res: { url: string | undefined; }[]) => {
            onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
            toast.error(`${error?.message}`)
        }}
    />
  )
}
