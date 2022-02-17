import { Tabs, TabList, TabPanels,
 Tab, TabPanel,VStack, Box ,Flex
} from "@chakra-ui/react"

import { GettingStarted } from  "./GTD"


import  {TopNav } from './TopNav'
export const NavTabs = () => {

  
  // 1. Create the component
  function DataTabs({ data }) {
    return (
      <>
       <TopNav/>
      <Tabs  w="100%" mt="-10px">
        <TabList h="1em">
          {data.map((tab, index) => (
            <Tab  fontSize="10px" key={index}>{tab.label}</Tab>
          ))}
          <Tab fontSize="10px" >Hello</Tab>
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel p={4} key={index}>
              {tab.content}
            </TabPanel>
          ))}


          <TabPanel>
     
          </TabPanel>
        </TabPanels>
      </Tabs>

      </>
    )
  }

  // 2. Create an array of data
  const tabData = [
    {
      label: "Dashboard",
      content: <GettingStarted/>,
    },
    {
      label: "Profile",
      content:
        "build somethin awesome",
    },
     {
      label: "Wallet",
      content:
        "build somethin awesome",
    },
  ]

  // 3. Pass the props and chill!
  return <DataTabs data={tabData} />
}