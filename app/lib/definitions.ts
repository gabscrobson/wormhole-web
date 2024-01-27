export interface FileInfo {
  id: string
  name: string
  key: string
  contentType: string
  createdAt: string
}

export interface GeneratePresignedUrlResponse {
  signedUrl: string
  fileId: string
}
