import React, { useState } from "react"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterDisplay = (e) =>{
    e.preventDefault()
     setShowLogin(false)
    setShowRegister(true)

  }


  const handleLoginDisplay = (e) =>{
    e.preventDefault()

     setShowLogin(true)
    setShowRegister(false)
  }
  return (
    <>
    <Flex
      display={showLogin? "block": "none"}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>TRANSFER WIZ</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Login in to your account<Link color={'blue.400'}></Link> 
          </Text>
        </Stack>
        <Box
         minW={'500px'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
               
                <Link onClick={(e)=>{handleRegisterDisplay(e)}} color={'blue.400'}>Don't have an account yet?Sign up.</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>







    <Flex
    display={showRegister? "block": "none"}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>TRANSFER WIZ</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Sign Up<Link color={'blue.400'}></Link> 
          </Text>
        </Stack>
        <Box
         minW={'500px'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>First Name</FormLabel>
              <Input type="text"  name="firstname"/>
            </FormControl>

            <FormControl id="email">
              <FormLabel>Last Name</FormLabel>
              <Input type="text" name="lastname" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input name="email" type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>

             <FormControl id="password">
              <FormLabel>Confirm Password</FormLabel>
              <Input name="confirmpassword" type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
               
                <Link onClick={(e)=>{handleLoginDisplay(e)}} color={'blue.400'}>Already have an account?Sign in.</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>



    </>
  );
}