import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";
import UserAccountSideNav from "@/Pages/AccountPages/shared/UserAccountSideNav";


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
                <h1 className="text-xl font-medium">Favorite Teams</h1>
            </div>
        </div>
    </AuthLayout>)

}