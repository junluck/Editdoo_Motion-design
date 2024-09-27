import navbar from "/navbar.js"

navbar()

const form = document.getElementById("commentForm");
const nameId = document.getElementById("name");
const messageId = document.getElementById("message")
const commentsDiv = document.getElementById("comments")
const arrayOfComments = []

function renderCommentInArray(array){
    let endOfArray = array.length - 1 
    commentsDiv.appendChild(array[endOfArray])
}

form.addEventListener("submit",(event)=>{
    let newArray = [{id:"9603255029086",name:"junain Davids"}]
    console.log(nameId.value);
    event.preventDefault();
    const newDiv = document.createElement("div");
    const name = document.createElement("h4");
    const comment =  document.createElement("p");
    name.textContent = nameId.value;
    comment.textContent = messageId.value;
    newDiv.className = "individualComment";
    newDiv.appendChild(name);
    newDiv.appendChild(comment);
    arrayOfComments.push(newDiv);
    localStorage.setItem("myArray",JSON.stringify(newArray))
    const comments = JSON.parse(localStorage.getItem('myArray'))
    console.log(comments[0].id)
    renderCommentInArray(arrayOfComments);
    nameId.value = ""
    messageId.value = ""
    

})