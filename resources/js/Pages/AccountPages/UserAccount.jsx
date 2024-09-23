import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";
import UserAccountSideNav from "@/Pages/AccountPages/shared/UserAccountSideNav";

function Favourites(teams){
return(
    <ul className="inline-flex size-32 space-x-2 mt-5">
        {teams["team"].map((item,index)=>(
            <li key={index}><img src={item["logo"]}/></li>
        ))}
    </ul>
)
}

export default function UserAccount(Auth){
    const props = usePage().props;

    return(
    <AuthLayout
        name={Auth.auth.user.first_name + " " +Auth.auth.user.last_name}
        className="relative"
    >
        <div className="grid grid-cols-5 ">
            <UserAccountSideNav Auth={Auth} className="border"/>
            <div className="col-span-4 text-center">
                <h1 className="text-xl font-medium">User Account</h1>
                <div className="h-1/2">
                    <Favourites team={props['favTeams']} />
                </div>

            </div>
        </div>
    </AuthLayout>)

}