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
firebase.auth().onAuthStateChanged((usr)=>{
    if(!usr)
    {
        location.replace("login.html");
    }
    else if(usr.email=="admin@gmail.com")
    {
        location.replace("menu_admin.html");
    }
    else
    {
        user=usr.email.replace("@gmail.com",'');
        window.onload= myFunction();
    }
})


    function createelemnet(ele,value)
    {
        let tag=document.createElement(ele);
        tag.textContent=value;
        return tag
    }

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
                <button href="#" class="btn cart" data-id="${idnoV}">Add to cart</button>
                <button href="#" class="btn order" id="order" data-id="${idnoV}">Order Now</button>
            </div>
        </div>`


        if (document.readyState == 'loading') {
            document.addEventListener('DOMContentLoaded', ready)
            } else {
                ready()
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
    cartbuttonupdate()
   

        }); 
          

    }
    



        
        function ready() {

            var addToCartButtons = document.querySelectorAll('.cart');
            var orderButtons = document.querySelectorAll('.order');
            // console.log("hello", addToCartButtons.length);
            // console.log( addToCartButtons);

            for (var i = 0; i < addToCartButtons.length; i++) {
                var button = addToCartButtons[i];
                button.addEventListener('click',addToCartClicked);
             }

             for (var i = 0; i < orderButtons.length; i++) {
                var button = orderButtons[i];
                button.addEventListener('click',addToCartClicked);
             }
        }
        

        


        async function addToCartClicked(e)
        {   
        
            console.log(e.target.parentElement.getElementsByTagName("h2")[0].innerText);
            var fooditem = e.target.parentElement.getElementsByTagName("h2")[0].innerText;
            

            var idnoV, nameV,priceV,linkV;

            console.log("console :",this.dataset.id);
            
            var id=this.dataset.id;
            

            firebase.database().ref('food').once('value',function(snapshot){
                                snapshot.forEach(
                                function(ChildSnapshot){
                                    if(ChildSnapshot.val().name == fooditem)
                                        {   
                                        idnoV = ChildSnapshot.val().idno;
                                        nameV = ChildSnapshot.val().name; 
                                        priceV= ChildSnapshot.val().price;
                                        linkV = ChildSnapshot.val().Link;

                                            console.log(user,idnoV,nameV,priceV,linkV);
                                            addToCart(user,idnoV,nameV,priceV,linkV);
                                        }
                                });

                                cartbuttonupdate()
                            }
                            
                            );


                    async function addToCart(user,idnoV,nameV,priceV,linkV)
                    {   
                        
                        firebase.database().ref('cart/'+user+'/'+ id).set({
                                    idno: idnoV,
                                    name: nameV,
                                    price: priceV,
                                    Link : linkV,
                                    quantity:1
                                },(error) => {
                                    if (error) {
                                        console.log("error",error)
                                    } else {
                                        console.log("Added to cart");
                                    }
                                  });

                        firebase.database().ref('Order/'+user+'/'+ id).set({
                                    idno: idnoV,
                                    name: nameV,
                                    price: priceV,
                                    Link : linkV,
                                    quantity:1
                                },(error) => {
                                    if (error) {
                                        console.log("error",error)
                                    } else {
                                        console.log("Added to Order");
                                        if(e.target.innerHTML=="Order Now"){
                                            window.location.replace('cart.html');
                                        }
                                    }
                                  });
                
                    }
            
        }
            

          
    var i=0;
    function cartbuttonupdate()
    {        
        firebase.database().ref('cart/'+user).once('value',function(snapshot){
            snapshot.forEach(
            function(ChildSnapshot){
                let element=document.querySelector(`.cart[data-id="${ChildSnapshot.val().idno}"]`);
                //console.log(element);
                element.innerHTML="Added";
            });
        } 
        );
    }