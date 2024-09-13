import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { useState } from "react";
import { Input } from "postcss";

//this is the sign up page
//form still needs to be completed and styled
//data needs to go somewhere after it is collected

const signUp = () => {
    const [firstName, onChangeFirstName] = useState("")
    const [lastName, onChangeLastName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [rePassword, onChangeRePassword] = useState("")
    const [age, onChangeAge] = useState(0)


    return (
        <>
            <div className="grid grid-cols-5 justify-items-center">
                <div className="col-start-3">
                    <h1 className="text-5xl mb-10 pr-10">Sign Up</h1>
                </div>
                <div className="col-start-3">
                    <form>
                        <InputLabel className="text-2xl pt-3 ">First Name</InputLabel>
                        <TextInput></TextInput>
                        <InputLabel className="text-2xl pt-3  ">Last Name</InputLabel>
                        <TextInput></TextInput>
                        <InputLabel className="text-2xl pt-3 ">Email</InputLabel>
                        <TextInput></TextInput>
                        <InputLabel className="text-2xl pt-3 ">Password</InputLabel>
                        <TextInput></TextInput>
                        <InputLabel className="text-2xl pt-3 ">Re-enter Password</InputLabel>
                        <TextInput></TextInput>
                        <InputLabel className="text-2xl pt-3 ">Age</InputLabel>
                        <input type="date"/>
                    </form>
                </div>
            </div>
        </>)
}

signUp.layout = page => <GuestLayout children={page} title="signup" />

export default signUp;