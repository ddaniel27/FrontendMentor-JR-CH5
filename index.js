let bill = document.getElementById('bill');
let people = document.getElementById('numPeople');
let customInput = document.getElementById("tipCustom");
let radio = document.getElementById("tip6");
let tipSelector = [...document.getElementsByClassName('tip-selector')];
let totalTip = document.getElementById('total-tip');
let totalPerson = document.getElementById('total-person');
let reset = document.getElementById('reset');

let myNumbers = {
    'bill': 0,
    'tip': 0,
    'people': 0
};


customInput.onclick = ()=>{
    radio.checked = true;
    myNumbers['tip'] = customInput.value !== ''? Number(customInput.value) : 0;
    calculateTotal();
}
customInput.oninput = ({target})=>{
    myNumbers['tip'] = Number(target.value);
    calculateTotal();
};

tipSelector.forEach(tip => {
    tip.addEventListener('change',()=>{
        if(tip.checked) {
            myNumbers['tip'] = Number(tip.value);
            calculateTotal();
        }
    })
});

bill.oninput = ({target})=>{
    myNumbers['bill'] =  Number(target.value);
    calculateTotal();
};
people.oninput = ({target})=>{
    myNumbers['people'] =  Math.floor(Number(target.value));
    calculateTotal();
};
people.onclick = ()=>{
    people.style.borderColor = 'var(--strong-cyan)'
}
people.addEventListener('focusout',()=>{
    if(people.value == '' || people.value == '0'){
        people.style.borderColor='red';
    }else{
        people.style.borderColor='transparent';
    }
});

reset.onclick = ()=>{
    bill.value = '';
    people.value = '';
    customInput.value = '';
    tipSelector.forEach(tip => tip.checked = false);
    myNumbers = {
        'bill': 0,
        'tip': 0,
        'people': 0
    };
    calculateTotal();
    people.style.borderColor='transparent';

}

function calculateTotal(){
    if(myNumbers['people'] === 0){
        totalTip.innerText = '$0.0';
        totalPerson.innerText = '$0.0';
    }else{
        let tip = (myNumbers['bill']*myNumbers['tip']/100)/myNumbers['people'];
        totalTip.innerText ='$' + tip.toFixed(2);
        totalPerson.innerText ='$' + ((myNumbers['bill']/myNumbers['people']) + tip).toFixed(2);

    }
}