const baseUrl =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".message");

for(let select of dropDowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "From" && currCode === "USD") {
       newOption.selected = "selected";
      } else  if (select.name === "To" && currCode === "NPR") {
        newOption.selected = "selected";
       }
      select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    })
};

const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img")
   img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if(amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }
  const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
  let response = await fetch(URL);
  let data = await response.json()
  let rate = data[toCurr.value.toLowerCase()];      
  
  let finalAmount = amountValue * rate;
  msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
})