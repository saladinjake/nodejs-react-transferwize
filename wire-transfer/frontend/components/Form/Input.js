import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form';
import { FormControl, FormLabel,
 Input as ChakraInput, InputProps as ChakraInputProps,
  FormErrorMessage } from "@chakra-ui/react";

const InputMaker = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="rgba(8,23,200)"
        bgColor="#fff"
        border="2px solid #eaeaea"
        variant="filled"
        _hover={{
          bgColor: '#eaeaea'
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && (
      <FormErrorMessage>
        {error.message}
      </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Input = forwardRef(InputMaker);
