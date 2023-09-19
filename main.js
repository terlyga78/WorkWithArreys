const Cards = document.querySelector(".cards");
const Selection = document.getElementById('Selection');

const parametrs = { 
    colorGreenValue: false,
    colorBlueValue: false,
    colorRedValue: false,
    minCostValue: 0,
    maxCostValue: 0,
    actionValue: false,
    sort: 'no',
}
               
const cardsArrey = [
    { hot: true, name: "Повітряна куля", action: true, color: "Зелений", cost: 10, },
    { hot: false, name: "Повітряна куля", action: false, color: "Зелений", cost: 2, },
    { hot: false, name: "Хустка", action: false, color: "Червоний", cost: 20, },
    { hot: false, name: "М`яч", action: false, color: "Синій", cost: 40, },
    { hot: false, name: "М`яч", action: false, color: "Червоний", cost: 2, },
    { hot: false, name: "М`яч", action: false, color: "Червоний", cost: 2.5, },    
]

function returnArrey(cardsArrey, parametrs){   

    let copyCardsArrey = [];

    if (!parametrs.actionValue && !parametrs.colorGreenValue && !parametrs.colorBlueValue 
        && !parametrs.colorRedValue && (parametrs.minCostValue === 0) && (parametrs.maxCostValue === 0))
    {
        return SortArrey([...cardsArrey], parametrs.sort);   
    }

    cardsArrey.forEach(element => {
        if (parametrs.actionValue && !element.action){
            return;            
        }
        if (parametrs.minCostValue > 0 && element.cost < parametrs.minCostValue){
            return;            
        }
        if (parametrs.maxCostValue > 0 && element.cost > parametrs.maxCostValue){
            return;            
        }
        if (!parametrs.colorGreenValue && !parametrs.colorBlueValue && !parametrs.colorRedValue){     
            copyCardsArrey.push(element); 
            return;
        }
        if ((parametrs.colorGreenValue && element.color === "Зелений")
            || (parametrs.colorBlueValue && element.color === "Синій")
            || (parametrs.colorRedValue && element.color === "Червоний")){            
            return copyCardsArrey.push(element);    
            }
        }
    )   
    return SortArrey(copyCardsArrey, parametrs.sort);
}

function SortArrey(arrey, sortOption = 'no'){
    if (sortOption === 'no'){
        return arrey;
    } else if (sortOption === 'cheaperFirst'){
        return arrey.sort(function (a, b) {
            if (a.cost > b.cost) {
              return 1;
            }
            if (a.cost < b.cost) {
              return -1;
            }
            return 0;
          });
    } else if (sortOption === 'expensiveFirst'){
        return arrey.sort(function (a, b) {
            if (a.cost < b.cost) {
              return 1;
            }
            if (a.cost > b.cost) {
              return -1;
            }
            return 0;
          });  
    } 
}
  
function showCards(cardsArre){
    let innerText = "";
     cardsArre.forEach(element => {
        let labelHot = (element.hot) ? `<img src="./images/hotPrice.png" alt="" class="labelHot">` : ``;
        let labelAction = (element.action) ? `<img src="./images/action.png" alt="" class="labelAction">` : ``;

        innerText = innerText + `<div class="card"> ${labelHot} ${labelAction} 
        <p>
            Назва: ${element.name}
        </p> 
        <p>
            Колір: ${element.color}
        </p> 
        <p>
            Ціна: ${element.cost}
        </p>
        </div>`;            
     });
   
     Cards.innerHTML = innerText;    

}

refreshCards(); 

document.getElementById('checkBoxGreen').addEventListener('click', ()=>{
    parametrs.colorGreenValue = checkBoxGreen.checked; 
    refreshCards();    
})

document.getElementById('Sort').addEventListener('change', ()=>{
    parametrs.sort = document.getElementById('Sort').value;
    refreshCards(); 
})

document.getElementById('checkBoxBlue').addEventListener('click', ()=>{
    parametrs.colorBlueValue = checkBoxBlue.checked; 
    refreshCards(); 
})

document.getElementById('checkBoxRed').addEventListener('click', ()=>{
    parametrs.colorRedValue = checkBoxRed.checked;
    refreshCards(); 
})

document.getElementById('checkBoxAction').addEventListener('click', ()=>{
    parametrs.actionValue = checkBoxAction.checked; 
    refreshCards(); 
})

document.getElementById('minCost').addEventListener('change', ()=>{
    parametrs.minCostValue = document.getElementById('minCost').value; 
    refreshCards(); 
})

document.getElementById('maxCost').addEventListener('change', ()=>{
    parametrs.maxCostValue = document.getElementById('maxCost').value; 
    refreshCards();    
})

function refreshCards(){
    showCards(returnArrey(cardsArrey, parametrs));  
}

document.getElementById('Menu').addEventListener('click', ()=>{
    if (Selection.style.display === 'none'){
        Selection.style.display = 'block';    
    } else {
        Selection.style.display = 'none';
    }

})
