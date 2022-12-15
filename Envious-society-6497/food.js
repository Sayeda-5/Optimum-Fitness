let data=[];
nutrients.forEach(item=>item.value=0)
let options = document.getElementById("food-menu")
foods.forEach((food)=>{
    let optionElem = document.createElement("option")
    optionElem.innerText = food.description
    
    optionElem.value = JSON.stringify(food);
    options.append(optionElem)
   
})

selectedFoodTable([])


options.addEventListener("change", foodAddition)
function foodAddition(e){
    // console.log(e.target.value)
    let obj= JSON.parse(e.target.value)
    if(data.length>0 && data.some(item => item.id === obj.id)){
        let index = data.findIndex(item=>item.id===obj.id)
        data[index].alteredQuantity = data[index].alteredQuantity+obj.quantity
    }
    else{
    obj.alteredQuantity = obj.quantity
    data.push(obj)
    }
    postFood()
}
async function postFood(){
    let response = await fetch("https://json.extendsclass.com/bin/8051c1253011",
     {
       method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "78b6820d-7b96-11ed-8b32-0242ac110002"
        },
        body: JSON.stringify(data)
     })
     let resData = response.json()
     resData.then((res)=>{
        selectedData = JSON.parse(res.data)
        selectedFoodTable(selectedData);
        const collectedNutrients = []
        let selectedNutrients=[]
        selectedData.forEach(elem=>{
            collectedNutrients.push(...elem.nutrient_data)
        })
       collectedNutrients.forEach(item=>{
            if(!selectedNutrients.some(obj=>obj.nutrient===item.nutrient)){
                selectedNutrients.push(item)
            }
            else{
                let index = selectedNutrients.findIndex(obj=>obj.nutrient===item.nutrient)
                let object = {
                    nutrient: item.nutrient,
                    value: item.value + selectedNutrients[index].value
                }
                selectedNutrients[index] = object;
            }
        })
        nutrients.forEach(item=>collectedNutrients.forEach(elem=>{
            if(item.id===elem.nutrient){
                item.value = elem.value
                console.log(item.description, elem.value)
            }
        }))
        console.log(nutrients)
        
        nutrientsTable()
     })
}
nutrientsTable()


function selectedFoodTable(foods){
    document.querySelector(".selected-foods").innerHTML = foods.length>0?`
    <table>
    <tbody>
    ${foods.map((elem)=>{
        return ` <tr>
        <td>${elem.description}</td>
        <td>${Math.max(...elem.nutrient_data.map(obj=>obj.value))}</td>
        <td>${elem.alteredQuantity}</td>
      </tr>`
    }).join("")}
    </tbody>
    </table>
    `:`<div>Add Food to be diplayed here in your diary.</div>`
}

function nutrientsTable(){
    let half_length = Math.ceil(nutrients.length/2)
    let nutrients_left = nutrients.slice(0, half_length)
    let nutrients_right = nutrients.slice(half_length, nutrients.length)
    document.querySelector(".nutrients").innerHTML = `
    <div class="table-flex">
    <table>
    <tbody>
    ${nutrients_left.map((elem)=>{
        return ` <tr>
        <td>${elem.description}</td>
        <td>${elem.unit??"NA"}</td>
        <td>${elem?.value}</td>
      </tr>`
    }).join("")}
    </tbody>
    </table>
    </div>
    <div class="table-flex">
    <table>
    <tbody>
    ${nutrients_right.map((elem)=>{
        return ` <tr>
        <td>${elem.description}</td>
        <td>${elem.unit??"NA"}</td>
        <td>${elem?.value}</td>
      </tr>`
    }).join("")}
    </tbody>
    </table>
    </div>
    `
}


