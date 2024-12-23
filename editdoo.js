import navbar from "/navbar.js";

//Navbar functionality
navbar()

const sliderArrowOne = document.querySelector(".rightArrowButton")
const sliderArrowTwo = document.querySelector('.leftArrowButton');
const menuOne = document.querySelector('.orderN');
const menuTwo = document.querySelector('.orderNTwo');
let checkClick = false 

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

//storing play,pause and Rewind element button in variables
const playButton = document.querySelector('.playButton');
const pauseButton = document.querySelector('.pauseButton');
const rewind = document.querySelector(".rewind");

//storing video element in variable
const phoneVideo = document.querySelector('.phoneVideo');
const animationOne = document.querySelector('.animationOne');
const animationTwo = document.querySelector(".animationTwo")
const videoOne = document.querySelector(".videoOne");
const videoTwo = document.querySelector(".videoTwo");
const videoThree = document.querySelector(".videoThree");
let activeNumber = 0;

//make class for video so that I can store video
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

//storing each video in video with classes
const videoOneObject = new Video(phoneVideo,19,videoOne);
const videoTwoObject = new Video(animationOne,114,videoTwo);
const videoThreeObject = new Video(animationTwo,65,videoThree);

//group videos up and sort in array of objects
const groupOfVideos = [videoOneObject, videoTwoObject, videoThreeObject]

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

//function that will upadte time of video and allow user to move play head to any point on timeline
function updateEndDuration(video){
    let videoDuration = video.duration;

    //function that converts second format to minute video format
    function convertToSecFormat(videoTimerNumber){
        let inMin = (videoTimerNumber / 100).toFixed(2);
        let arrayOfSec = [...inMin];
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
    
    //Eventlistener that listens if video is playing so that it can move playhead with video 
    video.name.addEventListener("playing", (event) => {
        const whiteBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarWhite');
        const blueBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarBlue');
        const circle = groupOfVideos[activeNumber].circle
        playButton.style.display = 'none';
        pauseButton.style.display = 'flex';

        //set interval for every second to update the timer
        interValTimer = setInterval(() => {

        //if time reach end of video the pause button  becomes playbutton
        if(video.name.currentTime === video.name.duration){
            playButton.style.display = 'flex';
            pauseButton.style.display = 'none';
        }
        
        let num =  video.name.currentTime;
        let convertedNum = video.name.currentTime

        // convert seconds to minute format if it hits 60 
        if (video.name.currentTime >= 60){
            convertedNum  = 100 + (video.name.currentTime - 60)
        }
        
        //convert current time into secondformat
        let currentTime = convertToSecFormat(convertedNum);
        video.startTimer.innerHTML = `${currentTime}`;
        let percentage = (video.name.currentTime / video.duration) * 100;
        circle.style.left = `${percentage - 2}%`;
        blueBarline.style.width= `${percentage}%`;


            
            
        },1)
    })
   
    //when video gets paused the setinterval function gets cleared
    video.name.addEventListener("pause", (event) => {

      clearInterval(interValTimer)
    })

    //get the end duration number and convert it
    let endNumber = convertToSecFormat(videoDuration)
   
    let mouseCordinates = 0
    
    //clicking on playbarline and play heading moving to mouse cordinates
    video.videoName.querySelector(".playBarLine").addEventListener('click',(event) => {
    const whiteBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarWhite');
    const blueBarline =  groupOfVideos[activeNumber].videoName.querySelector('.timeLineBarBlue');
    const circle = groupOfVideos[activeNumber].circle
    mouseCordinates = ((event.clientX - whiteBarline.getBoundingClientRect().left) / (whiteBarline.getBoundingClientRect().right - whiteBarline.getBoundingClientRect().left)) * 100;
    groupOfVideos[activeNumber].name.currentTime = groupOfVideos[activeNumber].duration *(mouseCordinates/ 100);
    let currentTime = convertToSecFormat(groupOfVideos[activeNumber].duration *(mouseCordinates/ 100));
    let cordinates = mouseCordinates;

    //cordinates  won't go under 0 and position will stay at 0%
    if (cordinates <= 0){
        blueBarline.style.width = `0%`;
        circle.style.left = `0%`
        video.startTimer.innerHTML = `${convertToSecFormat(0)}`;
    }
    //if cordinates is more than 0 and less than 101 it the position of the elements will be at the cordinates
    else if (cordinates > 0 && cordinates <= 100){
        blueBarline.style.width= `${cordinates}%`;
        circle.style.left = `${cordinates - 2}%`
        video.startTimer.innerHTML = `${currentTime}`;
    }



        
        
    })

  

    let isMouseDown = false;
    let isMouseDownTwo = false

    //mouse down event on circle playhead and video will pause
    video.circle.addEventListener('mousedown', () =>{
        isMouseDown = true;
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none';
    })
    //mouse release in document will set isMouseDown to false 
    document.addEventListener('mouseup', () =>{
        isMouseDown = false;
        
    })

    //mouse release in document will set isMouseDownTwo to true 
    video.circle.addEventListener('mouseup', () =>{
        isMouseDownTwo = true;
        
        
    })

    //eventlistener for mousemove on playbarline and moves play bar line to mousecordinates
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
            
            circle.style.left = `${percentage - 2}%`;
            blueBarline.style.width =`${percentage}%`;
            groupOfVideos[activeNumber].name.currentTime = groupOfVideos[activeNumber].duration * percentage / 100;
            
        }

    })

    }


    groupOfVideos[activeNumber].name.volume = 0.01
    const volume = document.querySelector(".volume");







    //function that edits the videos volume when clicked
    function volumEditor(video){
        
        let rangeValue = video.videoName.querySelector(".volume");
        let clicker = true;
        let progress = video.videoName.querySelector(".volumeBlueBar")

        rangeValue.oninput = function(){
            progress.value = rangeValue.value;
            video.name.volume = progress.value / 100;
        }

        //when volume bar is clicked it moves based on the mouse
        progress.addEventListener("click", (event)=>{
            let sizeOfBar = rangeValue.getBoundingClientRect().right -  rangeValue.getBoundingClientRect().left ;
            let mousePosition = event.clientX - rangeValue.getBoundingClientRect().left;
            let mousePercent = mousePosition / sizeOfBar  * 100;
            rangeValue.value = mousePercent;
            progress.value = mousePercent;
            video.name.volume = progress.value / 100;
           
        })

        rangeValue.addEventListener("input", () =>{
            console.log(rangeValue.value)
        })
    
}


