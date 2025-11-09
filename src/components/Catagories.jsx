
import Catagory from './Catagory'
import { useState } from 'react'
import {GenereData,MoodData} from "../assets/data"

function Catagories({catagoryHandler}) {

  const [catagoryType,setCatagoryType] = useState("mood");


    return (
       <section>
              <h2>Find movies based on</h2> 
              <select className='catagorySelector' name="catagoryType" id="catagoryType" onChange={(e)=>setCatagoryType(e.target.value)} value={catagoryType}> 
                <option value="mood" >Mood</option>
                <option value="genere" >Genere</option>
              </select>
              <div className="catagory">
                    {(catagoryType==='mood'? <h3>Mood</h3> : <h3>Genere</h3>)}
                    <div className="catGrid">
                        { (catagoryType==='mood'? 
                                      MoodData.map((value)=>( <Catagory customOnlCick={catagoryHandler} id={value.id} index={value.key}name={value.name} key={value.key}  />))
                                    :  GenereData.map((value)=>( <Catagory customOnlCick={catagoryHandler} id={value.id} index={value.key}name={value.name} key={value.key}  />)) )}
                    </div>
              </div>
            </section>
    )
}

export default Catagories;