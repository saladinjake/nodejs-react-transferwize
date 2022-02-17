import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    HStack
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from '../components/NavItem'

export default function TradeFairSidebar() {
    const [navSize, changeNavSize] = useState("small")
    return (
        <Flex
            pos="sticky"
            left="-10px"
            w={navSize == "small" ? "50px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
            background="#fff"
            marginTop="-3.0vh"
            boxShadow="10px 4px 12px 0 rgba(0, 0, 0, 0.05)"
        >

            <Flex
               
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
            <HStack>
                <IconButton
                    background="none"
                    mt={1}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
               <Text   display={navSize == "small" ? "none" : "block"}>BITCOIN TRADE</Text>
             </HStack>

         <Flex
                p="1%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={-6}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex  align="center">
                    <Avatar size="sm" src="me.jpg" />
                    <Flex flexDir="column"  display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Saladin Jake</Heading>
                        <Text color="gray">$2,000,000.00</Text>
                    </Flex>
                </Flex>
            </Flex>
                <NavItem  navSize={navSize} icon={FiHome} title="Dashboard" active description="This is the description for the dashboard." />
                <NavItem navSize={navSize} icon={FiUser} title="New Transaction" />
                <NavItem navSize={navSize} icon={FiCalendar} title="Logout"  />
                
            </Flex>

           
        </Flex>
    )
}
