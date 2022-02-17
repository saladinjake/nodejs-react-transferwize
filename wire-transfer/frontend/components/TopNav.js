import { useState } from 'react'
import {
  useColorMode,
  Switch,
  Box,
  Button,
  IconButton
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useLoadingProgress } from './LoadSkeleton'

export const TopNav = () => {

  const { start , done} = useLoadingProgress()

  const fakeLoading = () =>{
     start()
     setTimeout(()=>{
        done()
     },3000)
  }

  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [display, changeDisplay] = useState('none')
  return (
    <>
        {/* Desktop */}
        <Box
          display={['none', 'none', 'flex','flex']}
          h="20px"
          
        >
         <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              
              
            >
              Logo Name here
                    </Button>
          </NextLink>

         
          <NextLink href="/contact" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Contact"
             
              
            >
              Logout
                    </Button>
          </NextLink>
        
        </Box>


        {/* Mobile */}
        <Box
          display={['flex', 'none', 'none','none']}
        >

        <NextLink
       

         href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={1}
              w="100%"

            >
              BITCOIN TRADE
                    </Button>
          </NextLink>

        <IconButton
          aria-label="Open Menu"
          size="lg"
          position="absolute"
          top="0px"
          right="4px"
          mr={1}
          icon={
            <HamburgerIcon />
          }
          onClick={() => changeDisplay('Box')}
          display={['flex', 'flex', 'none', 'none']}
        />

        </Box>

        
        
   

      {/* Mobile Content */}
      <Box
        w='100vw'
        display={display}
        bgColor="#f6f6f6"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        zIndex={20}
        overflowY="auto"
        boxdir="column"
      >
        <Box justify="Box-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={
              <CloseIcon />
            }
            onClick={() => changeDisplay('none')}
          />
        </Box>

        <Box
          boxdir="column"
          align="center"
        >
          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={1}
              w="100%"
            >
              Home
                    </Button>
          </NextLink>

          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Dashboard"
              my={1}
              w="100%"
            >
              Dashboard
                    </Button>
          </NextLink>

          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label=""
              my={1}
              w="100%"
            >
              Frontpage
            </Button>
          </NextLink>
        </Box>
      </Box>

<br/>
      </>


  )
}