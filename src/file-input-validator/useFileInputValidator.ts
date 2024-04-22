// file: src/file-input-validator/useFileInputValidator.ts
import { FileValidator } from './FileInputValidator'

export const useFileInputValidator = (options?: any) => {
  return new FileValidator(options)
}
