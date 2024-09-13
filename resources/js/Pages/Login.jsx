import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

import { useState } from "react";

//loggin page
//loggin in page won't render, assuming problem has to do with the fact that laravel comes with a predefined login page

const login = () =>{
    const [username, onChangeusername] = useState("")
    const [password,onPasswordChange] = useState("")


    return(
    <>
        
        <div className="grid grid-cols-5 justify-items-center">
            <div className="col-start-3">
               <h1 className="text-5xl mb-10 pr-20">Login</h1> 
            </div>
            
            <div className="col-start-3 ">
                <form>
                    <InputLabel className="text-2xl ">Email</InputLabel>
                    <TextInput
                        
                    />
                    <InputLabel className="text-2xl pt-5">Password</InputLabel>
                    <TextInput></TextInput>
                </form>

            </div>
        </div>
    </>)
}

login.layout = page => <GuestLayout children={page} title="login" />

export default login