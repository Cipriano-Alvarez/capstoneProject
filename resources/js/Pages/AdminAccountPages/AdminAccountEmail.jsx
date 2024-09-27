import AuthLayout from "@/Layouts/AuthLayout";
import AdminAccountSideNav from "./Shared/AdminAccounSideNav";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function UserAccountEmail(Auth){
    const props = usePage().props;
    const [email, onChangeEmail] = useState("");


    function handlesubmit(e){
        e.preventDefault()
        router.put('/adminAccount/updateEmail',{'email':email});
    }

    return(
        
        <AuthLayout name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]}   className="relative">
            <div className="grid grid-cols-5">
            <AdminAccountSideNav
            Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]}

            />
            <div className="col-span-4">
                
                <h1 className="text-3xl text-center">Update Email</h1>
                <form className="text-center mt-10" onSubmit={handlesubmit}>
                    <div className="inline-flex me-5">
                        <InputLabel className="text-xl me-3">Old Email</InputLabel>
                        <TextInput value={props["currentEmail"]} disabled/>
                    </div>
                    <div className="inline-flex ">
                        <InputLabel className="text-xl me-3">Enter new email</InputLabel>
                        <TextInput className=""
                            value={email}
                            onChange={(event)=>{
                                onChangeEmail(event.target.value)
                            }}
                        ></TextInput>                        
                    </div>
                    <div className="mt-10">
                        <PrimaryButton type="submit">Submit</PrimaryButton>
                    </div>
                </form>
                { props["errors"]["email"] !== undefined ? <div className="bg-red-100 border border-red-400 text-center text-red-700 px-4 py-3 rounded relative mt-1" role="alert">
                    {props["errors"]["email"]}
                </div>:<></>}
            </div>
            </div>
        </AuthLayout>
    )
}