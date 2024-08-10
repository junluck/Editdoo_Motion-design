
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

//storing play and pause element button in variables
const playButton = document.querySelector('.playButton');
const pauseButton = document.querySelector('.pauseButton');
//storing video element in variable
const phoneVideo = document.querySelector('.phoneVideo');

//add event listener to play button and play video when clicked
playButton.addEventListener('click',() =>{
    phoneVideo.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
    
    
})

//add event listener to pause button and pause video when clicked
pauseButton.addEventListener('click',() =>{
    phoneVideo.pause();
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
    
})

class Video {
    constructor(video, duration){
        this._name = video;
        this._duration = duration;
        this._startTimer = document.getElementById('timerStart');
        this._endTimer = document.getElementById('timerEnd');
    }
        get duration(){
            return this._duration
        }
    
        get name(){
            return this._name
        }
    
        get startTimer(){
            return this._startTimer
        }
    
        get endTimer(){
            return this._endTimer
        }
    
    


}
const videoOneObject = new Video(phoneVideo, 18.87)
//group videos up and sort in array of objects
const groupOfVideos = [videoOneObject]

//store playback bar and  playback button in variables
const whiteBarline = document.querySelector('.timeLineBarWhite');
const blueBarline = document.querySelector('.timeLineBarBlue');
const circle = document.querySelector('.circle');
let circleCor = circle.getBoundingClientRect().right;
let whiteBarlineCor = whiteBarline.getBoundingClientRect().right;
let whiteBarlineCorLeft = whiteBarline.getBoundingClientRect().left;

//size of window screen stored in a variable
let screenWidth = window.screen.width;

//getting window width if window is resized
window.addEventListener('resize', () => {
    screenWidth = window.screen.width;
})

//intialializing mouseCordinates variable and assigning it to 0
let mouseCordinates = 0

//declaring a function that will upadte time of video and alow user to move play head to any point on timeline
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
    video.name.addEventListener("playing", (event) => {
        playButton.style.display = 'none';
        pauseButton.style.display = 'flex';
        interValTimer = setInterval(() => {

        if(video.name.currentTime === video.name.duration){
            playButton.style.display = 'flex';
            pauseButton.style.display = 'none';
        }
        
        let num =  video.name.currentTime;
        let currentTime = convertToSecFormat(num);
        video.startTimer.innerHTML = `${currentTime}`;
        let percentage = (num / videoDuration) * 100;
        circle.style.left = `${percentage - 2}%`;
        blueBarline.style.width= `${percentage}%`;
        

            
            
        },1)
    })
   
    video.name.addEventListener("pause", (event) => {

      clearInterval(interValTimer)
    })
    let endNumber = convertToSecFormat(videoDuration)
    video.endTimer.innerHTML = endNumber;

    const whiteBarline = document.querySelector('.timeLineBarWhite');
    const blueBarline = document.querySelector('.timeLineBarBlue');
    const circle = document.querySelector('.circle');
    const circleCor = circle.getBoundingClientRect().right;
    const whiteBarlineCor = whiteBarline.getBoundingClientRect().right;
    let mouseCordinates = 0
    
    document.querySelector(".playBarLine").addEventListener('click',(event) => {
    mouseCordinates = ((event.clientX - whiteBarline.getBoundingClientRect().left) / (whiteBarline.getBoundingClientRect().right - whiteBarline.getBoundingClientRect().left)) * 100;
    groupOfVideos[0].name.currentTime = groupOfVideos[0].duration *(mouseCordinates/ 100);
    let currentTime = convertToSecFormat(groupOfVideos[0].duration *(mouseCordinates/ 100));
    let cordinates = mouseCordinates;
    console.log(screenWidth)
    if (screenWidth <= 1000){
        cordinates -= 300; 
    }

    if (cordinates <= 0){
        blueBarline.style.width = `0%`;
        circle.style.left = `0%`
        video.startTimer.innerHTML = `${convertToSecFormat(0)}`;
    }

    else if (cordinates > 0 && cordinates <= 100){
        blueBarline.style.width= `${cordinates}%`;
        circle.style.left = `${cordinates - 2}%`
        video.startTimer.innerHTML = `${currentTime}`;
    }



        
        
    })

}

//invoking the function onto the active video on the screen
updateEndDuration(groupOfVideos[0])

groupOfVideos[0].name.volume = 0.01
const volume = document.querySelector(".volume");





//groupOfVideos[0].name.muted = true;

let isMouseDown = false;
let isMouseDownTwo = false


circle.addEventListener('mousedown', () =>{
    isMouseDown = true;
    phoneVideo.pause();
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
})

document.addEventListener('mouseup', () =>{
    isMouseDown = false;
    if (isMouseDownTwo){
       
    }

})

circle.addEventListener('mouseup', () =>{
    //playButton.style.display = 'none';
    //pauseButton.style.display = 'flex';
    isMouseDownTwo = true;
    
    
})


document.querySelector(".playBarLine").addEventListener('mousemove', (event) =>{
    let percentage = (event.clientX - whiteBarline.getBoundingClientRect().left) / (whiteBarline.getBoundingClientRect().right - whiteBarline.getBoundingClientRect().left) * 100;
    if (percentage < 0){
        percentage = 0;
    }
    else if (percentage > 100){
        percentage = 100;
    }
    if (isMouseDown){
        console.log(percentage);
        circle.style.left = `${percentage - 2}%`;
        blueBarline.style.width =`${percentage}%`;
        groupOfVideos[0].name.currentTime = groupOfVideos[0].duration * percentage / 100;
        
    }

})


function volumEditor(video){
    
    let rangeValue = document.querySelector(".volume");
    let clicker = true;
    let progress = document.querySelector(".volumeBlueBar")

    rangeValue.oninput = function(){
        progress.value = rangeValue.value;
        video.name.volume = progress.value / 100;
    }

    progress.addEventListener("click", (event)=>{
        let sizeOfBar = rangeValue.getBoundingClientRect().right -  rangeValue.getBoundingClientRect().left ;
        let mousePosition = event.clientX - rangeValue.getBoundingClientRect().left;
        let mousePercent = mousePosition / sizeOfBar  * 100;
        rangeValue.value = mousePercent;
        progress.value = mousePercent;
        video.name.volume = progress.value / 100;
        console.log(rangeValue.getBoundingClientRect().right)
        console.log(mousePercent );
    })

    rangeValue.addEventListener("input", () =>{
        console.log(rangeValue.value)
    })
   
}



volumEditor(groupOfVideos[0]);

/*function logger (){
    circle.style.left = `${80}%`
}


function mouseDown(event){
    window.addEventListener('mousemove', logger)
}

function mouseup(event){
    window.removeEventListener('mousemove', logger)
}

window.addEventListener('mousedown', mouseDown)
window.addEventListener('mouseup', mouseup)
*/