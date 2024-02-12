const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll('.dropdown select');

const btn = document.querySelector("form button");

const fromCurr = document.querySelector('.from select');

const toCurr = document.querySelector('.to select');

const msg = document.querySelector('.msg')

// here we are converting a countryList into a individual options and adding in select

for(select of dropdowns){
    for(currCode in countryList){                  // yeh jaako countryList ise hame dropdowns me individually dalrin so 
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target)
    });

    // So, when a user changes the selection in the dropdown, the change event is triggered, and evt.target tells you exactly which dropdown was changed. It's like asking, "Hey, which dropdown did the user just interact with?" and evt.target provides the answer by pointing to that specific dropdown element.   
}

const updateFlag = (element) =>{      //element means select
let currCode = element.value;    //this means select.value (select ki value dropdown se user select karia so)
let countryCode = countryList[currCode];
let newSrcOfImg = `https://flagsapi.com/${countryCode}/flat/64.png`
//flag me hame countryCode dalna so usse hame currCode kya hai leko then usse countryCode liye so
let oldImg = element.parentElement.querySelector('img');   // element means select ka parent element me jaako img ku pakde so
oldImg.src = newSrcOfImg;
}

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault(); 

    // preventDefault is nothing but it will prevent all the default behaviours of the button
    // example : button ku click kare flags change karko upper url me changes hoti use hame rokdale hame khud modify karko deti (niche ka code me modify karrin so)
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
let response = await fetch(URL) ; 
console.log("mera response", response); // this will give the response in console browser
let data = await response.json(); // it will return the second promise (1st is fetch) in js objects method
console.log("mera data",data); 
console.log("miiii", result)
let rate = data[toCurr.value.toLowerCase()];  // eg : data[inr] because we are getting in uppercase to access again we need to use lowercase
let finalAmount = amtValue * rate ;  // eg 1 (USD) * 80 (INR)
                    
msg.innerText = `${amtValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`;  // eg 1USD = 80INR
});