//function that  allows to scroll thru videos and make video full screen
function activeVideoInloop(arrayOfVideos){
    let rewindButton = document.querySelector(".rewind");
    let fastForwardButton = document.querySelector(".fastForward");
    let previousActiveNumber = 0;
    let copyOfActiveNumber = 0;

    //check if rewind button is being pressed so can move forward to other videos
    rewindButton.addEventListener("click", ()=>{
        previousActiveNumber = activeNumber;
        copyOfActiveNumber = activeNumber
        activeNumber += 1;
        if (activeNumber < 0){
            activeNumber = 0;
        } 
        else if(activeNumber >= arrayOfVideos.length){
            activeNumber = arrayOfVideos.length - 1;
        }
        
        arrayOfVideos[previousActiveNumber].name.pause()
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none'; 
        arrayOfVideos[activeNumber].name.style.transform= `scale(1.02)`
        arrayOfVideos[activeNumber].videoName.style.right = `0`
        arrayOfVideos[activeNumber-1].videoName.style.opacity = `0`
        arrayOfVideos[activeNumber].videoName.querySelector(".playHead").style.width = `63%`;
        arrayOfVideos[activeNumber].videoName.querySelector(".playHead").style.opacity = `1`;
        arrayOfVideos[activeNumber].videoName.style.zIndex = `${activeNumber}`
        
        updateEndDuration(arrayOfVideos[activeNumber]);
        volumEditor(arrayOfVideos[activeNumber]);
        updateEndDuration(arrayOfVideos[arrayOfVideos.length - 1]);
        volumEditor(arrayOfVideos[arrayOfVideos.length - 1]);

       //check if big button is being pressed so can make video screen
        groupOfVideos[activeNumber].videoName.querySelector(".bigScreen").addEventListener("click",()=>{
            groupOfVideos[activeNumber].name.requestFullscreen().catch((e)=>{
                console.log(e)
            })
        })

       
    })

    //check if fastforward button is being pressed so can move back to other videos
    fastForwardButton.addEventListener("click", ()=>{
        copyOfActiveNumber = activeNumber
        if (copyOfActiveNumber > 0){
        copyOfActiveNumber = 0;
       }


        previousActiveNumber = activeNumber;
        activeNumber -= 1;
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
        arrayOfVideos[activeNumber + 1].name.style.transform= `scale(0.92)`;
        arrayOfVideos[activeNumber + 1].videoName.style.right = `-70%`;
  
        arrayOfVideos[activeNumber].videoName.style.opacity = `1`;
        arrayOfVideos[activeNumber + 1].videoName.querySelector(".playHead").style.width = `50%`;
        arrayOfVideos[activeNumber + 1].videoName.querySelector(".playHead").style.opacity = `0%`;
        console.log(arrayOfVideos.length - activeNumber)
        arrayOfVideos[activeNumber + 1].videoName.style.zIndex = `${arrayOfVideos.length - activeNumber}`
        arrayOfVideos[activeNumber + 2].videoName.style.zIndex = `${activeNumber}`
        groupOfVideos[activeNumber].videoName.querySelector(".bigScreen").addEventListener("click",()=>{
            console.log(videoOneObject.name)
            console.log(groupOfVideos[0].name)
            groupOfVideos[activeNumber].name.requestFullscreen().catch((e)=>{
                console.log(e)
            })
        })
      
      
       
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

    //click each video to make it fullscreen
    groupOfVideos[activeNumber].videoName.querySelector(".bigScreen").addEventListener("click",()=>{
        groupOfVideos[activeNumber].name.requestFullscreen().catch((e)=>{
            console.log(e)
        })
    })
    updateEndDuration(arrayOfVideos[activeNumber]);
    volumEditor(arrayOfVideos[activeNumber]);
}

//invoking function
activeVideoInloop(groupOfVideos);

//storing triangles,paragraphs,border,backgrounds and booleons
const arrayOfTriangle = [document.querySelector(".triangleUpsideDownOne"), document.querySelector(".triangleUpsideDownTwo"), document.querySelector(".triangleUpsideDownThree"), document.querySelector(".triangleUpsideDownFour"), document.querySelector(".triangleUpsideDownFive"), document.querySelector(".triangleUpsideDownSix"), document.querySelector(".triangleUpsideDownSeven")];
const arrayOfParagraphs = [document.querySelector(".paragraphOne"), document.querySelector(".paragraphTwo"), document.querySelector(".paragraphThree"), document.querySelector(".paragraphFour"), document.querySelector(".paragraphFive"), document.querySelector(".paragraphSix"), document.querySelector(".listFaq")];
const arrayOfBackgrounds = [document.querySelector(".backgroundBlurOne"), document.querySelector(".backgroundBlurTwo"), document.querySelector(".backgroundBlurThree"), document.querySelector(".backgroundBlurFour"), document.querySelector(".backgroundBlurFive"), document.querySelector(".backgroundBlurSix"), document.querySelector(".backgroundBlurSeven")];
const arrayOfBorders = [document.querySelector(".backgroundLineOne"), document.querySelector(".backgroundLineTwo"), document.querySelector(".backgroundLineThree"), document.querySelector(".backgroundLineFour"), document.querySelector(".backgroundLineFive"), document.querySelector(".backgroundLineSix"), document.querySelector(".backgroundLineSeven")];
let boolOne = true, boolTwo = true, boolThree = true, boolFour = true, boolFive = true, boolSix = true, boolSeven = true
const arrayOfBool = [boolOne, boolTwo, boolThree, boolFour, boolFive, boolSix, boolSeven ]

//if you click on triangles the faq sqaure expands
function triangleClickEvent(arrayOfTriangle, arrayOfParagraphs, arrayOfBackgrounds, arrayOfBorders){
    let effect = true;
arrayOfTriangle.forEach((element,index)=>{
    element.addEventListener("click",(e)=>{
        if(arrayOfBool[index]){
            arrayOfBool[index] = false 
            arrayOfParagraphs[index].style.transition = "all 1700ms ease";
            arrayOfParagraphs[index].style.opacity = "1";
            
            
        }

        else{
            arrayOfBool[index] = true;
            arrayOfParagraphs[index].style.transition = "all 300ms ease";
            arrayOfParagraphs[index].style.opacity = "0";
        }
        
        arrayOfBackgrounds[index].classList.toggle("active");
        arrayOfBorders[index].classList.toggle("active");
        arrayOfTriangle[index].classList.toggle("active");
 

    })
})}

//invoke function on triangles and pparagraphs and backgrounds
triangleClickEvent(arrayOfTriangle, arrayOfParagraphs, arrayOfBackgrounds, arrayOfBorders);

