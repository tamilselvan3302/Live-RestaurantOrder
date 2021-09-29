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
      else
      {
          user=usr.email.replace("@gmail.com",'');
          window.onload= myFunction();
      }
  })
  

function ready() {
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i];
            button.addEventListener('click',removeCartItem);
        }
        var quantityInputs= document.getElementsByClassName('cart-quantity-input');
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged)
        }

        var addToCartButtons = document.getElementsByClassName('shop-item-button');
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i];
            button.addEventListener('click',addToCartClicked)
        }

        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

    }
function purchaseClicked()
{
    alert('Thankyou for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();

}

async function removeCartItem(event)
{
    

    // let data = await firebase.database().ref('cart/'+user).get();
    // var count = data.numChildren();
    // console.log(count);
    console.log(this.dataset.id,"h",event.target.getAttribute('data-id'));
    var dataID =this.dataset.id;

    firebase.database().ref('cart/'+user+'/'+dataID).remove();

    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    console.log(buttonClicked.parentElement.getElementsByClassName("rem-btn")[0].innerText);

    updateCartTotal();

}

function quantityChanged(event)
{   

    console.log(event.target.parentElement.getElementsByClassName("btn-danger")[0].getAttribute('data-id'));
    var id = event.target.parentElement.getElementsByClassName("btn-danger")[0].getAttribute('data-id');
    var input = event.target;
    if(isNaN(input.value) || input.value<=0 )
    {
        input.value=1;
        
    }
    console.log(input.value)
    let updatedata={
        quantity: input.value
    }
    firebase.database().ref('cart/'+user+'/'+id).update(updatedata);

    updateCartTotal();
}

function updateCartTotal()
{
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
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
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+ total;
}




function adddetails(nameV, idnoV,priceV,linkV,quantityV)
{   
    document.getElementById("cart-items").innerHTML+=`
    <div class="cart-row">
        <div class="cart-item cart-column">
           
            <img class="cart-item-image" src=${linkV} width="100" height="100">
            <span class="cart-item-title">${nameV}</span>
        </div>
        <span class="cart-price cart-column">$${priceV}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quantityV}">
            <button class="rem-btn btn-danger" type="button" data-id="${idnoV}">REMOVE ITEM</button>
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
    

    firebase.database().ref('cart/'+user).once('value',function(snapshot){
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

