
//variable names with menu container class as the value
const humburger = document.querySelector('.humburger-Menu');
const hiddenMenu = document.querySelector('.hidden-Menu');
const sliderArrowOne = document.querySelector(".rightArrowButton")
const sliderArrowTwo = document.querySelector('.leftArrowButton');
const menuOne = document.querySelector('.orderN');
const menuTwo = document.querySelector('.orderNTwo');
//addeventlistener enable active class once element is clicked
humburger.addEventListener('click', () =>{
    humburger.classList.toggle('active');
    hiddenMenu.classList.toggle('active');
})
//addeventlistener enable active class once element is clicked
sliderArrowTwo.addEventListener('click',() =>{
    menuOne.classList.toggle('active');
    menuTwo.classList.toggle('active');
    

})
//addeventlistener enable active class once element is clicked
sliderArrowOne.addEventListener('click',() =>{
    menuOne.classList.toggle('active');
    menuTwo.classList.toggle('active');

})