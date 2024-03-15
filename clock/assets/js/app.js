const hours=document.getElementById("hours");
const minutes=document.getElementById("minutes");
const seconds=document.getElementById("seconds");
const formAlarm=document.getElementById("form_alarm");
let isPermitNotification=false;
let isCreatedNotification=false;
let notificationConter=0;


document.addEventListener("DOMContentLoaded", function() {
    if("Notification" in window){
        Notification.requestPermission((requestPermission)=>{
            isPermitNotification=requestPermission==="granted";
            
            if(!isPermitNotification){
                // const input=formAlarm.children[0];
                // const button=formAlarm.children[1];
                [input,button]=formAlarm.children;
                
                // console.log(input,button);
                
                input.value="";
                input.disabled=true;
                button.disabled=true;
            }
            
        });
               

    }

    if(localStorage.getItem("alarma")!==null){
        const input=formAlarm.children[0];
        const alarm=new Date(localStorage.getItem("alarma"));
        input.value=formatNumber(alarm.getHours())+":"+formatNumber(alarm.getMinutes());    
    }
    
    getCurrentTime();
});

setInterval(function(){
    getCurrentTime();
},1000);

formAlarm.addEventListener("submit" , function(event) {
    event.preventDefault();
    
    const formData=new FormData(event.currentTarget);
    const value=formData.get("time");

     if(value===null || value===""){
         alert("Seleccione una hora precisa");
     } else{
         console.log(value);
     }

     let alarmHours=parseInt(value.substring(0,2));
     let alarmMinutes=parseInt(value.substring(3));

     const current_date=new Date();
     const setAlarm=new Date();

     const lasHorasSonMenores=alarmHours<current_date.getHours();
     const lasHorasSonIguales=alarmHours===current_date.getHours();
     const losMinutosSonMenoresOIguales=alarmMinutes<=current_date.getMinutes();

     if(lasHorasSonMenores || (lasHorasSonIguales && losMinutosSonMenoresOIguales)){  
         setAlarm.setUTCDate(setAlarm.getDate()+1);
    } 

    setAlarm.setHours(alarmHours);
    setAlarm.setMinutes(alarmMinutes);
    setAlarm.setSeconds(0);

    localStorage.setItem("alarma",setAlarm.toString());
} );

const showAlarm= ()=>{

    if(isPermitNotification && localStorage.getItem('alarma')!==null){

        const currenTime=new Date();
        const alarm=new Date(localStorage.getItem('alarma'));

        const isTheSameDate=currenTime.getDate()===alarm.getDate();
        const isTheSameHour=currenTime.getHours()===alarm.getHours();
        const isTheSameMinutes=currenTime.getMinutes()===alarm.getMinutes();
      

        if(isTheSameDate && isTheSameHour && isTheSameMinutes && notificationConter<10){
            const interval=setInterval(()=>{
                new Notification("This is the alarm");

                notificationConter++;
            },5000); 
            
            if(notificationConter>=9){
                clearInterval(interval);
                formAlarm.children[0].value="";
                localStorage.removeItem("alarma");
                notificationConter=0;
            }
    
        }

       
    // new Notification("Test!!!",{
    //     body:"This is a test of notification"
    // });
    }
}

function getCurrentTime(){
    showAlarm();
    

    const current_date=new Date();
    
    const current_hours=current_date.getHours();
    const current_minutes=current_date.getMinutes();
    const current_seconds=current_date.getSeconds();

    hours.innerText=formatNumber(current_hours);
    minutes.innerText=formatNumber(current_minutes);
    seconds.innerText=formatNumber(current_seconds);
}

function formatNumber(value) {
    if (value<10)
        return "0"+value;
    return value;
}
