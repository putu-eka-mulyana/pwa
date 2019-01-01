let mymap = L.map('mapid').setView([-8.591098, 116.116369], 14);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <ahref="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidHVla2EiLCJhIjoiY2puMDg4cndmMGhsODNwcGJtaWR0cXR3bCJ9.67xmyU9rd8_BYwBlYUOQ6w'
}).addTo(mymap);
function findLocation(x,y){
    for(let i=0;i<places.length;i++){
        if(places[i].lokasi[0]==x && places[i].lokasi[1]==y){
            return i;
        }
    }
    return -1;
}
function showLocation(e){
    let ix= findLocation(e.latlng.lat,e.latlng.lng);
    if(ix >= 0){
        img.src=places[ix].gambar;
        par.textContent=places[ix].review;
    }
}
let gmb= document.getElementById("gmb");
let rev= document.getElementById("review");
let img =document.createElement("img");
let par =document.createElement("p");
img.className="gmbc";
gmb.appendChild(img);
rev.appendChild(par);

(async ()=>{
    const URL ="js/data.json";
    try{
        let resp= await(fetch(URL));
        let resp2 =await resp.json();
        localStorage.setItem('places',JSON.stringify(resp2.places));
    }catch(err){
        console.log(err);
    }
})();

let places = JSON.parse(localStorage.getItem('places'));
var marker = L.marker;
for(let p of places){
    let marker = L.marker(p.lokasi).addTo(mymap).bindPopup(p.sponsor);
    marker.on('click',showLocation);
}
let networkDataRecived=false;
let networkUpdate=


if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
        navigator.serviceWorker.register('/sw.js').then(function(registrasion){
            console.log('serviceWorker register success full with scop' + registrasion.scop)
        }).catch(function(err){
            console.log('serviceWorker register failed '+ err);
        })
    })
}
