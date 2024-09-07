import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import { useState } from "react";

//this is the sign up page
//form still needs to be completed and styled
//data needs to go somewhere after it is collected

const signUp = () => {
    const [firstName, onChangeFirstName] = useState("")
    const [lastName, onChangeLastName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [rePassword, onChangeRePassword] = useState("")
    const [age, onChangeAge] = useState("")


    return (
        <>
            <div>
                <form>
                    <TextInput></TextInput>
                    <TextInput></TextInput>
                    <TextInput></TextInput>
                    <TextInput></TextInput>
                    <TextInput></TextInput>
                    <input type="date"/>
                </form>
            </div>
        </>)
}

signUp.layout = page => <GuestLayout children={page} title="signup" />

export default signUp;