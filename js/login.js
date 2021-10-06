document.getElementById("loginform").addEventListener("submit",(event)=>{
    event.preventDefault()
})

firebase.auth().onAuthStateChanged((user)=>{
    if(user)
    {  
         if(user.email=="admin@gmail.com")
        {
            location.replace("index_admin.html");
        }
        else
        {
            location.replace("index.html")

        }
        console.log(user)
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