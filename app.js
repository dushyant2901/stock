const buyPrice = document.querySelector("#buy-price");
const quantity = document.querySelector("#quantity");
const currentPrice = document.querySelector("#current-price");
const calculate = document.querySelector("#calculate");
const output = document.querySelector("#output");
const nxtBtn1 = document.querySelector("#next1");
const nxtBtn2 = document.querySelector("#next2");
const label = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');
console.log(label)

calculate.addEventListener("click", clickHandler);

function clickHandler() {
    if (validateInputs(inputs[2])) {

        let buyPriceValue = Number(buyPrice.value)
        let currentPriceValue = Number(currentPrice.value)
        let quantityOfStocks = Number(quantity.value)


        //console.log(calculatePnL()) This is executing loss statement twice irrespective of what Pnl is
        let [data, color] = calculatePnL(buyPriceValue, quantityOfStocks, currentPriceValue);
        showOutput(data, color);
        show([output])
    }
    else{
        show([output]);
        output.textContent = `Input field can't be empty `
    }
}

function calculatePnL(boughtPrice, boughtQuantity, curPrice) {

    let PnL;
    let color;


    if (curPrice > boughtPrice) {

        let profit = (curPrice - boughtPrice);
        let overallProfit = (curPrice - boughtPrice) * boughtQuantity;
        let profitPercentage = ((profit / boughtPrice) * 100).toFixed(2);

        PnL = `The profit is of +${overallProfit} Rupees and the Percentage Gain is ${profitPercentage} %`
        color = "green"
        //  output.innerHTML=PnL   --this was wrong cause there is no point of returning pnl if we have already showed it to the user the main functionality wa already finished better would have been if we have returned the output.innerhtml so as soon as the condition is fulfilled it would have stopped going to other branches and the best approach is what we have implemented is returning something from this and creating an output function to take parameter to show something and then calling this function in main clickhandler function passing its returned value to some variable and then passing that variable in showoutput function  
        return [PnL, color]
    } else if (boughtPrice > curPrice) {
        let loss = (boughtPrice - curPrice);
        let overallLoss = (boughtPrice - curPrice) * boughtQuantity;
        let lossPercentage = ((loss / boughtPrice) * 100).toFixed(2)
        PnL = `The loss is of -${overallLoss} Rupees and the Percentage Loss is ${lossPercentage} %. `
        //  output.innerHTML=PnL
        color = "red"
        return [PnL, color]
    } else {
        PnL = `No Profit No Loss`
        color = "brown"
        // return [PnL,color]  activating it was blocking last return value and the reason i svey simple that in the end there can be only one return statement so either use it in else one or out of of it  
    }

    return [PnL, color]
    // output.innerHTML=PnL


}


function showOutput(data, color) {
    output.innerHTML = data;
    output.style.color = color;
}

function hide(elem) {
    elem.forEach(element => {

        element.style.display = 'none'
    }
    );


}
function show(elem) {
    elem.forEach(element => {

        element.style.display = 'flex'
    }
    );

}

nxtBtn1.addEventListener('click', () => {
    if (validateInputs(inputs[0])) {
        show([label[1], nxtBtn2])
        hide([nxtBtn1, output])
    }
    else {
        show([output]);
        output.textContent = `Input field can't be empty `
    }

})
nxtBtn2.addEventListener('click', () => {
    if (validateInputs(inputs[1])) {
        show([label[2], nxtBtn2, calculate])
        hide([nxtBtn2])
    }
    else {
        show([output]);
        output.textContent = `Input field can't be empty `
    }

})

window.addEventListener("load", () => {
    hide([label[1], label[2], nxtBtn2, calculate, output])
})

function validateInputs(param) {
    if (param.value !== '') {
        return true
    }
    return false
}

