
//variable names with menu container class as the value
const humburger = document.querySelector('.humburger-Menu');
const hiddenMenu = document.querySelector('.hidden-Menu');
const sliderArrowOne = document.querySelector(".rightArrowButton")
const sliderArrowTwo = document.querySelector('.leftArrowButton');
const menuOne = document.querySelector('.orderN');
const menuTwo = document.querySelector('.orderNTwo');

//addeventlistener enable active class once element is clicked turning burger menu into an x
humburger.addEventListener('click', () =>{
    humburger.classList.toggle('active');
    hiddenMenu.classList.toggle('active');
})
//addeventlistener enable active class once element is clicked moving the packge section
sliderArrowTwo.addEventListener('click',() =>{
    menuOne.classList.toggle('active');
    menuTwo.classList.toggle('active');
    

})
//addeventlistener enable active class once element is clicked moving the packge section
let checkClick = false 
sliderArrowOne.addEventListener('click',(click) =>{
    menuOne.classList.toggle('active');
    menuTwo.classList.toggle('active');
    checkClick = true

})

function checkIfElementClicked(element,bool){
    if (bool === true){
        return
    }

    else{
        element.addEventListener("touchstart",() => {
            menuOne.classList.toggle('active');
            menuTwo.classList.toggle('active');
        })
    }

}

checkIfElementClicked(menuOne,checkClick)
checkIfElementClicked(menuTwo,checkClick)


/*menuTwo.addEventListener("touchmove",touchMove =>{
    touchMove.preventDefault()
    let motionDesignPackage = document.getElementById("orderNTwo")
    let touchLocationX = touchMove.changedTouches["0"].pageX
    console.log(motionDesignPackage.style.left)
    motionDesignPackage.style.left =  `${touchLocationX/3}rem`
    console.log(touchMove.changedTouches["0"].pageX)
    //menuOne.classList.toggle('active');
    //menuTwo.classList.toggle('active');
})*/

