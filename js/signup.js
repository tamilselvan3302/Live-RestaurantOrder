document.getElementById("signupform").addEventListener("submit",(event)=>{
    event.preventDefault()
})

firebase.auth().onAuthStateChanged((user)=>{
    if(user)
    {
        location.replace("index.html")
    }
    
})

function signup()
{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    console.log(email,password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        document.getElementById("error").innerHTML= error.message;
        // ..
    });
  

}