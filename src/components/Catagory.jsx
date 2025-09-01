function Catagory({name,id,customOnlCick}){
    
    //here is a custom onclicker which make the catagory box as clicked and run the function which is passed.
    //Passing the id and using it on the click handling function helps to identify which one was clicked
    //so using the customclick to pass the function and the id makes the catagory button responsive

    return<>
         <div onClick={()=>customOnlCick(name)} >{name}</div>
        </>
}

export default Catagory;