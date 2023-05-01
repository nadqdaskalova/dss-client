import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import withStyles from '@mui/styles/withStyles'
import isEqual from 'fast-deep-equal'
import isNaN from 'lodash/isNaN'
import toString from 'lodash/toString'
import MUIRichTextEditor from 'mui-rte'
import React, { FocusEventHandler, HTMLInputTypeAttribute, useCallback } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import styled from 'styled-components'
import { resolvePath } from '../helpers/HookFormComponentsHelpers'
import BorderRadius from '../tokens/BorderRadius'
import Spacings from '../tokens/Spacings'
import StyledBox from './StyledBox'

declare global {
  interface EventTarget {
    valueAsNumber: number
  }
}

const TextFieldStyled = withStyles({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: (props) => props.multiline && 'none'
    },
    '& .MuiOutlinedInput-root': {
      flex: '100%'
    }
  }
})(TextField) as typeof TextField

export function TextFieldController<T extends Record<string, any>>({
  name,
  type,
  onBlur,
  control,
  disabled,
  multiline,
  adornment,
  label,
  placeholder,
  inputProps
}: {
  name: Path<T>
  disabled?: boolean
  control: Control<T>
  multiline?: boolean
  adornment?: JSX.Element
  label?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  inputProps?: any
}) {
  return (
    <Controller
      render={({ field: { onChange, value }, formState: { errors } }) => {
        const error = resolvePath(errors, `${name}.message`, '')

        return (
          <TextFieldStyled
            disabled={disabled}
            fullWidth
            value={value}
            onBlur={onBlur}
            onChange={(event) => {
              if (type === 'number') {
                const { valueAsNumber } = event.target
                return onChange({ ...event, target: { value: !isNaN(valueAsNumber) ? toString(valueAsNumber) : '' } })
              }

              return onChange(event)
            }}
            placeholder={placeholder as string}
            label={label}
            error={Boolean(error)}
            helperText={error as any}
            multiline={multiline}
            type={type}
            InputProps={{
              ...(adornment && {
                endAdornment: <StyledBox style={{ padding: '0 14px' }}>{adornment}</StyledBox>
              })
            }}
            inputProps={!!inputProps ? inputProps : {}}
          />
        )
      }}
      control={control}
      name={name}
    />
  )
}

export const DatePickerController = <T extends Record<string, any>>({
  name,
  disabled,
  label,
  inputFormat,
  control,
  readOnly,
  loading
}: {
  name: Path<T>
  value?: any
  onChange?: (value: any) => unknown
  disabled?: boolean
  label: any
  control: Control<T>
  inputFormat?: string
  readOnly?: boolean
  loading?: boolean
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <DesktopDatePicker
            readOnly={readOnly}
            disabled={disabled}
            label={label}
            renderInput={(params) => <TextField {...params} />}
            onChange={onChange}
            value={value}
            inputFormat={inputFormat}
          />
        )}
        control={control}
        name={name}
      />
    </LocalizationProvider>
  )
}

export function AutoCompleteController<T extends Record<string, any>>({
  name,
  control,
  options,
  onClose,
  onChange: _onChange,
  disabled,
  placeholder,
  label,
  testId
}: {
  name: Path<T>
  disabled?: boolean
  control: Control<T>
  onClose?: () => void
  placeholder?: string
  label?: string
  onChange?: (value: string | number | Record<string, any>) => void
  options: { label: string; value: string | number | Record<string, any> }[]
  testId?: string
}) {
  const getOptionValue = useCallback(
    (value) => {
      return (
        options.find((option) => {
          if (typeof option.value === 'object') return isEqual(option.value, value)
          return option.value === value
        }) || { label: '', value: '' }
      )
    },
    [options]
  )

  return (
    <Controller
      render={({ field: { onChange, value = '' }, formState: { errors } }) => {
        const option = getOptionValue(value)
        const error = resolvePath(errors, `${name}.message`, '')

        return (
          <Autocomplete
            fullWidth
            value={option}
            options={options}
            onClose={onClose}
            disabled={disabled}
            disableClearable
            getOptionLabel={(option) => option.label}
            sx={{ '.MuiOutlinedInput-root': { flex: '100%' } }}
            onChange={(event, { value = '' }) => {
              !!_onChange && _onChange(value)
              return onChange(value)
            }}
            isOptionEqualToValue={(option, value) => {
              if (typeof option.value === 'object') return value.value === '' || isEqual(option.value, value.value)
              return value.value === '' || option.value === value.value
            }}
            data-testid={testId}
            renderInput={(props) => (
              <TextField
                {...props}
                placeholder={placeholder as string}
                label={label}
                error={Boolean(error) as any}
                helperText={error as any}
              />
            )}
            renderOption={(props, _option) => {
              if (option.value === '') props['aria-selected'] = false

              return (
                <li {...props} key={props.id}>
                  {_option.label}
                </li>
              )
            }}
          />
        )
      }}
      control={control}
      name={name}
    />
  )
}

