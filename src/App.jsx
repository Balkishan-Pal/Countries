import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';


function App() {

  const [list,setList]=useState([])
  const [filterr,setFilterr] =useState([])
 const [text,setText] = useState("")
 const [darkmode,setDarkmode]=useState(false)

useEffect(()=>{
  handleget()
},[])

const handleget=async()=>{
  const {data} = await axios.get("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json")
  console.log(data)
  setList(data)
  setFilterr(data)
}

const handlechange =(e)=>{
  const {value} = e.target;
  setText(value)
}

const handleSearch =()=>{
  // const option = e.target.value

 const update = list.filter((e)=>e.name.toLowerCase().includes(text.toLowerCase()))
 setFilterr(update)
 setText("")
}

  return (
    <div className={darkmode?"dark":"App"}>
      <h1>Search Your Country</h1>
      <div id="input123">
      <input id={darkmode?"inputsearchdark":"inputsearch"} type="text" placeholder = "Enter country name to search" onChange={handlechange} value ={text}></input>
      <button className={darkmode?"darkbutton":"lightbutton"} onClick={handleSearch}>Search</button>
      <div id="darkesthour">
      <input id="darktoggle" type='checkbox' onChange={()=>{setDarkmode(!darkmode)}}></input>
      <label id="darklabel">Apply {darkmode?"Light":"Dark"} Mode</label>
      </div>
      </div>
      <div id="datadiv">
      {
        filterr.map((e,i)=>
        <div key={e.id} className={ darkmode?"darkparticular": "particulardiv"}> 
            
            <img src={e.flag}></img>
            <h2>{e.name}</h2>
            <p><b>Native name</b> : {e.nativeName}</p>
            <div className="first">
            <span><b>Capital</b> - {e.capital}</span>
            <span><b>Population</b> - {e.population}</span>
            </div>
            <div className="first">
            <span><b>Region</b> - {e.region}</span>
            <span><b>Subregion</b> - {e.subregion}</span>
            </div>
            
           </div>
        )
      }
      </div>
    </div>
  );
}

export default App;
