import AuthLayout from "@/Layouts/AuthLayout";

export default function UserAccountPassword(Auth){
    return(
        <AuthLayout
        name={
            Auth["auth"]["user"]["first_name"] +
             " " +Auth["auth"]["user"]["last_name"]
            }
        className="relative"
        >
            <h1>hello world</h1>

        </AuthLayout>
    )
}