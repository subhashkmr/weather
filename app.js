window.addEventListener('load',()=>{
      let long;
      let lat;
      var description=document.querySelector(".description");
      var timezone=document.querySelector(".timezone");
      var degree=document.querySelector(".degree");
      var p =document.querySelector("#p")
      
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=>{
        	long=pos.coords.longitude;
        	lat= pos.coords.latitude;
             const proxy='https://cors-anywhere.herokuapp.com/'
        	 const api=`${proxy}https://api.darksky.net/forecast/cd78fb5b74209b6c9455612b6b545d8b/${lat},${long}`;
     
        fetch(api)
                .then(data =>{
                	return data.json();
                })
                .then(response=>{
                     console.log(response);
                     const {temperature, summary,icon}=response.currently;
                     degree.innerText=((temperature-32)*5/9).toFixed(2);
                     p.addEventListener("click" , function(){
                             if(p.innerHTML==="F"){
                              p.innerText="C";
                              degree.innerText=((temperature-32)*5/9).toFixed(2);
                             }
                             else{
                              p.innerHTML="F";
                              degree.innerText=temperature;
                             }
                      })
                     
                     description.innerText=summary;
                     timezone.innerText=response.timezone;
                     alert("sorry for icon not display ,if find it i will correct it ")
                   ;setIcons(icon , document.querySelector(".icon") );
                });
      });
      }
      else
      {
      	alert("please allow your location!!!");
      }

      function setIcons(icon ,iconID) {
    const skycons = new Skycons({"color": "white"});
    const currentIcon=icon.replace(/-/,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
 
      }

});