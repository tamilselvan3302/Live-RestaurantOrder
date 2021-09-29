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
                <button href="#" class="btn cart" data-id="${idnoV}">Edit food</button>
                <button href="#" class="btn order">Remove Food</button>
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
    window.onload= myFunction();



        
        function ready() {

            var addToCartButtons = document.querySelectorAll('.cart');
            // console.log("hello", addToCartButtons.length);
            // console.log( addToCartButtons);

            for (var i = 0; i < addToCartButtons.length; i++) {
                var button = addToCartButtons[i];
                button.addEventListener('click',editfood);
             }
        }
    

        async function editfood()
        {
            location.href = "addfooddetails.html";
        }
