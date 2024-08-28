import NavLink from "@/Components/NavLink";

export default function GuestLayout({children}){
    return(
    <main>
        <header>
            <h1>FootyForecast</h1>
            <div>
                <nav>
                    <ul>
                        <li><NavLink href={route("home")} active={route().current("home")}>Home</NavLink></li>
                        <li><NavLink href="#" >Premier League</NavLink></li>
                        <li><NavLink href="#" >Bets</NavLink></li>
                        <li><NavLink href="#">Login</NavLink></li>
                        <li><NavLink href="#">Sign Up</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
        <section>
            {children}
        </section>
    </main>
    )
}