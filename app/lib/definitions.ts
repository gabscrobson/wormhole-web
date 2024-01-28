export interface FileInfo {
  id: string
  name: string
  key: string
  contentType: string
  createdAt: string
  size: number
}

export interface GenerateUploadPresignedUrlResponse {
  signedUrl: string
  fileId: string
}
