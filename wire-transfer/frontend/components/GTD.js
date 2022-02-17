import { ReactElement, useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  VStack,
  useColorModeValue,
  Flex
} from "@chakra-ui/react"



export const GettingStarted = ({ children, ...props }) => {
  
  return (
    <Accordion mt="-15px" ml="-10px"  w="100%"  
    boxShadow="10px 4px 12px 0 rgba(0, 0, 0, 0.05)"
    height="100vh"
    border="2px solid #eaeaea"

    >
  <AccordionItem>
    <h2>
      <AccordionButton h="40px" boxShadow="10px 4px 12px 0 rgba(0, 0, 0, 0.05)">
        <Box flex="1" textAlign="left" fontSize="12px">
         Overview Pane
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>

       
     



     
      <Flex align="column"  >
      
         
          
      </Flex>
    </AccordionPanel>
  </AccordionItem>

</Accordion>
       

  )
}


