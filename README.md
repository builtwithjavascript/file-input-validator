# file-input-validator
A generic file input validator

## Install
```
npm i -D @builtwithjavascript/file-input-validator
```

## Use

### React Example
```typescript
import type { 
  IFileInfo, 
  IFileValidatorItem,
  IFileValidatorOptions,
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

...
```

### Vue Example
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FileUploadComponent } from '@builtwithjavascript/vue-file-upload' 
import type { 
  IFileInfo,
  IFileValidatorOptions
} from '@builtwithjavascript/vue-file-upload' 

const fileValidatorOptions: IFileValidatorOptions = {
  allowedTypes: ['csv', 'json', 'txt'],
  maxSize: 3, // in MB
  maxNameLength: 60, // max name length in chars
  nameTruncateMaxLength: 35, // will truncate the display of the name
  propertiesToValidate: ['name', 'type', 'size']
}

const onUploadClicked = async (fileInfo: IFileInfo) => {
  // do what you need to do with fileInfo.file
  // i.e. create form data and post it to an API endpoint
  const file = new FormData()
  file.append('file', fileInfo.file as Blob)

  const response = await someApiClient.post({
    file: file
  })

  ...
}

// optional: to reset from your parent component:
const refFileUploadComp = ref<InstanceType<typeof FileUploadComponent> | null>()
const reset = () => {
  refFileUploadComp.value?.reset()
}
</script>

<template>
  <FileUploadComponent 
    id="file-input" 
    uploadLabel="Import File"
    ref="refFileUploadComp"
    :validatorOptions="fileValidatorOptions"
    :roundedCorners="true"
    :showOnlyErrors="true"
    successClass="success bg-pink-500"
    errorClass = "error bg-gray-500"
    inputCssClass = "border border-slate-500"
    @uploadClicked="onUploadClicked" />

  <!-- optional: to reset from your parent component -->
  <button @click="reset">Reset</button>
</template>
```

NOTE: if you pass `showOnlyErrors` true, then only the validator items that fail will be displayed.

