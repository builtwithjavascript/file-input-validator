import { IFileInfo, IFileValidatorItem, IFileValidator, IFileValidatorOptions, FileInputValidatorItems } from './Models'

export const getFileExtensionFromName = (name: string): string => {
  const parts = (name || '').split('.')
  if (parts && parts.length > 1) {
    return (parts[parts.length - 1] || '').trim().toLowerCase()
  }
  return ''
}

export const validateLastModified = (
  _validatorOptions: IFileValidatorOptions /* intentionally unused */,
  fileInfo: IFileInfo,
  validatorItems: IFileValidatorItem[]
) => {
  const file: any = fileInfo.file
  if (!file) {
    return
  }

  const validatorItem = validatorItems.find((o) => o.name.toLowerCase() === 'lastmodified')
  if (!validatorItem) {
    return
  }

  // set also fileInfo property
  fileInfo.lastModified = file.lastModifiedDate

  // no actual validation performed
  validatorItem.hasError = false
  validatorItem.value = fileInfo.lastModified
  validatorItem.displayValue = fileInfo.lastModified // later we might want to format this based on localization or user preferences?
}

// helper for friendly size display
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// helper to mark the FileInfo instance invalid
export const markFileInfoInvalid = (fileInfo: IFileInfo, message?: string) => {
  fileInfo.isValid = false
  const msg = (message || '').trim()
  if (msg.length > 0) {
    fileInfo.message = msg
  } else {
    fileInfo.message = ''
  }
  return fileInfo
}

export const ValidatorStrategyLookup: {
  [key: string]: (options: IFileValidatorOptions, fileInfo: IFileInfo, validatorItems: IFileValidatorItem[]) => void
} = {
  name: (options: IFileValidatorOptions, fileInfo: IFileInfo, validatorItems: IFileValidatorItem[]) => {
    const file = fileInfo.file
    // if (!file) {
    //   return
    // }

    const validatorItem = validatorItems.find((o) => o.name.toLowerCase() === 'name')
    if (!validatorItem) {
      console.warn('name strrategy: could not find "name" validator item')
      return
    }

    // only truncate name here, no actual validation performed
    const max = options.nameTruncateMaxLength
    const suffix = ' ...'
    const fileName = (file?.name || '').trim()
    validatorItem.value = fileName
    if (fileName.length < max) {
      validatorItem.displayValue = fileName
    } else {
      // truncate by putting ... in the middle
      const maxChars = 13
      const left = fileName.substring(0, maxChars)
      const right = fileName.split('').reverse().join('').substring(0, maxChars).split('').reverse().join('')
      validatorItem.displayValue = `${left} ${suffix} ${right}`
    }

    fileInfo.name = validatorItem.value
    fileInfo.displayName = validatorItem.displayValue
    console.log('fileName.length', fileName.length, options.maxNameLength, `"${fileName}"`)
    if (fileName.length > options.maxNameLength) {
      const message = `max length allowed is ${options.maxNameLength.toString()} chars`
      validatorItem.hasError = true
      validatorItem.displayValue = `File name is too long - ${message}`
      markFileInfoInvalid(fileInfo)
    } else {
      fileInfo.message = fileInfo.name
      validatorItem.hasError = false
    }
  },
  type: (options: IFileValidatorOptions, fileInfo: IFileInfo, validatorItems: IFileValidatorItem[]) => {
    const file = fileInfo.file
    if (!file) {
      return
    }

    // validate extension
    const allowedTypes = options.allowedTypes || []
    if (allowedTypes.length === 0) {
      markFileInfoInvalid(fileInfo, 'No allowed file types have been specified by the developer')
      return
    }

    if (allowedTypes.indexOf('*') > -1) {
      // all files allowed, just return
      return
    }

    const validatorItem = validatorItems.find((o) => o.name.toLowerCase() === 'type')
    if (!validatorItem) {
      return
    }

    // build error message
    let errorMessage = ``
    if (allowedTypes.length > 1) {
      errorMessage = `file must be one of these types: ${allowedTypes.join(',')}`
    } else {
      errorMessage = `file type must be ${allowedTypes[0]}`
    }

    // validate
    //const parts = (file.name || '').split('.')
    //if (parts && parts.length > 1) {
    //  const ext = (parts[parts.length - 1] || '').trim().toLowerCase()
    const ext = getFileExtensionFromName(file.name)
    if (ext) {
      if (allowedTypes.indexOf(ext) > -1) {
        validatorItem.hasError = false
        validatorItem.value = file.type
        validatorItem.displayValue = ext
      } else {
        validatorItem.hasError = true
        validatorItem.value = file.type || 'unknown'
        validatorItem.displayValue = `${ext} - ${errorMessage}`
        markFileInfoInvalid(fileInfo)
      }
    } else {
      //setError(d, file.type || "unknown")
      validatorItem.hasError = true
      validatorItem.value = file.type || 'unknown'
      validatorItem.displayValue = `${validatorItem.value} - ${errorMessage}`
      markFileInfoInvalid(fileInfo)
    }
  },
  size: (options: IFileValidatorOptions, fileInfo: IFileInfo, validatorItems: IFileValidatorItem[]) => {
    const file = fileInfo.file
    if (!file) {
      return
    }

    const validatorItem = validatorItems.find((o) => o.name.toLowerCase() === 'size')
    if (!validatorItem) {
      return
    }

    const oneMB = 1024000
    const origFileSizeInBytes = file.size
    const maxFileSizeInBytes = oneMB * options.maxSize
    validatorItem.value = `${origFileSizeInBytes} bytes`
    validatorItem.displayValue = formatBytes(origFileSizeInBytes)

    if (origFileSizeInBytes > maxFileSizeInBytes) {
      const errorMessage = `max upload size is ${options.maxSize.toString()} MB`
      validatorItem.hasError = true
      validatorItem.displayValue = `${validatorItem.displayValue} - ${errorMessage}`
      markFileInfoInvalid(fileInfo)
    } else {
      validatorItem.hasError = false
    }
  },
  datemodified: (options: IFileValidatorOptions, fileInfo: IFileInfo, validatorItems: IFileValidatorItem[]) => {
    validateLastModified(options, fileInfo, validatorItems)
  },
  lastmodified: (options: IFileValidatorOptions, fileInfo: IFileInfo, validatorItems: IFileValidatorItem[]) => {
    validateLastModified(options, fileInfo, validatorItems)
  }
}

