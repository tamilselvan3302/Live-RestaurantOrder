firebase.auth().onAuthStateChanged((user)=>{
    if(!user)
    {
        location.replace("login.html")
    }
    else
    {
        document.getElementById("message").innerHTML="Hello, "+user.email.replace("@gmail.com",'')
    }
})


