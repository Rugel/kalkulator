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
        isConfirmed :false,          }
                   handleChangeGodziny=(e)=>{this.setState({hours:e.target.value})}  
                   
handleChangeStawka=(e)=>{this.setState({stawka:e.target.value})}

handleChangeWorkdays=(e)=>{this.setState ({workdays:e.target.value})}

handleChangeSatsun=(e)=>{this.setState ({satsun:e.target.value})}

handleChangeUrlop =(e)=>{this.setState ({hollydays:e.target.value})}

handleChangeCh1 =(e)=>{this.setState ({illnessworkdays:e.target.value})}

handleChangeCh2 =(e)=>{this.setState ({illnessweekenddays:e.target.value})}

handleChangeSrGodz =(e)=>{this.setState ({avaragehours:e.target.value})}

handleChangeSrWyp =(e)=>{this.setState ({avaragemoney:e.target.value})}

handleChangeConfirm =()=>{this.setState({isConfirmed :!this.state.isConfirmed})}


                        
                render() {
 var nadgodz=this.state.hours-this.state.workdays*8;
 if(nadgodz<0){nadgodz=0}
 
 const {hours, stawka, satsun, hollydays, illnessworkdays, illnessweekenddays, avaragehours, avaragemoney }=this.state
 
                const wyliczenie =()=>{return (1200+hours * stawka+nadgodz*stawka*0.5 + satsun *stawka*0.5+hollydays *8*avaragemoney/avaragehours/0.7-40*hollydays+hollydays*4*stawka+illnessworkdays*avaragemoney/30/0.7*0.8-40*illnessworkdays+illnessworkdays*4*stawka + illnessweekenddays*avaragemoney/30/0.7*0.8-40*illnessweekenddays )*0.98*0.709639;
 
         }
let wyl=wyliczenie();
if(this.state.isConfirmed){
    wyl=wyl-0.1928*wyl
}
wyl=Math.round(wyl);
var obl=wyl.toString();
var arr=[];
for(const el of obl) {
arr.push(el)};

 if(obl<2e30){
   arr[arr.length-4]+=" " ;
   arr[arr.length-7]+=" ";
   arr[arr.length-10]+=" ";
   arr[arr.length-13]+=" ";
   arr[arr.length-16]+=" ";
   arr[arr.length-19]+=" ";
  } 

                
                const Wynik = ()=> {  return(<h3 className="wynik">Twoja wypłata powinna wynieść:<br/><span style={{color:'#FD3C37', fontSize:'1.5em',letterSpacing:'3px'}}>{arr}</span> PLN</h3>)}
                
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
                 <div id="tytul"><h2>Kalkulator Wynagrodzenia</h2><p>NA ŁAPĘ<br/>(z dodatkiem mieszkaniowym 1200 zł brutto oraz 2% wpłatą na PPK)</p></div>
                 <ol>
                     
                 <label><li>Podaj łączną liczbę przepracowanych godzin w danym miesiącu<br/><input className="input" type="number" onChange={this.handleChangeGodziny}/></li> <br/></label>
                     
                 <label><li>
 Podaj twoją stawkę godzinową<br/><input className="input" type="number" onChange ={this.handleChangeStawka}/></li><br/></label>
 
  <label><li>Podaj liczbę dni roboczych danego miesiąca<br/><input className="input" type="number" onChange={this.handleChangeWorkdays}/></li><br/></label>   
  
    <label><li>Podaj łączną liczbę godzin przepracowanych w soboty, niedziele i święta<br/><input className="input" type="number" onChange={this.handleChangeSatsun}/></li><br/></label>
  
 <label><li>Podaj ilość dni przebytych na urlopie<br/><input className="input" type="number" onChange={this.handleChangeUrlop}/></li><br/></label>
 
 <label><li>Podaj ilość dni powszednich przebytych na zwolnieniu lekarskim<br/><input className="input" type="number" onChange={this.handleChangeCh1}/></li><br/>
</label>
 
 <label><li>Podaj ilość dni wolnych od pracy a przebytych na zwolnieniu lekarskim<br/><input className="input" type="number" onChange={this.handleChangeCh2}/></li><br/></label>
 
 <label><li>Podaj liczbę godzin uśrednioną z trzech ostatnich miesięcy<br/><input className="input" type="number" onChange={this.handleChangeSrGodz}/></li><br/></label>
 
  <label><li>Podaj kwotę wypłaty uśrednioną z trzech ostatnich miesięcy<br/><input className="input" type="number" onChange={this.handleChangeSrWyp}/></li><br/></label>


   <label><input type='checkbox' id="box" onChange ={this.handleChangeConfirm} checked={this.state.isConfirmed}/>zaznacz jeśli "wpadłeś" w drugi próg podatkowy</label><br/> <br/>        
  
  
  </ol>
         
     <div id="footer">{day} {miesiac} {year} - wyk. Grzegorz Dychała</div>  
</div>
              
                 
                    }
       }

export default App;
