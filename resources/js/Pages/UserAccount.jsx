import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";


export default function Home(Auth){
    const props = usePage().props;

    return(
    <AuthLayout
        name={Auth.auth.user.first_name + " " +Auth.auth.user.last_name}
    >
        <p>Hello World!</p>
        <div>{console.log(props)}</div>
    </AuthLayout>)

}