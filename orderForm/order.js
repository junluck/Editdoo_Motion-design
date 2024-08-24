import navbar from "/navbar.js";

navbar()


const form = document.querySelector(".forms")
const thankYou = document.querySelector(".thankYou")

form.addEventListener("submit",(event)=>{
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    console.log(data)
    event.preventDefault()
    function sendMail(){
        let params = data

        console.log(emailjs)

        emailjs.send("service_ouim9y7","template_14safte", params).then(()=>{
            form.style.display = "none"
        }).catch((e)=>{
            console.log("error has occured")
        })
        }
        
        sendMail()
    

        form.style.display = "none";
        thankYou.style.display = "block"
    })
    
/*
    paypal.Buttons({
    createOrder: function(data , actions){
        return actions.order.create({
            purchase_units:[
                {
                    amount:{
                        value: "0.01"
                    }
                }
            ]
        })

    },
    onApprove: function (data, actions){
        return actions.order.capture().then(function (details){
            alert("Transaction completed by " + details.prayer.name.given_name)
        })
    },
}).render("#paypal")*/