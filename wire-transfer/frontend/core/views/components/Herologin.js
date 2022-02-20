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
import { useRouter } from 'next/router';

import * as Yup from "yup";
// import * as toast from "react-hot-toast";
import { Formik } from "formik";

import {
  useNavigate, //useLocation
} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logOut, setPrevPath } from "../../redux/actions/auth.action";

import { useToast } from '@chakra-ui/react'
import { 
  loginUser,
  registerUser,

} from "../../services/auth.services";
import { BASE_URL } from "../../config/api_config/constants";
import RequestLoader from "../../views/components/RequestLoader"

 const LoginSignUp = ({ auth: {isAuthenticated, user , prevPath }, login, logOut, setPrevPath }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
 const toastedBread = useToast()
  const router = useRouter();
 if(isAuthenticated && user.hasOwnProperty("token")){
    router.push('/dashboard')
 }
  
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


    /*functionality feature login signup */
  


  const [loading, setLoading] = useState(false);
  const initialValues = { email: "", password: "" };
  const initialRegValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    password:""
  };

  

  
  const handleSubmit = async (values, { setSubmitting }) => {
       setLoading(true);
       console.log(values.email,values.password)

      
        var data = {
          email: values.email,
          password:values.password
        };

        try{
          let res = await loginUser(data);
          //dispatch the redux action
          console.log(res)
          login(res);
           router.push('/dashboard')
          //  if(typeof window!=undefined){
          //   window.location.href="/dashboard"
          // }
        }catch(error){
          console.log(error)

          if(error){
            

                toastedBread({
                  title: 'An error occurred.',
                  description: "Invalid credentials. Try again or signup to create an account if an account dont exist.", //error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })


          }else{
            

            toastedBread({
              title: 'An error occurred.',
              description: 'Invalid credentials. User dont exists',
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          }
        
            logOut();
            setSubmitting(false);
            setLoading(false);
        }


    
  };


  


  //register

const prevalidate = (setSubmitting)=>{
    let validated = false;
    let gmail_regex =/[a-zA-Z0-9]\.[a-zA-Z0-9]@gmail\.com/
    let email_regex =/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.!%-]{1,64}|)|\"[a-zA-Z0-9.!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-](.[a-z]{2,}|.[0-9]{1,})$/
    let passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})");
    const initial = {
        email: document.getElementById("emailuser").value,
        password: document.getElementById("passworduser").value,
        firstName: document.getElementById("lastnameuser").value,
        lastName: document.getElementById("lastnameuser").value,
        confirmPassword: document.getElementById("cpassword").value,
      }
      let showErrorOnce = false

      console.log(initial)

      Object.keys(initial).forEach(keys=>{
        console.log(keys)
         if(initial[keys].length<=0){
           showErrorOnce =true 
           if(showErrorOnce){
             showErrorOnce=false
             

             toastedBread({
                  title: 'An error occurred.',
                  description: "Please fill out the blank fields", //error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
             setSubmitting(false);
              setLoading(false);
             return false
           }
          
         }
         

         //check password match
         if(keys=="password"){
            


           if(!initial[keys].match(passwordRegex)){
               showErrorOnce =true 
               if(showErrorOnce){
                 showErrorOnce=false
                 // toast.error("Please use a strong password . Password should contain One capital letter, and atleast a minimum of 8 alphanumeric digits and other symbols ")
                 

                  toastedBread({
                  title: 'An error occurred.',
                  description: "Please use a strong password . Password should contain One capital letter, and atleast a minimum of 8 alphanumeric digits and other symbols ", //error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })

                 setSubmitting(false);
                 setLoading(false);
                 return false
               }
           }
         }
      })

      return true
  }




  const handleSubmitRegistration = async  (values, { setSubmitting }) => {
   
 
   if(prevalidate(setSubmitting)){
       setLoading(true);
      try {
        
        await registerUser(values);
       // toast.success("We have sent a verification mail to your email.");
        


       toastedBread({
            title: 'An error occurred.',
            description: "Sign up was successful", //error.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
         
        setTimeout(() => {
          if(typeof window!=undefined){
            window.location.reload()
          }

          
        }, 2000);
        setSubmitting(false);
      } catch (err) {
        
        
       toastedBread({
            title: 'An error occurred.',
            description: err?.data?.message, //error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        setSubmitting(false);

      }
      setLoading(false);

    }
  };

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
                         <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (

                     <form
                          id="authenticate_anonymous_user"
                          className="form"
                          onSubmit={handleSubmit}
                          data-signin="authenticate_anonymous_user"
                          encType="application/x-www-form-urlencoded; charset=UTF-8"
                        >

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email"  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email} />
               <span className="login_input-msg">
                              {errors.email && touched.email && errors.email}
                            </span>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password"
               onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password} />
                   <span className="login_input-msg">
                              {errors.password && touched.password && errors.password}
                            </span>
               
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
               
                <Link onClick={(e)=>{handleRegisterDisplay(e)}} color={'blue.400'}>Don't have an account yet?Sign up.</Link>
              </Stack>
              <Button
              type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                {loading ? (
                              <RequestLoader />
                            ) : (
                              "Log In"
                            )}
              </Button>
            </Stack>
                </form>
                )}
                  </Formik>
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

               <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmitRegistration}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (

                     <form
                          id="form_reg"
                          className="form"
                          onSubmit={handleSubmit}
                        >
            <FormControl id="email">
              <FormLabel>First Name</FormLabel>
              <Input id="firstnameuser" type="text"  name="firstName" placeholder="First name"
                   
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firstName}/>
               <span className="login_input-msg">
                              {errors.firstName && touched.firstName && errors.firstName}
                            </span>
            </FormControl>

            <FormControl id="email">
              <FormLabel>Last Name</FormLabel>
              <Input id="lastnameuser" type="text" name="lastName" placeholder="Last name"
                    
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastName}/>
               <span className="login_input-msg">
                              {errors.lastName && touched.lastName && errors.lastName}
                    </span>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input id="emailuser" type="email"  placeholder="name@example.com"
                    name="email"
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email} />
                 <span className="login_input-msg">
                              {errors.email && touched.email && errors.email}
                            </span>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input id="passworduser" type="password"  placeholder="Password"
                    name="password"
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}/>
                               <span className="login_input-msg">
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </span>
            </FormControl>

             <FormControl id="password">
              <FormLabel>Confirm Password</FormLabel>
              <Input id="cpassword" name="confirmPassword" 
              type="password"  placeholder="Password"
                    
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmPassword}  />

               {errors.confirmPassword &&
                                touched.confirmPassword &&
                                errors.confirmPassword}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
               
                <Link onClick={(e)=>{handleLoginDisplay(e)}} color={'blue.400'}>Already have an account?Sign in.</Link>
              </Stack>
              <Button
              type="submit"
              
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                {loading ? (
                          <RequestLoader />
                        ) : (
                          "Register"
                        )}
              </Button>
            </Stack>

              </form>
             )}
              </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>



    </>
  );
}










LoginSignUp.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  setPrevPath: PropTypes.func.isRequired,

};



const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login,
  setPrevPath,
  logOut,
})(LoginSignUp);

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});



var passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
//var passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})");

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name Required"),
  email: Yup.string()
    .email("Invalid email")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Valid Email Required"),
  password: Yup.string()
    .min(8, "Minimum of eight characters!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(
      passwordRegex,
      "Password must contain One letter, One Number with a minimum of eight characters"
    ),
  confirmaPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
 
});