export const DefaultFileValidatorOptions: IFileValidatorOptions = {
  allowedTypes: ['csv'],
  propertiesToValidate: ['name', 'type', 'size'],
  maxSize: 50,
  maxNameLength: 75,
  nameTruncateMaxLength: 35
}

export class FileValidator implements IFileValidator {
  private options: IFileValidatorOptions
  private enabledValidatorItems: IFileValidatorItem[] = []

  constructor(options?: IFileValidatorOptions) {
    this.options = { ...DefaultFileValidatorOptions, ...(options || {}) }
    this.enabledValidatorItems = FileInputValidatorItems.filter((x) => this.options.allowedTypes.indexOf(x.key))
  }

  get validatorItems(): IFileValidatorItem[] {
    const propertiesToValidate = (this.options.propertiesToValidate || []).map((p) => p.toLowerCase())
    if (propertiesToValidate.length > 0) {
      const results = this.enabledValidatorItems.filter(
        (item) => propertiesToValidate.indexOf(item.name.toLowerCase()) > -1
      )
      return results
    }
    return []
  }

  validateFile(fileInfo: IFileInfo): IFileValidatorItem[] {
    const file: any = fileInfo.file
    //_logger.log('validateFile !file', !file)
    if (file) {
      // set it as valid and then run validation
      fileInfo.isValid = true

      const propertiesToValidate = this.options.propertiesToValidate || []
      if (propertiesToValidate.length > 0) {
        propertiesToValidate.forEach((propertyName) => {
          const loweredPropertyName = propertyName.toLowerCase()
          if (Object.prototype.hasOwnProperty.call(ValidatorStrategyLookup, loweredPropertyName)) {
            const strategy = ValidatorStrategyLookup[loweredPropertyName]
            strategy(this.options, fileInfo, this.enabledValidatorItems)
          } else {
            console.warn('FileValidator: Warning: could not find validator for property', loweredPropertyName)
          }
        })
      }
    } else {
      markFileInfoInvalid(fileInfo, `No file has been selected`)
    }

    // if file is valid, hide the name Validator Item
    return this.validatorItems
  }
}
