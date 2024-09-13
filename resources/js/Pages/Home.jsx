import GuestLayout from "@/Layouts/GuestLayout";

const Home = () => {
    return (
        <>
        <div className="grid grid-cols-4 gap-1">
            <section className="col-start-2">
                <h3>Premier League Standings</h3>
            </section>
            <section className="col-start-3 text-center">
                <h3>Articles </h3>
            </section>
        </div>    
        </>
    )
}

Home.layout = page => <GuestLayout children={page} title="Home"/>
export default Home