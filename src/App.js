import React from 'react';
import './App.css';

class App extends React.Component
{    
   state = {
    hours : 0,
    stawka : 0,
    workdays:21,
    satsun:0,
    hollydays:0,
    illnessworkdays:0,
    illnessweekenddays:0,
    avaragehours:168,
    avaragemoney:4500,
    add:0,
    isConfirmed :false,
    temp :"brak danych",
    wiatr:"brak danych",
    stan:"brak danych",
    cisnienie:"brak danych",
    clouds:"brak danych",
    visibility:"brak danych",
    icon:"",
    time:"brak danych",
    city:"Warszawa",
    cityOk:"Warszawa",
    country:"PL",
    lat:"",
    lon:"",
    active:false,
    nasa:"",
    title:"",
    media_type:"",
    }     
    
componentDidMount(){

fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
.then(response=>response.json())
.then(dane=>this.setState({nasa:dane.hdurl,title:dane.title}));
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=04a91b73b71a422b152e409612f46049`)
.then(response=>response.json())
.then(dane=>this.setState({temp:dane.main.temp, wiatr:dane.wind.speed, stan:dane.weather[0].description, cisnienie:dane.main.pressure, visibility:dane.visibility, clouds:dane.clouds.all, icon:dane.weather[0].icon, time:new Date(dane.dt*1000).toLocaleTimeString()})
)

}

componentDidUpdate(prevProps,prevState){
if(prevState.active !== this.state.active||prevState.lat !==this.state.lat){
fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&lang=pl&appid=8cd238073b54d7ce90d3163bb612c7cb`)
.then(response=>response.json())
.then(dane=>this.setState({cityOk:dane.name,temp:dane.main.temp,wiatr:dane.wind.speed,stan:dane.weather[0].description,cisnienie:dane.main.pressure,visibility:dane.visibility,clouds:dane.clouds.all,icon:dane.weather[0].icon,time:new Date(dane.dt*1000).toLocaleTimeString(), country:dane.sys.country})
)
}
else if(prevState.city !== this.state.city) {fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=04a91b73b71a422b152e409612f46049`)
.then(response=>response.json())
.then(dane=>this.setState({temp:dane.main.temp, wiatr:dane.wind.speed, stan:dane.weather[0].description, cisnienie:dane.main.pressure,
visibility:dane.visibility, clouds:dane.clouds.all, icon:dane.weather[0].icon, time:new Date(dane.dt*1000).toLocaleTimeString(), cityOk:dane.name, country:dane.sys.country})
)}

}
               handleChangeGodziny=(e)=>{this.setState({hours:e.target.value})}  
               
handleChangeStawka=(e)=>{this.setState({stawka:e.target.value})}

handleChangeWorkdays=(e)=>{if(e.target.value.length>0){this.setState ({workdays:e.target.value})}else{this.setState({workdays:21})}}

handleChangeSatsun=(e)=>{this.setState ({satsun:e.target.value})}

handleChangeUrlop =(e)=>{this.setState ({hollydays:e.target.value})}

handleChangeCh1 =(e)=>{this.setState ({illnessworkdays:e.target.value})}

handleChangeCh2 =(e)=>{this.setState ({illnessweekenddays:e.target.value})}

handleChangeSrGodz =(e)=>{if(e.target.value.length>0){this.setState({avaragehours:e.target.value})}else{this.setState({avaragehours:168})}}

handleChangeSrWyp =(e)=>{if(e.target.value.length>0){this.setState ({avaragemoney:e.target.value})}else{this.setState({avaragemoney:4500})}}

handleChangeAdd=(e)=>{this.setState({add:e.target.value})}

handleChangeConfirm =()=>{this.setState({isConfirmed :!this.state.isConfirmed})}

handleChangeCity=(e)=>{if(e.target.value.length>0){this.setState({city:e.target.value,active:false})}else{this.setState({city:"Warszawa",active:true})}}

handleClickLocal=(e)=>{
     var showPosition=function(position){this.setState({lat:position.coords.latitude, lon:position.coords.longitude,active:true});
}
 showPosition = showPosition.bind(this);   
     
if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(showPosition);
}
 
}

                    
            render() {
  const {hours, stawka, workdays, satsun, hollydays, illnessworkdays, illnessweekenddays, avaragehours, avaragemoney, add }=this.state;          
            
          var workd =workdays-hollydays-illnessworkdays;  
var nadgodz=hours-workd*8;
if(nadgodz<0){nadgodz=0};




            const wyliczenie =()=>{return (hours * stawka+nadgodz*stawka*0.5 + satsun *stawka*0.5+hollydays *8*avaragemoney/avaragehours/0.7+illnessworkdays*avaragemoney/30/0.7*0.8 + illnessweekenddays*avaragemoney/30/0.7*0.8+add*1)*0.691439;

     }
let wyl=wyliczenie();
if(wyl<0) {wyl=0};
if(this.state.isConfirmed) {wyl=wyl-0.1928*wyl};
wyl=Math.round(wyl);
var ob=wyl.toString();
var obl=ob.replace(/\B(?=(\d{3})+(?!\d))/g, " ");



        
            const Wynik = ()=> {return(<h3 className="wynik">Twoja wypłata powinna wynieść:<br/><span style={{color:'#FD5B35', fontSize:'1.5em',letterSpacing:'3px'}}>{obl}</span> PLN</h3>)}
            
const data=new Date();
const year=data.getFullYear();
let miesiac=data.getMonth();
const day=data.getDate();
switch(miesiac){
default : miesiac="styczeń";
break;

case 1 : miesiac="luty";
break;

case 2 : miesiac="marzec";
break;

case 3 : miesiac="kwiecień";
break;

case 4 : miesiac="maj";
break;

case 5 : miesiac="czerwiec";
break;

case 6 : miesiac="lipiec";
break;

case 7 : miesiac="sierpień";
break;

case 8 : miesiac="wrzesień";
break;

case 9 : miesiac="październik";
break;

case 10 : miesiac="listopad";
break;

case 11 : miesiac="grudzień";
break;
}


             return <div>
              
             
        <Wynik/><br/><br/><br/>
             <div id="tytul"><h2>Kalkulator Wynagrodzenia</h2><p>NETTO<br/>(z uwzg. standardowego uczestnictwa w PPK)</p></div>
             <ol>
                 
             <label><li>Podaj łączną liczbę przepracowanych godzin w danym miesiącu<br/><input className="input" type="number" onChange={this.handleChangeGodziny}/></li> <br/></label>
                 
             <label><li>
Podaj twoją stawkę godzinową<br/><input className="input" type="number" onChange ={this.handleChangeStawka}/></li><br/></label>

<label><li>Podaj liczbę dni roboczych danego miesiąca<br/><input className="input" type="number" placeholder="wst. 21" onChange={this.handleChangeWorkdays}/></li><br/></label>   

<label><li>Podaj łączną liczbę godzin przepracowanych w soboty, niedziele i święta<br/><input className="input" type="number" onChange={this.handleChangeSatsun}/></li><br/></label>

<label><li>Podaj ilość dni przebytych na urlopie<br/><input className="input" type="number" onChange={this.handleChangeUrlop}/></li><br/></label>

<label><li>Podaj ilość dni powszednich przebytych na zwolnieniu lekarskim<br/><input className="input" type="number" onChange={this.handleChangeCh1}/></li><br/>
</label>

<label><li>Podaj ilość dni wolnych od pracy a przebytych na zwolnieniu lekarskim<br/><input className="input" type="number" onChange={this.handleChangeCh2}/></li><br/></label>

<label><li>Podaj liczbę godzin uśrednioną z trzech ostatnich miesięcy<br/><input className="input" type="number" placeholder="wst. 168" onChange={this.handleChangeSrGodz}/></li><br/></label>

<label><li>Podaj kwotę wypłaty uśrednioną z trzech ostatnich miesięcy<br/><input className="input" type="number" placeholder="wst. 4500" onChange={this.handleChangeSrWyp}/></li><br/></label>

<label><li>Podaj kwotę brutto ewentualnych dodatków typu: premia, mieszkaniówka<br/><input className="input" type="number" onChange={this.handleChangeAdd}/></li><br/></label>


<label><input type='checkbox' id="box" onChange ={this.handleChangeConfirm} checked={this.state.isConfirmed}/>zaznacz jeśli "wpadłeś" w drugi próg podatkowy</label><br/> <br/><hr/>  
     
<label>Pogoda w Twoim mieście: <input className="input" type="text" placeholder={this.state.cityOk} style={{width:"8em"}} onChange={this.handleChangeCity}></input></label><button onClick={this.handleClickLocal} style={{width:"2em",height:"1.6em",fontSize:"1.7em",borderRadius:"50%",outline:"none"}}>🛰️</button>

</ol>


     
 <div id="footer"><br/>Aktualna pogoda dla miasta <span style={{color:"#0000FF"}}>{this.state.cityOk} - {this.state.country}</span> (<span style={{color:"black", fontWeight:"100"}}>{this.state.time}</span>):<br/> 🌡️temp.: <span>{this.state.temp} &#176;C</span> 💨wiatr: <span>{this.state.wiatr} m/s</span><br/>⛱️stan: <span>{this.state.stan}</span> ⏲️ciśnienie: <span>{this.state.cisnienie} hPa</span><br/>👁️widoczność: <span>{this.state.visibility} m</span> ⛅zachmurzenie:  <span>{this.state.clouds} %</span><br/><img className="img" src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt="icon"/><br/><div style={{textAlign:"right",marginRight:"2%"}}><em>Wrzutka Dnia od </em><img className="img" style={{marginBottom:"-0.75em",width:"3.5em",height:"3.5em"}} src="https://drive.google.com/uc?id=1rwQwD3c8ppQ2p2ALj-PlOidJ3Sfo0_ro" alt="NASA"/></div><label><img src={this.state.nasa} alt="FOTKA" style={{width:"95%", height:"95%"}}/><br/><div style={{color:"#00F",fontSize:"1.3em",textAlign:"left",marginLeft:"2.5%"}}><em>{this.state.title}</em></div></label><br/>{day} {miesiac} {year} - &copy; Grzegorz Dychała</div>
</div>
          
             
                }
   }

export default App;
