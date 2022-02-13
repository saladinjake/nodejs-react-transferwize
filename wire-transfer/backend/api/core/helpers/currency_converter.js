const axios = require("axios")
const cheerio = require("cheerio")
//usage //Then instantiate with either the empty constructor

//let currencyCConverter = new CurrencyConverter()
//
//currencyCConverter.from("USD").to("NGN").amount(10).convert()
class CurrencyConverter { 
    constructor(datas) {
        this.currencyFrom = ""
        this.currencyTo = ""
        this.currencyAmount = 1
        this.convertedValue = 0
        this.isDecimalComma = false
        this.passing = true;
        this.currencies = {
          "NGN": "Nigerian Naira",
          "USD": "United States Dollar",
          "EUR": "Euro",
        
        }
        this.errMessage ="";
        this.currencyCode = ["NGN", "USD", "EUR"];

        if(datas != undefined && this.testForEmptyStringInput(datas)){
            if(typeof datas["from"] == 'string' && datas["from"] !== undefined)
                this.from(datas["from"])
            if(typeof datas["to"] == 'string' && datas["to"] !== undefined)
                this.to(datas["to"])
            if(typeof datas["amount"] == 'number' && datas["amount"] !== undefined)
                this.amount(datas["amount"])
            if(typeof datas["isDecimalComma"] == 'boolean' && datas["isDecimalComma"] !== undefined)
                this.setDecimalComma(params["isDecimalComma"])
        }

    }

    testForEmptyStringInput(datas) {
        let check = Object.values(datas);
        check = check.every(data => data !== '');
        if (!check) {
          this.passing = false;
          this.errMessage = 'Input fields must not be empty';
          return false
        }
        return true

      }


    from (currencyFrom) {
        if(typeof currencyFrom !== "string")
            throw new TypeError("currency code should be a string")
        if(!this.currencyCode.includes(currencyFrom.toUpperCase()))
            this.errMessage= `${currencyFrom} is not a valid currency code`
        this.currencyFrom = currencyFrom.toUpperCase()
        return this
    }
    to (currencyTo) {
        if(typeof currencyTo !== "string")
            this.errMessage= "currency code should be a string"
        if(!this.currencyCode.includes(currencyTo.toUpperCase()))
            this.errMessage= `${currencyTo} is not a valid currency code`
        this.currencyTo = currencyTo
        return this
    }
    amount (currencyAmount){
        if(typeof currencyAmount !== "number")
            this.errMessage="amount should be a number"
        if(currencyAmount <= 0)
           this.errMessage= "amount should be a positive number"
        this.currencyAmount = currencyAmount
        return this
    }

    setDecimalComma (isDecimalComma){
        if(typeof isDecimalComma !== "boolean")
            this.errMessage="isDecimalComma should be a boolean"
        this.isDecimalComma = isDecimalComma
        return this
    }

    webScraper = async () => {
         const html = await axios.get(`https://www.google.co.in/search?q=${this.currencyAmount}+${this.currencyFrom}+to+${this.currencyTo}`);
         const $ = await cheerio.load(html.data);
         let val=  $(".iBp4i").text().split(" ")[0]
         console.log(val);
         return val;
       
        }

    rates(){
        if(this.currencyFrom === this.currencyTo)
            return new Promise((resolve, _) => {resolve(this.currencyAmount) })
        else    
           return this.webScraper()
           
    }

    convert(currencyAmount){
        if(currencyAmount !== undefined){
            this.amount(currencyAmount)
        }
        if(this.currencyFrom == "")
            throw new Error("currency code cannot be an empty string")
        if(this.currencyTo == "")
            throw new Error("currency code cannot be an empty string")
        if(this.currencyAmount == 0)
            throw new Error("currency amount should be a positive value")
        const givenVlue = this.rates()
        
        return givenVlue

    }

    currencyName(currencyCode_){
        if(typeof currencyCode_ != "string")
            throw new TypeError("currency code should be a string")
        if(!this.currencyCode.includes(currencyCode_.toUpperCase()))
            throw new Error(`${currencyCode_} is not a valid currency code`)
        return this.currencies[currencyCode_]
    }
  }







module.exports = CurrencyConverter