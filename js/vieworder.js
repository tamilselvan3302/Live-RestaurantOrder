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


  var user;
  firebase.auth().onAuthStateChanged((usr)=>{
      if(!usr)
      {
          location.replace("login.html")
      }
      else if(usr.email!="admin@gmail.com")
    {
        location.replace("cart.html");
    }
      else
      {   
          user=usr.email.replace("@gmail.com",'');
          window.onload= myFunction();
      }
  })
  

function ready() {
       

        // var addToCartButtons = document.getElementsByClassName('shop-item-button');
        // for (var i = 0; i < addToCartButtons.length; i++) {
        //     var button = addToCartButtons[i];
        //     button.addEventListener('click',addToCartClicked)
        // }

        var paidButtons = document.getElementsByClassName('paid')
        for (var i = 0; i < paidButtons.length; i++) {
            var button = paidButtons[i];
            button.addEventListener('click',paidClicked);
        }
       
    }
    async function paidClicked(event)
    {
        
        console.log(this.dataset.id,"h",event.target.getAttribute('data-id'));
        var dataID =this.dataset.id;

        firebase.database().ref('Order/'+dataID).remove();
        firebase.database().ref('cart/'+dataID).remove();
        
        
        var buttonClicked = event.target;
        console.log(buttonClicked.parentElement.parentElement);


        buttonClicked.parentElement.parentElement.remove();
        

        // var buttonClicked = event.target;
        // buttonClicked.parentElement.parentElement.remove();
        // console.log(buttonClicked.parentElement.getElementsByClassName("rem-btn")[0].innerText);
        //var dataID =this.dataset.id;

    }




function updateCartTotal()
{
    var cartItemContainer = document.getElementsByClassName("cart-items")[j];
    var  cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total=0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow= cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var quantity = parseInt(quantityElement.value);
        var price = parseFloat(priceElement.innerText.replace('$',''));
        total= total+ (price*quantity);
        
    }
    total= Math.round(total*100)/100;
    //updatetotal(total);
    document.getElementsByClassName('cart-total-price')[j].innerText='$'+ total;   
    
}


let j=-1;


function adddetails(nameV, idnoV,priceV,linkV,quantityV)
{   
    document.getElementsByClassName("cart-items")[j].innerHTML+=`

    
    
    <div class="cart-row">
        <div class="cart-item cart-column">
           
            <img class="cart-item-image" src=${linkV} width="100" height="100">
            <span class="cart-item-title">${nameV}</span>
        </div>
        <span class="cart-price cart-column">$${priceV}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quantityV}" readonly>
        </div>
   </div>`

     updateCartTotal();
  
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
        } else {
            ready()
        }

    


}









function myFunction() {
    console.log('hello');

    ///'+user
firebase.database().ref('Order').once('value',function(snapshot){
    snapshot.forEach(
    function(ChildSnapshot){
    console.log(ChildSnapshot.key); 
    user = ChildSnapshot.key;

   

    



    document.getElementById("content-section").innerHTML+=`
    <div class="outter">
    <div>
    <h1 class="name">${user}</h1>
    </div>
   
    <div class="cart-row">
            <span class="cart-item cart-header cart-column">ITEM</span>
            <span class="cart-price cart-header cart-column">PRICE</span>
            <span class="cart-quantity cart-header cart-column">QUANTITY</span>
        </div>
        <div class="cart-items" >
            
        </div>
        
        <div class="cart-total">
            <strong class="cart-total-title">Total</strong>
            <span class="cart-total-price">$0</span>
            <button class="paid" type="button" data-id="${user}">Paid</button>
        </div>
        </div>`
    

    firebase.database().ref('Order/'+user).once('value',function(snapshot){
        j++;
        snapshot.forEach(
        function(ChildSnapshot){
        var nameV = ChildSnapshot.val().name;
        var idnoV = ChildSnapshot.val().idno;
        var priceV= ChildSnapshot.val().price;
        var linkV = ChildSnapshot.val().Link;
        var quantityV = ChildSnapshot.val().quantity;
        

        adddetails(nameV, idnoV,priceV,linkV,quantityV);
        
    }
);


    }); 
   
    }
);
}); 








      

}
// async function updatetotal(tot)
// {
//     console.log("updatetotal");
//     firebase.database().ref('cart/'+user+'/Total').set({
//         Amount: tot        
//     },(error) => {
//         if (error) {
//             console.log("error",error)
//         } else {
//             console.log("Total updated");
//         }
//     });
// }
