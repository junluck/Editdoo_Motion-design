import navbar from "/navbar.js"

navbar()

const form = document.getElementById("commentForm");
const nameId = document.getElementById("name");
const messageId = document.getElementById("message");
const commentsDiv = document.getElementById("comments");
const arrayOfComments = [];

function appender(ele){
    const newDiv = document.createElement("div");
    const name = document.createElement("h4");
    const comment =  document.createElement("p");
    name.textContent = ele.username;
    comment.textContent = ele.message;
    newDiv.className = "individualComment";
    newDiv.appendChild(name);
    newDiv.appendChild(comment);
    commentsDiv.appendChild(newDiv)
}



function renderCommentInArray(array){
    let endOfArray = array.length - 1 
    commentsDiv.appendChild(array[endOfArray])
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let newComment = {username:nameId.value,message:messageId.value};
    appender(newComment);
    nameId.value = "";
    messageId.value = "";
    

})