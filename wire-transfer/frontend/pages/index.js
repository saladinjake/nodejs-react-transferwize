import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import NavBar from "../core/views/components/Navbar"
import Footer from "../core/views/components/Footer"
import HeroLogin from "../core/views/components/Herologin"

const HomePage = () => {
  return (
   <>
      <NavBar/>
      <HeroLogin/>
      <Footer/>
  </>
  );
};

export default HomePage;
