const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"


// here above we are just checking in console

// for(codes in countryList){
//     console.log(codes , countryList[codes]);  // currencycode , countrycode
// }  



const dropdowns = document.querySelectorAll('.dropdown select'); // dropdown k ander select

const btn = document.querySelector("form button");

const fromCurr = document.querySelector('.from select');

const toCurr = document.querySelector('.to select');

const msg = document.querySelector('.msg')

for(select of dropdowns){
    for(currCode in countryList){
        let optionNew = document.createElement('option');
        optionNew.innerText = currCode;                                
        optionNew.value = currCode;                                  
        if(select.name ==="from" && currCode ==="USD"){
            optionNew.selected = "selected";
        }
        else if(select.name ==="to" && currCode ==="INR"){
            optionNew.selected = "selected";
        }
        select.append(optionNew);
    }
    select.addEventListener("change", (evt)=>{
        upDateFlag(evt.target);

    });
}

 const upDateFlag = (element) =>{   //(element) means select
let currCode = element.value;        // this means select.value
// console.log("samajna",currCode);
let countryCode = countryList[currCode]                                // eg: countryList[INR] = IN 
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
let img = element.parentElement.querySelector('img');
img.src = newSrc;
}


btn.addEventListener("click", async(evt)=>{
evt.preventDefault();
let amount = document.querySelector('.amount input');
let amtValue = amount.value;
if(amtValue === " "  || amtValue < 1){
    amtValue = 1;
    amount.value = "1";
}

// the below url will return the exchange rate

const URL  = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;  
   // INR USD 
// converting to lowercase (inr usd) because the url needs the values in lowercase
let response = await fetch(URL);
let data = await response.json();
let rate = data[toCurr.value.toLowerCase()];  // because we are getting in lowercase to access again we need to use lowercase
let finalAmount = amtValue * rate;  // eg 1 (USD) * 80 (INR)
                    
msg.innerText = `${amtValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`;  // eg 1USD = 80INR
})
