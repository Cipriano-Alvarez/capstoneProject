import AuthLayout from "@/Layouts/AuthLayout"
import AdminAccountSideNav from "./Shared/AdminAccounSideNav";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";




export default function AdminAccountNewAdmin(){
    const props = usePage().props
    const [email,setEmail] = useState("");
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [repassword,setRePassword]= useState("");

    function submitAdmin(e){
        e.preventDefault();
        const values = {'email':email,'firstname':firstname,'lastname':lastname,'password':password,'password_confirmation':repassword}
        router.post('/adminAccount/newAdmin/makeAdmin',values);
    }

    
    return(
        <AuthLayout name={props.auth.user.first_name + " " + props.auth.user.last_name}>
            <div className="grid grid-cols-5">
                <AdminAccountSideNav Name={props.auth.user.first_name + " " + props.auth.user.last_name}/>
                <div className="col-span-4 text-center ">
                    <h1 className="text-3xl text-center mb-8">New Admin</h1>
                    <form onSubmit={submitAdmin}>
                        <InputLabel className="text-xl" >First Name</InputLabel>
                        <TextInput className="mb-3" value={firstname} onChange={(event)=>{
                            setFirstName(event.target.value);
                        }} />
                        {props.errors.firstname &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1 mb-1 " role="alert" >
                                {props.errors.firstname}
                            </div>
                        }


                        <InputLabel className="text-xl" >Last Name</InputLabel>
                        <TextInput className="mb-3" value={lastname} onChange ={(event)=>{
                            setLastName(event.target.value);
                        }} />

                        {props.errors.lastname &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1 mb-1 " role="alert" >
                                {props.errors.lastname}
                            </div>
                        }

                        <InputLabel className="text-xl" >Email</InputLabel>
                        <TextInput className="mb-3" value={email} onChange={(event)=>{
                            setEmail(event.target.value);
                        }} />

                        {props.errors.email &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1 mb-1 " role="alert" >
                                {props.errors.email}
                            </div>
                        }


                        <InputLabel className="text-xl" >Password</InputLabel>
                        <TextInput className="mb-3" type="password" value={password} onChange={(event)=>{
                            setPassword(event.target.value);
                        }} />

                        {props.errors.password &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1 mb-1 " role="alert" >
                                {props.errors.password}
                            </div>
                        }


                        <InputLabel className="text-xl" >Confirm Password</InputLabel>
                        <TextInput className="mb-3" type="password" value={repassword} onChange={(event)=>{
                            setRePassword(event.target.value);
                        }} />

                        {props.errors.password_confirmation &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1 mb-1 " role="alert" >
                                {props.errors.password_confirmation}
                            </div>
                        }
                        <div className="mt-2 ">
                            <SecondaryButton type="submit">Submit</SecondaryButton>
                        </div>

                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}