/*
*@companyName: SIMBA
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: config variables 
*@params:
*@usage:
*/
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ?  "https://transferwise-apitest.herokuapp.com/api/v1/"  
    : "https://transferwise-apitest.herokuapp.com/api/v1/"
export const PRIVATE_KEY_ENCRYPTER_1= "73287)(&(^%$%#%&32dhsuidsop)*%#%^^&"
export const  PRIVATE_KEY_ENCRYPTER_2="(&*$#$$^HGHDG(**^&thjhfikl0(^^3543%%&67)))"
export const MICROSERVICE_FRONT1="https://transferwiz.vercel.app/"

/*The issuing bonus amout company profile in the user account with a well funded account*/
/*SIMBA MUST BE TOO GENEROUS TO GIVE 1000 USD ON SIGN UP*/
export const SIMBA_COMPANY_ID = 4;
export const SIMBA_COMPANY_EMAIL ="simba@gmail.com"
export const BONUS_AMOUNT = 1000.00;
export const SIMBA_ACCOUNT_NUMBER = 2225137327