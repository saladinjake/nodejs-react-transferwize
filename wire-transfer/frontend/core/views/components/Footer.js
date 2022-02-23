import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

const Logo = (props) => {
  return (
    <Box
      height={32}
      viewBox="0 0 120 28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Text>TRANSFERWIZ</Text>
    </Box>
  );
};

const TitleLinks = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box
      w="100%"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'12xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <TitleLinks>Money Transfer</TitleLinks>
            <Link href={'#'}>Multicurrency Account</Link>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Link href={'#'}>Business</Link>
              <Tag
                size={'sm'}
                bg={useColorModeValue('green.300', 'green.800')}
                ml={2}
                color={'white'}>
                New
              </Tag>
            </Stack>
            
          </Stack>
          <Stack align={'flex-start'}>
            <TitleLinks>Company</TitleLinks>
            <Link href={'#'}>About Us</Link>
            
          </Stack>
          <Stack align={'flex-start'}>
            <TitleLinks>Legal</TitleLinks>
            <Link href={'#'}>Cookies Policy</Link>
           
          </Stack>
          <Stack align={'flex-start'}>
            <TitleLinks>SITEMAPS</TitleLinks>
            <Link href={'#'}>SIGN UP</Link>
            
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2022 FINTECH SOLUTIONS All rights reserved
        </Text>
      </Box>
    </Box>
  );
}

export default  Footer