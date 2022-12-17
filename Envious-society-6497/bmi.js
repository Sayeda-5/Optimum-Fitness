
function calculateBMI(){
    let height = document.getElementById("height").value
    let weight = document.getElementById("weight").value
    let weightError = document.getElementById("error-weight")
    let heightError = document.getElementById("error-height")
    let bmiResult = document.getElementById("bmi-result")

    if(height && weight){
        let value = (weight / ((height*height)/10000)).toFixed(2)
        let bmiText;
        console.log(value)
        weightError.innerText = ""
        heightError.innerText = ""
        if(value < 18.6){
            bmiText = "Underweight"
        }
        else if(value >= 18.6 && value < 24.9){
            bmiText = "Normal"
        }
        else{
            bmiText = "Overweight"
        }
        bmiResult.innerHTML = `<i>Your BMI is: ${value} and you are ${bmiText}</i>`
    }
    else if(!height && weight){
        weightError.innerText = ""
        heightError.innerText = "Plese Enter this"
    }
    else if(height && !weight){
        weightError.innerText = "Plese Enter this"
        heightError.innerText = ""
    }
    else{
        weightError.innerText = "Plese Enter this"
        heightError.innerText = "Plese Enter this"
    }
}