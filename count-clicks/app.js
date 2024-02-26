// //number
// let x = 1;
// let y = 10;

// //string
// let name="ASDQWE";
// let name_1='ASDQWE';
// let name_2=`ASDQWE
//             asdqwe
//             asdqwe`;

// //Boolean
// let a = true;
// let b = false;

// let min_number = 1 < 0;

// let button = document.getElementById("btn");
// window.navigator

// console.log(button);

// function es_primo(n=Number){
//     if(n<=1)
//         return false;
    
//     for(let i=2; i < n ;i++){
//         if(n%i===0){
//             return false;
//         }
//     }

//     return true;
// }

// function imp_primos(){
//     for (let i=2;i<=100;i++)
//     {
//         if(es_primo(i))
//         {
//             console.log(i);
//         }
//     }
// }

// imp_primos();

// function imp_primeros_100_primos(){
//     let n_primos=0;
//     let n=2;
//     while(n_primos<100){
//         if(es_primo(n)){
//             n_primos++;
//             console.log(n_primos+" : "+n);
//         }
//         n++;
//     }
// }
// imp_primeros_100_primos();

const clicks = document.getElementById('clicks');
const btn_increment = document.querySelector(".btn-primary");
const btn_decrement = document.querySelector(".btn-secondary");
const btn_reset = document.querySelector(".btn-reset");

let counter=0;

btn_increment.onclick = function(){
    counter++;
    clicks.innerText=counter;
};

btn_decrement.onclick =()=>{
    counter--;
    clicks.innerText=counter;
};

btn_reset.onclick = function(){
    counter=0;
    clicks.innerText=counter;
};