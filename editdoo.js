
//variable names with menu container class as the value
const humburger = document.querySelector('.humburger-Menu');
const hum = document.querySelector(".hum")
const hiddenMenu = document.querySelector('.hidden-Menu');
const sliderArrowOne = document.querySelector(".rightArrowButton")
const sliderArrowTwo = document.querySelector('.leftArrowButton');
const menuOne = document.querySelector('.orderN');
const menuTwo = document.querySelector('.orderNTwo');
let checkClick = false 

//addeventlistener enable active class once element is clicked turning burger menu into an x
humburger.addEventListener('click', () =>{
    humburger.classList.toggle('active');
    hiddenMenu.classList.toggle('active');
    hum.classList.toggle("active");
})
//addeventlistener enable active class once element is clicked moving the motion design package section
sliderArrowTwo.addEventListener('click',() =>{
    menuOne.classList.toggle('active');
    menuTwo.classList.toggle('active');
    checkClick = true

})

//addeventlistener enable active class once element is clicked moving the video editing packge section
sliderArrowOne.addEventListener('click',() =>{
    menuOne.classList.toggle('active');
    menuTwo.classList.toggle('active');
    checkClick = true

})

const playButton = document.querySelector('.playButton');
const pauseButton = document.querySelector('.pauseButton');
const phoneVideo = document.querySelector('.phoneVideo');
playButton.addEventListener('click',() =>{
    phoneVideo.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
    
    
})

pauseButton.addEventListener('click',() =>{
    phoneVideo.pause();
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
    
})

function VideoTimline(video){

  

}

const groupOfVideos = [{
    _name: phoneVideo,
    _duration: 18.87,
    _startTimer: document.getElementById('timerStart'),
    _endTimer: document.getElementById('timerEnd'),

    get duration(){
        return this._duration
    },

    get name(){
        return this._name
    },

    get startTimer(){
        return this._startTimer
    },

    get endTimer(){
        return this._endTimer
    }

}]

function updateEndDuration(video){
    let videoDuration = video.duration;
    function convertToSecFormat(video){
    let inMin = (video / 100).toFixed(2);
    console.log(inMin);
    let arrayOfSec = [...inMin];
    console.log(arrayOfSec);
    let convertedSeconds = "";
    for(let i = 0; i < arrayOfSec.length; i++)
    {
        if (arrayOfSec[i] === '.'){

            arrayOfSec[i] = ":";
        }

        convertedSeconds += arrayOfSec[i];

    

    
    }
    return convertedSeconds;

}

    video.name.onplaying = () => {
        setInterval(()=>{
            video.startTimer.innerHTML = `${video.name.currentTime}`;
        },1000)

    }
    video.endTimer.innerHTML = convertedSeconds;

}


updateEndDuration(groupOfVideos[0])



const whiteBarline = document.querySelector('.timeLineBarWhite');
const blueBarline = document.querySelector('.timeLineBarBlue');
const circle = document.querySelector('.circle');
const circleCor = circle.getBoundingClientRect().right;
const whiteBarlineCor = whiteBarline.getBoundingClientRect().right;
const totalPixels = whiteBarlineCor - circleCor;
let mouseCordinates = 0
document.querySelector(".playBarLine").addEventListener('click',(event) => {
    mouseCordinates = event.clientX
    circle.style.left = `${((mouseCordinates - circleCor) / totalPixels )* 100}%`
    groupOfVideos[0].name.currentTime = groupOfVideos[0].duration *((((mouseCordinates - circleCor) / totalPixels )* 100)/ 100);
    blueBarline.style.transform = `scaleX(${((mouseCordinates - circleCor) / totalPixels )* 101}%)`
    
    
})

circle.addEventListener('mousedown',() => {
  
})



console.log(whiteBarline.getBoundingClientRect())
console.log(circle.getBoundingClientRect())
   