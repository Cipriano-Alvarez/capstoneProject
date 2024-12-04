import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { useState } from "react";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";


//this is the sign up page
//form still needs to be completed and styled
//data needs to go somewhere after it is collected

const signUp = (errors) => {
    const [firstName, onChangeFirstName] = useState("")
    const [lastName, onChangeLastName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [rePassword, onChangeRePassword] = useState("")
    const [age, onChangeAge] = useState(0)




    function handlesubmit(e){
        e.preventDefault()
        const values = {'firstName':firstName,'lastName':lastName,'email':email,'password':password,'password_confirmation':rePassword,'age':age};
        router.post('/signup',values);
    }

    function showEmailError(errors){
        
    }
    return (
        <>
            
            <div className="grid grid-cols-5 justify-items-center">
                <div className="col-start-3">
                    <h1 className="text-5xl mb-10 pr-10">Sign Up</h1>
                </div>
                <div className="col-start-3">
                    <form onSubmit={handlesubmit}>
                        <InputLabel className="text-2xl pt-2 ">First Name</InputLabel>
                        <TextInput
                        value={firstName}
                        onChange={(event)=>{
                            onChangeFirstName(event.target.value)
                        }}
                        
                        />

                        {errors.errors.firstName &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {errors.errors.firstName}
                            </div>
                        }

                        <div>{showEmailError(errors)}</div>
                        <InputLabel className="text-2xl pt-2  ">Last Name</InputLabel>
                        <TextInput
                        value={lastName}
                        onChange={(event)=>{
                            onChangeLastName(event.target.value)
                        }}
                        />

                        {errors.errors.lastName &&
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {errors.errors.lastName}
                            </div>
                        }

                        <InputLabel className="text-2xl pt-2 ">Email</InputLabel>
                        <TextInput
                        value={email}
                        onChange={(event)=>{
                            onChangeEmail(event.target.value)
                        }}
                        />

                        {errors.errors.email &&                             
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {errors.errors.email}
                            </div>
                        }
                        
                        
                        <InputLabel className="text-2xl pt-2 ">Password</InputLabel>
                        <TextInput
                        type="password"
                        value={password}
                        onChange={(event)=>{
                            onChangePassword(event.target.value)
                        }}
                        />
                        
                        {errors.errors.password &&                             
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {errors.errors.password}
                            </div>
                        }

                        <InputLabel className="text-2xl pt-2 ">Re-enter Password</InputLabel>
                        <TextInput
                        type="password"
                        value={rePassword}
                        onChange={(event)=>{
                            onChangeRePassword(event.target.value)
                        }}
                        />
                        
                        {errors.errors.password_confirmation &&                             
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                {errors.errors.password_confirmation}
                            </div>
                        }

                        <InputLabel className="text-2xl pt-2 ">Age</InputLabel>
                        <TextInput type="number" value={age} onChange={(event)=>{
                            onChangeAge(event.target.value)
                        }}/>
                        
                        {errors.errors.age &&                             
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert" >
                                <p>{errors.errors.age}</p>
                            </div>
                            }
                        <div className="pt-2">
                            <PrimaryButton type="submit">Submit</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}

signUp.layout = page => <GuestLayout children={page} title="signup" />

export default signUp;