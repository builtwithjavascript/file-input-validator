export type FileValidatorItemKey = 'name' | 'type' | 'size' | 'lastModified'

export interface IFileInfo {
  file: File | null
  lastModified: string
  fileSelected: boolean
  isValid: boolean
  name: string
  displayName: string
  message: string
}

export interface IFileValidatorItem {
  key: FileValidatorItemKey
  name: string
  value: string
  displayValue: string
  hasError: boolean
  iconSuccess: string
  iconError: string
}

export interface IFileValidatorOptions {
  allowedTypes: string[] // list of extensions allowed i.e. ['csv', 'xls']
  maxSize: number // in MB
  maxNameLength: number
  nameTruncateMaxLength: number
  propertiesToValidate: FileValidatorItemKey[]
}

export interface IFileValidator {
  validatorItems: IFileValidatorItem[]
  validateFile(fileInfo: IFileInfo): IFileValidatorItem[]
}

export const FileInputValidatorItems: IFileValidatorItem[] = [
  {
    key: 'name',
    name: 'Name',
    value: '',
    displayValue: '',
    hasError: false,
    iconSuccess: '', //IconConstants.IconSuccess,
    iconError: '' //IconConstants.IconError
  },
  {
    key: 'type',
    name: 'Type',
    value: '',
    displayValue: '',
    hasError: false,
    iconSuccess: '', //IconConstants.IconSuccess,
    iconError: '' //IconConstants.IconError
  },
  {
    key: 'size',
    name: 'Size',
    value: '',
    displayValue: '',
    hasError: false,
    iconSuccess: '', //IconConstants.IconSuccess,
    iconError: '' //IconConstants.IconError
  }
]
