import GuestLayout from "@/Layouts/GuestLayout";

const Home = () => {
    return (
        <>
            <h1>Hello World</h1>
            <p>Exciting thigs are happening</p>
        </>
    )
}

Home.layout = page => <GuestLayout children={page} title="Home"/>
export default Home