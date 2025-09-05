function Catagory({name,customOnlCick,id,index}){
    
    //here is a custom onclicker which make the catagory box as clicked and run the function which is passed.
    //Passing the id and using it on the click handling function helps to identify which one was clicked
    //so using the customclick to pass the function and the id makes the catagory button responsive

    //the index is used in the function to set the corresponding catagorydata
    return<>
         <div onClick={()=>customOnlCick(id,index)} >
            {name}</div>
        </>
}

export default Catagory;