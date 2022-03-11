import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'

export const FormItem = props => {
  const { id, type, as, leftElement, label, helperText, errors, register } = props

  const Tag = as || Input

  return (
    <FormControl isInvalid={errors?.[id]}>
      {label && (
        <FormLabel mb={1} htmlFor={id} fontSize='sm' fontWeight='semibold'>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {leftElement && <InputLeftElement pointerEvents='none'>{leftElement}</InputLeftElement>}
        <Tag id={id} type={type} placeholder={label} {...register(id)} />
      </InputGroup>
      <FormErrorMessage>{errors?.[id]?.message}</FormErrorMessage>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
