document.getElementById("loginform").addEventListener("submit",(event)=>{
    event.preventDefault()
})

firebase.auth().onAuthStateChanged((user)=>{
    if(user)
    {
        location.replace("index.html")
    } 
})

function login()
{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch((e)=>{
        document.getElementById("error").innerHTML=e.message;
    })
  

}

function forgotPass()
{   document.getElementById("error").innerHTML=""
    const email = document.getElementById("email").value;

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to our email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML=error.message;
    });
}