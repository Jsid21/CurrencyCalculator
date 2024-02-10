import {list} from "./country.js";
const apiaddr = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
// usd/inr.json
const flag_addr = "https://flagsapi.com/IN/flat/64.png";
let amounttag = document.querySelector("#amtinput input");


let selects = document.querySelectorAll(".countries");
for(let code in list){

    for(let val of selects){

        let el = document.createElement("option");
        val.appendChild(el);
        el.innerText = code;
        el.value = code;
        if(val.name === "from" && code === "USD"  ){
            el.selected = true;
        }
        if(val.name === "to" && code === "INR"  ){
            el.selected = true;
        }
    }
}
console.dir(list[selects[1].value]);
for( let sel of selects){
    sel.addEventListener("change", (event)=>{
        updateflags(event.target);
    });
}

function updateflags(element){
    let countrycurrency = element.value;
    let countrycode = list[countrycurrency];
    // console.log(element.parentElement);
    let imag = element.parentElement.querySelector("span img");
    let newurl = `https://flagsapi.com/${countrycode}/flat/64.png`
    imag.src = newurl;

}

let displaytag = document.querySelector("#convertDisplay");
console.dir(displaytag);

async function display(x){
    let childtags = displaytag.children;
    // let res = await x.json();
    console.log(x);
    childtags[0].innerHTML = `${amounttag.value} ${selects[0].value}`;
    childtags[2].innerHTML = `${x} ${selects[1].value}`;
}


let submitbtn = document.querySelector("#cnvrtbtn");
submitbtn.addEventListener("click",(eve)=>{
    // display(convert());
    convert();

})

function currcodes() {
    let codearr = [];
    for(let val of selects) {
        codearr.push(val.value.toLowerCase());
    }
    return codearr;
}

async function convert() {
    let amt = amounttag.value;
    let arr = currcodes();
    let newaddr = `${arr[0]}/${arr[1]}.json`;
    const path = apiaddr+newaddr;
    let response = await fetch(path);
    let a = await response.json();
    amt = amt * (a[arr[1]]);
    console.log(amt)
    display(amt.toFixed(2));
}