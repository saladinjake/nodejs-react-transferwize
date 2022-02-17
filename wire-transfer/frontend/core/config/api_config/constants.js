/*
*@companyName: Questence
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: config variables 
*@params:
*@usage:
*/
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ?  "http://gapslmsservices.herokuapp.com"  
    : "https://gapslmsservices.herokuapp.com"

export const PRIVATE_KEY_ENCRYPTER_1= "73287)(&(^%$%#%&32dhsuidsop)*%#%^^&"
export const  PRIVATE_KEY_ENCRYPTER_2="(&*$#$$^HGHDG(**^&thjhfikl0(^^3543%%&67)))"
export const MICROSERVICE_FRONT1="http://lms.8aade.net/"
export const BASE_URL_ENROLLMENT ="https://questence.tqfe.net/api/v1"