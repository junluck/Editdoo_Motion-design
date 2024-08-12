
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
const animationOne = document.querySelector('.animationOne');
const videoOne = document.querySelector(".videoOne");
const videoTwo = document.querySelector(".videoTwo");
let activeNumber = 0;


class Video {
    constructor(video, duration, videoName){
        this._name = video;
        this._duration = duration;
        this._startTimer = videoName.querySelector('.timerStart');
        this._endTimer = videoName.querySelector('.timerEnd');
        this._videoName = videoName;
        this._circle  = videoName.querySelector(".circle")
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

        get videoName(){
            return this._videoName
        }

        get circle(){
            return this._circle
        }
    
    
}
const videoOneObject = new Video(phoneVideo,19,videoOne);
const videoTwoObject = new Video(animationOne,114,videoTwo);
//group videos up and sort in array of objects
const groupOfVideos = [videoOneObject, videoTwoObject]

//store playback bar and  playback button in variables
const whiteBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarWhite');
const blueBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarBlue');
const circle = groupOfVideos[activeNumber].circle
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
        const whiteBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarWhite');
        const blueBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarBlue');
        const circle = groupOfVideos[activeNumber].circle
        playButton.style.display = 'none';
        pauseButton.style.display = 'flex';
        interValTimer = setInterval(() => {

        if(video.name.currentTime === video.name.duration){
            playButton.style.display = 'flex';
            pauseButton.style.display = 'none';
        }
        
        let num =  video.name.currentTime;
        let convertedNum = video.name.currentTime
        if (video.name.currentTime >= 60){
            convertedNum  = 100 + (video.name.currentTime - 60)
        }
        
        let currentTime = convertToSecFormat(convertedNum);
        video.startTimer.innerHTML = `${currentTime}`;
        let percentage = (video.name.currentTime / video.duration) * 100;
        circle.style.left = `${percentage - 2}%`;
        blueBarline.style.width= `${percentage}%`;
        console.log(video.duration)
        console.log(video.name.currentTime)
        console.log(video.name.currentTime)
        

            
            
        },1)
    })
   
    video.name.addEventListener("pause", (event) => {

      clearInterval(interValTimer)
    })
    let endNumber = convertToSecFormat(videoDuration)
    //video.endTimer.innerHTML = endNumber;
    let mouseCordinates = 0
    
    video.videoName.querySelector(".playBarLine").addEventListener('click',(event) => {
    const whiteBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarWhite');
    const blueBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarBlue');
    const circle = groupOfVideos[activeNumber].circle
    mouseCordinates = ((event.clientX - whiteBarline.getBoundingClientRect().left) / (whiteBarline.getBoundingClientRect().right - whiteBarline.getBoundingClientRect().left)) * 100;
    groupOfVideos[activeNumber].name.currentTime = groupOfVideos[activeNumber].duration *(mouseCordinates/ 100);
    let currentTime = convertToSecFormat(groupOfVideos[activeNumber].duration *(mouseCordinates/ 100));
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

    //groupOfVideos[0].name.muted = true;

    let isMouseDown = false;
    let isMouseDownTwo = false


    video.circle.addEventListener('mousedown', () =>{
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

    video.circle.addEventListener('mouseup', () =>{
        //playButton.style.display = 'none';
        //pauseButton.style.display = 'flex';
        isMouseDownTwo = true;
        
        
    })


    video.videoName.querySelector(".playBarLine").addEventListener('mousemove', (event) =>{
        const whiteBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarWhite');
        const blueBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarBlue');
        const circle = groupOfVideos[activeNumber].circle
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
            groupOfVideos[activeNumber].name.currentTime = groupOfVideos[activeNumber].duration * percentage / 100;
            
        }

    })

    }

    //invoking the function onto the active video on the screen


    groupOfVideos[activeNumber].name.volume = 0.01
    const volume = document.querySelector(".volume");








    function volumEditor(video){
        
        let rangeValue = video.videoName.querySelector(".volume");
        let clicker = true;
        let progress = video.videoName.querySelector(".volumeBlueBar")

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




//let activeVideo = groupOfVideos[activeNumber]

function activeVideoInloop(arrayOfVideos){
    let rewindButton = document.querySelector(".rewind");
    let fastForwardButton = document.querySelector(".fastForward");
    let previousActiveNumber = 0;
    let copyOfActiveNumber = 0;
    rewindButton.addEventListener("click", ()=>{
        previousActiveNumber = activeNumber;
        copyOfActiveNumber = activeNumber
        activeNumber -= 1;
        if (activeNumber < 0){
            activeNumber = 0;
        } 
        else if(activeNumber > arrayOfVideos.length){
            activeNumber = arrayOfVideos.length - 1;
        }
        console.log(activeNumber);
        arrayOfVideos[previousActiveNumber].name.pause()
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none';
        if (activeNumber != arrayOfVideos.length){
        arrayOfVideos[activeNumber].name.style.transform= `scale(1.02)`
        arrayOfVideos[activeNumber].videoName.style.right = `0`
        arrayOfVideos[activeNumber - 1].videoName.style.opacity = `0%`}
    })
    fastForwardButton.addEventListener("click", ()=>{
        copyOfActiveNumber = activeNumber
        if (copyOfActiveNumber > 0){
        copyOfActiveNumber = 0;
       }


        previousActiveNumber = activeNumber;
        activeNumber += 1;
        if (activeNumber < 0){
            activeNumber = 0;
        } 
        else if(activeNumber >=arrayOfVideos.length){
            activeNumber = arrayOfVideos.length - 1;
        }
        arrayOfVideos[previousActiveNumber].name.pause()
        console.log(activeNumber);
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none';
       
    })

    //add event listener to play button and play video when clicked
    playButton.addEventListener('click',() =>{
        arrayOfVideos[activeNumber].name.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'flex';
        updateEndDuration(arrayOfVideos[activeNumber]);
        volumEditor(arrayOfVideos[activeNumber]);
    })

//add event listener to pause button and pause video when clicked
    pauseButton.addEventListener('click',() =>{
        arrayOfVideos[activeNumber].name.pause();
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none';
        updateEndDuration(arrayOfVideos[activeNumber]);
        volumEditor(arrayOfVideos[activeNumber]);

        
    })

    updateEndDuration(arrayOfVideos[activeNumber]);
    volumEditor(arrayOfVideos[activeNumber]);
}

activeVideoInloop(groupOfVideos);

/*
let newVideo = document.createElement("video")
newVideo.src = "./Resources/animation_one.mp4"
console.log(newVideo);
document.querySelector(".videos").appendChild(newVideo);
*/
