function navbar(){
    //variable names with menu container class as the value
    const humburger = document.querySelector('.humburger-Menu');
    const hum = document.querySelector(".hum")
    const hiddenMenu = document.querySelector('.hidden-Menu');
    //addeventlistener enable active class once element is clicked turning burger menu into an x
    humburger.addEventListener('click', () =>{
        humburger.classList.toggle('active');
        hiddenMenu.classList.toggle('active');
        hum.classList.toggle("active");
    })}

export default navbar

