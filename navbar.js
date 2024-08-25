

function navbar(){
    //variable names with menu container class as the value
    const humburger = document.querySelector('.humburger-Menu');
    const hum = document.querySelector(".hum")
    const hiddenMenu = document.querySelector('.hidden-Menu');
    const main = document.querySelector(".main")
    let count = 0;
    //addeventlistener enable active class once element is clicked turning burger menu into an x
    humburger.addEventListener('click', () =>{
        humburger.classList.toggle('active');
        hiddenMenu.classList.toggle('active');
        hum.classList.toggle("active");
       if(count === 0){
        main.style.display = "none";
        count+=1
       }

       else if(count ===1){
        main.style.display = "block";
        count = 0;
       }
    })}

export default navbar