export function CheckboxController<T extends Record<string, any>>({
  name,
  control,
  disabled,
  label,
  onChange: _onChange,
  labelPlacement = 'end',
  justifyContent = 'flex-start'
}: {
  name: Path<T>
  disabled?: boolean
  control: Control<T>
  label: string
  justifyContent?: React.CSSProperties['justifyContent']
  labelPlacement?: FormControlLabelProps['labelPlacement']
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}) {
  return (
    <FormControlLabel
      labelPlacement={labelPlacement}
      label={label}
      control={
        <Controller
          render={({ field: { onChange, value } }) => (
            <Checkbox
              disabled={disabled}
              checked={Boolean(value)}
              onChange={(...event) => {
                onChange(...event)
                _onChange && _onChange(event[0], event[1])
              }}
            />
          )}
          control={control}
          name={name}
        />
      }
      sx={{ marginRight: 0, marginLeft: 0, justifyContent }}
    />
  )
}

// export function SwitchController<T extends Record<string, any>>({
//   name,
//   onBlur,
//   control,
//   disabled,
//   label,
//   labelPlacement = 'end',
//   justifyContent = 'flex-start'
// }: {
//   name: Path<T>
//   disabled?: boolean
//   control: Control<T>
//   label: string
//   onBlur?: FocusEventHandler<HTMLButtonElement>
//   justifyContent?: React.CSSProperties['justifyContent']
//   labelPlacement?: FormControlLabelProps['labelPlacement']
// }) {

//   return (
//     <FormControlLabel
//       labelPlacement={labelPlacement}
//       label={label}
//       control={
//         <Controller
//           render={({ field: { onChange, value } }) => (
//             <MaterialSwitchExperimental
//               disabled={disabled}
//               checked={Boolean(value)}
//               onChange={onChange}
//               onBlur={onBlur}
//             />
//           )}
//           control={control}
//           name={name}
//         />
//       }
//       sx={{ marginRight: 0, marginLeft: 0, justifyContent }}
//     />
//   )
// }

export function EditorController<T extends Record<string, unknown>>({
  name,
  control,
  labelTextKey,
  labelText,
  disabled,
  loading,
  onFocus,
  onBlur,
  placeholder,
  defaultValue
}: {
  name: Path<T>
  control: Control<T>
  labelTextKey?: string
  disabled?: boolean
  loading?: boolean
  labelText?: string
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: any
  defaultValue?: any
}) {
  return (
    <Controller
      render={({ field: { onChange, value } }: any) => {
        return (
          <EditorWrapper fullWidth fullPadding spacing={Spacings.min}>
            <MUIRichTextEditor
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              {...({ editorState: value } as any)}
              label={placeholder}
              {...(!!defaultValue && ({ defaultValue: defaultValue } as any))}
              controls={['title', 'bold', 'italic', 'underline', 'strikethrough', 'undo', 'redo', 'quote', 'clear']}
            />
          </EditorWrapper>
        )
      }}
      control={control}
      name={name}
    />
  )
}

const EditorWrapper = styled(StyledBox)`
  border-radius: ${BorderRadius.soft};
  * {
    position: relative !important;
  }
  #mui-rte-toolbar {
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: ${BorderRadius.soft};
    margin-bottom: ${Spacings.medium};
    padding-bottom: ${Spacings.min} !important;
    button {
      padding: 4px;
    }
  }
  #mui-rte-container {
    margin: 0 !important;
  }

  #mui-rte-editor {
    margin-left: 12px;
    max-height: 300px;
    overflow: hidden;
    overflow-y: scroll;
  }
`
