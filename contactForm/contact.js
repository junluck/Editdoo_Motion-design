import navbar from "/navbar.js";
//Navbar functionality
navbar()

//storing form in variable aswell as thank you message
const form = document.querySelector(".forms")
const thankYou = document.querySelector(".thankYou")

// on subimt of form email.js will send email 
form.addEventListener("submit",(event)=>{
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    console.log(data)
    event.preventDefault()
    // function that sends email 
    function sendMail(){
        let params = data

        console.log(emailjs)

        emailjs.send("service_ouim9y7","template_fj35ky5", params).then(()=>{
            form.style.display = "none"
        }).catch((e)=>{
            console.log("error has occured")
        })
        }
        
        sendMail()
    

        form.style.display = "none";
        thankYou.style.display = "block"
    })
    
