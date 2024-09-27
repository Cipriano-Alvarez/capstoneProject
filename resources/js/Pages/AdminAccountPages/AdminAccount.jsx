import AuthLayout from "@/Layouts/AuthLayout";
import AdminAccountSideNav from "./Shared/AdminAccounSideNav";

export default function AdminAccount(Auth){


    return(
        <AuthLayout  name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} admin={true}>
            <div className="grid grid-cols-5">
                <AdminAccountSideNav Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} className="border"/>
                <div className="col-span-4">
                    <h1 className="text-xl text-center">Welcome Admin</h1>
                </div>
            </div>
        </AuthLayout>
    )
}