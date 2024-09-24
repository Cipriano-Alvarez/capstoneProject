import AuthLayout from "@/Layouts/AuthLayout";
import UserAccountSideNav from "./shared/UserAccountSideNav";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function UserAccountEmail(Auth){
    const props = usePage().props;
    const [email, onChangeEmail] = useState("");


    function handlesubmit(e){
        router.post('/account/updateEmail',{'email':email});
    }

    return(
        
        <AuthLayout name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]}   className="relative">
            <div className="grid grid-cols-5">
            <UserAccountSideNav
            Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]}

            />
            <div className="col-span-4">
                
                <h1 className="text-3xl text-center">Update Email</h1>
                <form className="text-center mt-10">
                    <div className="inline-flex">
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
            </div>
            </div>
        </AuthLayout>
    )
}