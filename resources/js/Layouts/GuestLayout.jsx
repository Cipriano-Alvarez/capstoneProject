import NavLink from "@/Components/NavLink";


//this page acts as the deault layout for when users are not logged in routes all still need to be made

export default function GuestLayout({ children }) {
    return (

        <main className="flex flex-col min-h-screen">
            <header className="mb-10 ">
                <h1 className="text-3xl mt-5 ml-3">FootyForecast</h1>
                <div className="mt-5 bg-gray-50 pt-5 pb-5 rounded">
                    <nav>
                        <ul className="grid grid-cols-3">
                            <div className="flex flex-row col-start-1 col-end-2 ml-3">
                                <li><NavLink className="text-xl mr-3" href={route("home")} active={route().current("home")}>Home</NavLink></li>
                                <li><NavLink className="text-xl mr-3" href="#" >Premier League</NavLink></li>
                                <li><NavLink className="text-xl" href="#" >Bets</NavLink></li>
                            </div>
                            <div className="flex flex-row col-start-3 justify-end mr-14">
                                <li><NavLink className="text-xl" href={route("login")} active={route().current("login")}>Login</NavLink></li>
                                <li><NavLink className="text-xl ml-3" href={route("signup")} active={route().current("signup")}>Sign Up</NavLink></li>
                            </div>
                        </ul>
                    </nav>
                </div>
            </header>
            <section className="mb-14">
                {children}
            </section>
            <footer className=" bg-gray-50 text-center mt-auto">
                <h4 className="text-center">This webpage Was created by Cipriano Alvarez</h4>
            </footer>
        </main>
    )
}