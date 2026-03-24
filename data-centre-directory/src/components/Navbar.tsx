const Navbar = () => {
    return (
        <nav className="flex justify-around m-5 bg-blue-300">
            <div className="bg-red-300 p-5">
                <a href="/">
                    Home
                </a>
            </div>
            <div className="bg-red-300 p-5">
                <a href="/about">
                    About
                </a>
            </div>
            <div className="bg-red-300 p-5">
                <a href="/map">
                    Map
                </a>
            </div>
        </nav>
    )
}

export default Navbar;