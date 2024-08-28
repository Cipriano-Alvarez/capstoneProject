import NavLink from "@/Components/NavLink";

export default function GuestLayout(){
    <main>
        <header>
            <h1>Site TItle</h1>
            <div>
                <nav>
                    <ul>
                        <li><NavLink href={route("Home")} active={route.current("Home")}>Home</NavLink></li>
                        <li><NavLink href={route("PremierLeague")} active={route.current("PremierLeague")}></NavLink></li>
                        <li><NavLink href={route("Bets")} active={route.current("Bets")}></NavLink></li>
                        <li><NavLink href={route("Login")} active={route.current("Login")}></NavLink></li>
                        <li><NavLink href={route("SignUp")} active={route.current("SignUp")}></NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
        <section>
            {children}
        </section>
    </main>
}