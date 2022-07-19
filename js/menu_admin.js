const firebaseConfig = {
    apiKey: "AIzaSyADoT95ig0pU3YSBQn5xCD7r96fMRYlWDI",
    authDomain: "live-restaurant-order.firebaseapp.com",
    projectId: "live-restaurant-order",
    storageBucket: "live-restaurant-order.appspot.com",
    messagingSenderId: "164826896042",
    appId: "1:164826896042:web:51a60f2ff0825919e0e2d3",
    databaseURL:"https://live-restaurant-order-default-rtdb.firebaseio.com/"
  };
  firebase.initializeApp(firebaseConfig);


  firebase.auth().onAuthStateChanged((user)=>{
    if(!user)
    {
        location.replace("login.html")
     }
    // else
    // {
    //     document.getElementById("message").innerHTML="Hello, "+user.email.replace("@gmail.com",'')
    // }
})
var user;


async function foodcount(){

    let i = document.querySelectorAll('.card');
    console.log("food count" ,i.length);
  }
  

firebase.auth().onAuthStateChanged((usr)=>{
    if(!usr)
    {
        location.replace("login.html");
    }
    else if(usr.email!="admin@gmail.com")
    {
        location.replace("menu.html");
    }
    else
    {
        user=usr.email.replace("@gmail.com",'');
        window.onload= myFunction();
    }
})


 

    function adddetails(nameV, idnoV,priceV,linkV)
    {
        document.getElementById("box-container").innerHTML+=`
        <div class="card">
            <div class="box">
                <span class="price">₹${priceV} for one</span>
                <img src=${linkV} alt="img">
                <h2>${nameV}</h2>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <button href="#" class="btn cart updatefood" data-id="${idnoV}">Edit food</button>
               
                <button href="#" class="btn order removefood" data-id="${idnoV}" >Remove food</button>
            </div>
        </div>`


        if (document.readyState == 'loading') {
            document.addEventListener('DOMContentLoaded', ready)
            } else {
                ready();
                
            }

        

            
    }

    function myFunction() {
        
    
        firebase.database().ref('food').once('value',function(snapshot){
            snapshot.forEach(
            function(ChildSnapshot){
            var nameV = ChildSnapshot.val().name;
            var idnoV = ChildSnapshot.val().idno;
            var priceV= ChildSnapshot.val().price;
            var linkV = ChildSnapshot.val().Link;

            adddetails(nameV, idnoV,priceV,linkV);
            
        }
    );
    foodcount();

   

        }); 
        

        
          

    }
    



        
        function ready() {
            var removefoodItemButtons = document.getElementsByClassName('removefood');
            var updateItemButtons = document.getElementsByClassName('updatefood');
            for (var i = 0; i < removefoodItemButtons.length; i++) {
                var button = removefoodItemButtons[i];
                button.addEventListener('click',removefoodItem);
            }
            for (var i = 0; i < updateItemButtons.length; i++) {
                var button = updateItemButtons[i];
                button.addEventListener('click',updatefoodItem);
            }
           
        }

    async function removefoodItem(event)
    {
        

        // let data = await firebase.database().ref('cart/'+user).get();
        // var count = data.numChildren();
        // console.log(count);
        console.log(this.dataset.id,"h",event.target.getAttribute('data-id'));
        var dataID =this.dataset.id;

        

        firebase.database().ref('food/'+dataID).remove();


        

        var buttonClicked = event.target;

        console.log(buttonClicked);
        buttonClicked.parentElement.parentElement.remove();
        

        // var desertRef = firebase.storage().ref().child('images/030_Sample.png');
        // desertRef.delete().then(() => {
        // }).catch((error) => {
        // // Uh-oh, an error occurred!
        // console.log("delete error");
        // });

    }

    async function updatefoodItem(event){

        console.log(this.dataset.id,"h",event.target.getAttribute('data-id'));
        var dataID =this.dataset.id;
        localStorage.setItem("Idno",dataID);


        // firebase.database().ref('food/'+dataID).once('value',function(snapshot){
           
        //     var nameV = snapshot.val().name;
        //     var idnoV = snapshot.val().idno;
        //     var priceV= snapshot.val().price;
        //     var linkV = snapshot.val().Link;

            

        //     console.log(nameV,idnoV,priceV,linkV);
        //     localStorage.setItem("Dname",nameV);
        //     localStorage.setItem("Dprice",priceV);
        //     localStorage.setItem("Dlink",linkV);

            
            
    
        // }); 

        // let data=await firebase.database().ref(`food/${dataID}`).get();
        // data=data.val();
        // console.log(data.name);

    
        // console.log("Idno :" ,localStorage.getItem('Idno'));
        // console.log("name :" ,localStorage.getItem('Dname'));
        // console.log("price :" ,localStorage.getItem('Dprice'));
        // console.log("Link :" ,localStorage.getItem('Dlink'));

        window.location.href = 'Updatefooddetails.html';
      //  return
        

    }
        
