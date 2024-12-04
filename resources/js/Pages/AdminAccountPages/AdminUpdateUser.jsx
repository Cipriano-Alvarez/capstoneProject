import AuthLayout from "@/Layouts/AuthLayout";
import AdminAccountSideNav from "./Shared/AdminAccounSideNav";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import {Link} from "@inertiajs/react"
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";


export default function AdminUpdateUser(Auth){
    const props = usePage().props;
    const [userEmail, onChangeUserEmail] = useState("");
   


    function grabUser(e){
        e.preventDefault();
        if(userEmail.length > 0){
        router.get("/adminAccount/user/grabUser/"+userEmail)};
    }

    // this function creates the form to update the user
    function UserForm({data}){
        const [newEmail,onChangeNewEmail] = useState(data["email"]);
        const [newLastName, onChangeNewLastName] = useState(data["last_name"]);
        const [newFirstName,onChangeNewFirstName] = useState(data["first_name"]);
        const [newPassword,onChangeNewPassword] = useState("");
        const [confPassword,onChangeConfPassword] = useState("");
        const[origEmail]= useState(data["email"]);

        function submitForm(e){
            e.preventDefault();
            const values = {'oldEmail':origEmail,'newemail':newEmail,'last_name':newLastName,'first_name':newFirstName,'password':newPassword,'password_confirmation':confPassword}
            router.put('/adminAccount/user/updateUser',values);
        }

        return(
            <div>
                <form className="" onSubmit={submitForm}>
                    
                <InputLabel className="text-2xl pt-2 ">First Name</InputLabel>
                        <TextInput
                        value={newFirstName}
                        onChange={(event)=>{
                            onChangeNewFirstName(event.target.value)
                        }}
                        
                        />
                        {props.errors.first_name &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1 " role="alert" >
                                {props.errors.first_name}
                            </div>
                        }


                        <InputLabel className="text-2xl pt-2 ">Last Name</InputLabel>
                        <TextInput
                        value={newLastName}
                        onChange={(event)=>{
                            onChangeNewLastName(event.target.value)
                        }}
                        
                        />

                        {props.errors.last_name &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {props.errors.last_name}
                            </div>
                        }
                        <InputLabel className="text-2xl pt-2 ">Email</InputLabel>
                        <TextInput
                        value={newEmail}
                        onChange={(event)=>{
                            onChangeNewEmail(event.target.value)
                        }}
                        
                        />

                        {props.errors.newemail &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {props.errors.newemail}
                            </div>
                        }

                        <InputLabel className="text-2xl pt-2 ">Password</InputLabel>
                        <TextInput type="password"
                        value={newPassword}
                        onChange={(event)=>{
                            onChangeNewPassword(event.target.value)
                        }}
                        
                        />

                        {props.errors.password &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {props.errors.password}
                            </div>
                        }
                        <InputLabel className="text-2xl pt-2 ">Confirm Password</InputLabel>
                        <TextInput type="password" className=""
                        value={confPassword}
                        onChange={(event)=>{
                            onChangeConfPassword(event.target.value)
                        }}
                        
                        />

                        {props.errors.password_confirmation &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {props.errors.password_confirmation}
                            </div>
                        }
                        <div className="mt-5">
                        <SecondaryButton className="" type="submit">submit</SecondaryButton>
                        </div>



                </form>
            </div>
        )
    }

    return(
        <AuthLayout  name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} admin={true}>
            <div className="grid grid-cols-5">
                
                <AdminAccountSideNav Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} className="border"/>
                <div className="col-span-4 text-center">
                    <h1 className="text-xl text-center">Update User</h1>
                    <div className="mt-10">
                        {props.status !== undefined ? <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert">{props.errors.userError}</div> : null}
                        <form onSubmit={grabUser}>
                        
                            <InputLabel className="text-xl">Enter User Email</InputLabel>
                            <TextInput className=""
                            value={userEmail}
                            onChange={(e)=>{
                                onChangeUserEmail(e.target.value)
                            }}
                        ></TextInput>  
                            <SecondaryButton type="submit" className=" ms-2">
                                Search
                            </SecondaryButton>
                        </form>
                        
                        <div className="mt-14">
                            {props.user !== undefined? <UserForm data={props.user} errors={props.errors} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}