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

import seoOptimization from "../core/helpers/utils/seoOptimizer";
import Layout from "../core/views/components/Layouts"
const pageSEO = seoOptimization(
  "About",
  "This is the shit in town.We power the web globally at simba. Hire us now"
);


const HomePage = () => {
  return (
   <Layout SEO={pageSEO}>
      <NavBar/>
      <HeroLogin/>
      <Footer/>
  </Layout>
  );
};

export default HomePage;
