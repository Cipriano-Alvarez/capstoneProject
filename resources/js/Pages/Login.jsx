import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

import { useState } from "react";
import { router } from "@inertiajs/react";



const login = (errors) =>{
    const [email, onChangeEmail] = useState("")
    const [password,onPasswordChange] = useState("")


    function handlesubmit(e){
        e.preventDefault();
        var values = {'email':email,'password':password}
        router.post('/login',values)
    }


    return(
    <>
        
        <div className="grid grid-cols-5 justify-items-center">
            <div className="col-start-3">
               <h1 className="text-5xl mb-10 pr-20">Login</h1> 
            </div>
            
            <div className="col-start-3 ">
                <form onSubmit={handlesubmit}>
                    <InputLabel className="text-2xl ">Email</InputLabel>
                    <TextInput
                        value={email}
                        onChange={(event)=>{
                            onChangeEmail(event.target.value)
                        }}
                    />
                    <InputLabel className="text-2xl pt-5">Password</InputLabel>
                    <TextInput
                        value={password}
                        onChange={(event)=>{
                            onPasswordChange(event.target.value);
                        }}
                        type="password"
                    />
                    <div className="pt-2">
                        <PrimaryButton type="submit">Submit</PrimaryButton>
                    </div>
                </form>
                {errors.errors.email &&
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1">
                        {errors.errors.email}
                    </div>
                }
                {errors.errors.password &&
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1">
                        {errors.errors.password}
                    </div>
                }

            </div>
        </div>
    </>)
}

login.layout = page => <GuestLayout children={page} title="login" />

export default login