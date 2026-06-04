export function renameUploadFile(file: File, newName: string): File {
  return new File([file], newName, {
    lastModified: file.lastModified,
    type: file.type,
  })
}
