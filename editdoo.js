
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

    function convertToSecFormat(videoTimerNumber){
        let inMin = (videoTimerNumber / 100).toFixed(2);
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

    let  interValTimer = undefined;
    video.name.addEventListener("playing", (click) => {
       
        interValTimer = setInterval(() => {

        if(video.name.currentTime === video.name.duration){
            playButton.style.display = 'flex';
            pauseButton.style.display = 'none';
        }
        
        let num =  video.name.currentTime;
        let currentTime = convertToSecFormat(num);
        video.startTimer.innerHTML = `${currentTime}`;
        let percentage = (num / videoDuration) * 100;
        circle.style.left = `${percentage}%`;
        blueBarline.style.width= `${percentage+1}%`;
        

            
            
        },1)
    })

    video.name.addEventListener("pause", (click) => {

      clearInterval(interValTimer)
    })
    let endNumber = convertToSecFormat(videoDuration)
    video.endTimer.innerHTML = endNumber;

    const whiteBarline = document.querySelector('.timeLineBarWhite');
    const blueBarline = document.querySelector('.timeLineBarBlue');
    const circle = document.querySelector('.circle');
    const circleCor = circle.getBoundingClientRect().right;
    const whiteBarlineCor = whiteBarline.getBoundingClientRect().right;
    const totalPixels = whiteBarlineCor - circleCor;
    let mouseCordinates = 0

   

    document.querySelector(".playBarLine").addEventListener('click',(event) => {
    mouseCordinates = event.clientX 
    console.log(mouseCordinates)
    groupOfVideos[0].name.currentTime = groupOfVideos[0].duration *((((mouseCordinates - circleCor) / totalPixels )* 100)/ 100);
    let currentTime = convertToSecFormat(groupOfVideos[0].duration *((((mouseCordinates - circleCor) / totalPixels )* 100)/ 100))
    video.startTimer.innerHTML = `${currentTime}`;
    let cordinates = ((mouseCordinates - circleCor) / totalPixels )* 100;
    if (cordinates <= 0){
        blueBarline.style.width = `0%`;
        circle.style.left = `0%`
    }

    else if (cordinates > 0 && cordinates <= 100){
        let copyOfMouscor = mouseCordinates - 2;
        blueBarline.style.width= `${((mouseCordinates - circleCor) / totalPixels )* 102}%`;
        circle.style.left = `${((copyOfMouscor - circleCor) / totalPixels )* 99.5}%`
    }
    console.log(cordinates);
        
        
    })

}


updateEndDuration(groupOfVideos[0])







groupOfVideos[0].name.muted = true;

console.log(whiteBarline.getBoundingClientRect())
console.log(circle.getBoundingClientRect())
