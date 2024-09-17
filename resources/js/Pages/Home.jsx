import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/AuthLayout";


function isAuth(Auth){
    console.log(Auth)
}

export default function Home( Auth ){
    if (Auth) {
        return (
            <AuthLayout
                name={Auth.auth.user.first_name + " " +Auth.auth.user.last_name}
            >
                <div>{isAuth(Auth)}</div>
                <div className="grid grid-cols-4 gap-1">
                    <section className="col-start-2">
                        <h3>Premier League Standings</h3>
                    </section>
                    <section className="col-start-3 text-center">
                        <h3>Articles </h3>
                    </section>
                </div>
            </AuthLayout>
        )
    }else{
    return (
        <GuestLayout>
            <div className="grid grid-cols-4 gap-1">
                <section className="col-start-2">
                    <h3>Premier League Standings</h3>
                </section>
                <section className="col-start-3 text-center">
                    <h3>Articles </h3>
                </section>
            </div>
        </GuestLayout>
    )
    }

}

