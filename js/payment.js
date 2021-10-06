

  firebase.auth().onAuthStateChanged((user)=>{
    if(!user)
    {
        location.replace("login.html")
     }
     else if(user.email!="admin@gmail.com")
    {
        location.replace("cart.html");
    }
    // else
    // {
    //     document.getElementById("message").innerHTML="Hello, "+user.email.replace("@gmail.com",'')
    // }
})