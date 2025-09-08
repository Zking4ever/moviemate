function Header({home}){
    return (
        <>
        <header> 
            <h2 className="mylogo">MovieMate</h2>
            <nav>
                <a href="#home" onClick={home}>Home</a>
                <a href="#">Favorite</a>
            </nav>
            <button>Sign in</button >
        </header>
        </>
    )
}

export default Header;
