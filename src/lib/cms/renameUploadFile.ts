import { joinFilename } from './filename'

export function renameUploadFile(file: File, newName: string): File {
  return new File([file], newName, {
    lastModified: file.lastModified,
    type: file.type,
  })
}

export function applyBasenameToUploadFile(file: File, basename: string): File {
  const extension = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')) : ''
  return renameUploadFile(file, joinFilename(basename, extension))
}
