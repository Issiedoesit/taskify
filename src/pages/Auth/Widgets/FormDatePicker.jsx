import { DateTimePicker } from '@mantine/dates'
import React from 'react'

const FormDatePicker = ({display, colSpan, inputWidth, inputValue, labelColor, bgColor, labelFont, labelFontSize, handleChange, handleBlur, fieldError, inputLabel, inputName, inputRequired, inputType, inputPlaceholder, inputId, paddingY, paddingX, fontSize}) => {
  return (
    <fieldset className={`gap-2.5 ${display ? display : 'flex flex-col'} ${colSpan ? colSpan : 'col-span-1'} `}>
        <label htmlFor={inputId || 'due_date'} className={`${labelFontSize ? labelFontSize : 'text-sm'} ${labelFont ? labelFont : 'font-spaceGroteskMedium'} ${labelColor ? labelColor : 'text-brandGray14x'}`}>{inputLabel || "Due date"}</label>
        <DateTimePicker
        // error={fieldError}
      variant="unstyled" defaultDate={new Date()} minDate={new Date()} onChange={handleChange} value={inputValue} onBlur={handleBlur} id={inputId || 'due_date'} name={inputName || 'due_date'} placeholder={inputPlaceholder || 'Due'} className={`${paddingX ? paddingX : 'px-4'} ${paddingY ? paddingY : 'py-1'} ${fontSize || 'text-sm'} ${bgColor ? bgColor : 'bg-transparent'} autofill:bg-transparent rounded-five border-2 ${fieldError ? 'border-brandRed1x' : 'border-brandGray16x'} ${inputWidth ? inputWidth : 'w-full'}`} required={inputRequired || true } />
    </fieldset>
  )
}

export default FormDatePicker