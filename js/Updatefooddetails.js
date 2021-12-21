//reading data
      var nameV,idV,priceV;
      
      var imgname,imgurl;
      var files=[];
      var reader=new FileReader();
      console.log(localStorage.getItem('Idno'));
      
       firebase.database().ref('food/'+localStorage.getItem('Idno')).once('value',function(snapshot){
           
            var Fname = snapshot.val().name;
            var idno = snapshot.val().idno;
            var price= snapshot.val().price;
            var link = snapshot.val().Link;    
            document.getElementById('idbox').value = idno;
            document.getElementById('namebox').value = Fname;
            document.getElementById('pricebox').value = price;
            document.getElementById('myimg').src = link;
            console.log("hello",Fname,idno,price,link);
    
        }); 


      
    //   console.log("Value:" ,document.getElementsByName('idbox').value);

      function ready()
      {   
          
          idV=document.getElementById('idbox').value;
          nameV=document.getElementById('namebox').value;
          
          priceV=document.getElementById('pricebox').value;
         
          console.log("intitialized");

      }
      //insert
      document.getElementById('insert').onclick=function()
      {
          ready();


          // files[0]=document.getElementById("myimg").src

          console.log("img upload");
          console.log(document.getElementById("myimg").src);


          if(files.length==0 && document.getElementById("myimg").src.length!==0){
            firebase.database().ref('food/'+idV).set({
              name: nameV,
              idno: idV,
              price: priceV,
              Link : document.getElementById("myimg").src
             },(error) => {
              if (error) {
              } else {
                  location.href = "menu.html";
              }
            });

            alert('details Updated successfullly');
          }
          else{
          imgname= document.getElementById('idbox').value +"_"+ document.getElementById('namebox').value;;
          var uploadtask = firebase.storage().ref('images/'+imgname+".png").put(files[0]);

          uploadtask.on('state_changed',function(snapshot){
              var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
              document.getElementById('upprogress').innerHTML='Progress :'+progress+'%'
          },

          //error

          function(error){
              alert('error in saving file');
          },
          //submit img link to database
          function(){
                    uploadtask.snapshot.ref.getDownloadURL().then(function(url){
                    imgurl=url;
                    console.log("insert");

                    firebase.database().ref('food/'+idV).set({
                        name: nameV,
                        idno: idV,
                        price: priceV,
                        Link : imgurl
                    },(error) => {
                        if (error) {
                        } else {
                            location.href = "menu.html";
                        }
                      });
                    
                   
                    console.log("inserted");
                    firebase.database().ref('food/'+idV).on('value',function(snapshot){
                        console.log(snapshot.val().name);
                        console.log(snapshot.val().idno);
                        console.log(snapshot.val().price);
                        console.log(snapshot.val().Link);
                    });
    
                     alert('details Updated successfullly');
                 
                
                     
                     
                     

            }
          );
          
         
        });
      }
        

      }
      document.getElementById("select").onclick= function(e)
      {   console.log("select");
          var input=document.createElement('input');
          input.type='file';
          input.onchange=e=>{
              files= e.target.files;
              reader = new FileReader();
              reader.onload = function()
              {
                
                document.getElementById("myimg").src = reader.result;
              }
              reader.readAsDataURL(files[0]);
          }
          input.click();
      }