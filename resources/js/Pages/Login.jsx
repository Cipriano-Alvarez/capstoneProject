import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import { useState } from "react";

//loggin page
//loggin in page won't render, assuming problem has to do with the fact that laravel comes with a predefined login page

const login = () =>{
    const [username, onChangeusername] = useState("")
    const [password,onPasswordChange] = useState("")


    return(
    <>
        <div>
            <TextInput></TextInput>
        </div>
    </>)
}

login.layout = page => <GuestLayout children={page} title="login" />

export default login