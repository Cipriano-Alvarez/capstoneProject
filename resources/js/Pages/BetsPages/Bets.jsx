import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import {Link} from "@inertiajs/react";



export default function Bets(Auth){
    const props = usePage().props
    

    if(!props.logged_in){
        return(
            <GuestLayout>
                <h1>hello from guest layout</h1>
            </GuestLayout>
        )
    }else{
        return(
            <AuthLayout>
                <h1>hello from auth layout</h1>
            </AuthLayout>
        )
    }


}