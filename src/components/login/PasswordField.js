import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
    Text
} from '@chakra-ui/react'
import * as React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export const PasswordField = React.forwardRef((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef(null)
    const mergeRef = useMergeRefs(inputRef, ref)
    const { errors, register } = props
    const onClickReveal = () => {
        onToggle()

        if (inputRef.current) {
            inputRef.current.focus({
                preventScroll: true,
            })
        }
    }

    return (
        <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant='link'
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id='password'
                    ref={mergeRef}
                    name='password'
                    type={isOpen ? 'text' : 'password'}
                    autoComplete='current-password'
                    {...register("password", { required: "password invalid", minLength: { value: 8, message: "too short" } })}
                    {...props}
                />
            </InputGroup>
            <Text color="red.400">{errors?.password?.message}</Text>
        </FormControl>
    )
})
PasswordField.displayName = 'PasswordField'
