# file-input-validator
A generic file input validator

## Install
```
npm i -D @builtwithjavascript/file-input-validator
```

## Use

### React Example
```
import type { 
  IFileInfo, 
  IFileValidatorItem,
  IFileValidatorOptions
} from '@builtwithjavascript/file-input-validator'

import { useFileInputValidator } from '@builtwithjavascript/file-input-validator'

// file validator:
const fileValidator = useFileInputValidator(validatorOptions)

// file info state
const [fileInfo, setFileInfo] = useState<IFileInfo>({
  file: null,
  lastModified: '',
  fileSelected: false,
  isValid: false,
  name: '',
  displayName: '',
  message: ''
})

// validator items state
const [validatorItems, setValidatorItems] = useState<IFileValidatorItem[]>([])

const onFileInputChanged = (updatedModel: IFileInfo) => {
  setFileInfo(updatedModel)
  setValidatorItems(fileValidator.validateFile(fileInfo))
}
```

### Vue Example

