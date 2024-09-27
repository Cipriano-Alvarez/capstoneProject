import AuthLayout from "@/Layouts/AuthLayout";
import AdminAccountSideNav from "./Shared/AdminAccounSideNav";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";

export default function AdminAccountPassword(Auth){
    const props = usePage().props;
    const [password,onChangePassword] = useState("");
    const [confirm_password,onChangeConfirmPassword] = useState("");

    function handlesubmit(e){
        e.preventDefault()
        router.put('/account/updatePassword',{'password':password, 'password_confirmation':confirm_password});
    }
    return(
        <AuthLayout name={Auth["auth"]["user"]["first_name"] +" " +Auth["auth"]["user"]["last_name"]}
        className="relative"
        >
            <div className="grid grid-cols-5">
                <AdminAccountSideNav Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]}/>
                <div className="col-span-4">
                    <h1 className="text-3xl text-center">Update Password</h1>
                    <form className="text-center mt-10" onSubmit={handlesubmit}>
                            <div className="inline-flex me-5">
                                <InputLabel className="text-xl me-3">New Password</InputLabel>
                                <TextInput value={password} onChange={(event)=>{
                                    onChangePassword(event.target.value)
                                }} type="password"/>
                            </div>
                            <div className="inline-flex ">
                                <InputLabel className="text-xl me-3">Confirm Password</InputLabel>
                                <TextInput className="" 
                                    value={confirm_password}
                                    onChange={(event)=>{
                                        onChangeConfirmPassword(event.target.value)
                                    }} 
                                    type="password"

                                ></TextInput>                        
                            </div>
                            <div className="mt-10">
                                <PrimaryButton type="submit">Submit</PrimaryButton>
                            </div>
                        </form>
                        { props["errors"]["password"] !== undefined ? <div className="bg-red-100 border border-red-400 text-center text-red-700 px-4 py-3 rounded relative mt-1" role="alert">
                            {props["errors"]["password"]} 
                        </div>:<></>}
                        { props["errors"]["confirmation_password"] !== undefined ? <div className="bg-red-100 border border-red-400 text-center text-red-700 px-4 py-3 rounded relative mt-1" role="alert">
                            {props["errors"]["confirmation_password"]} 
                        </div>:<></>}
                </div>
            </div>
        </AuthLayout>
    )
}