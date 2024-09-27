import AuthLayout from "@/Layouts/AuthLayout";
import {usePage} from "@inertiajs/react";
import UserAccountSideNav from "./shared/UserAccountSideNav";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";


export default function UserAccountFavourites(Auth){
    const props = usePage().props;


    function onDelete(e){
        var id = e["target"]["id"];
        router.delete('/account/favourite/'+id);
    }

    return(

        <AuthLayout name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]}   className="relative">
            <div className="grid grid-cols-5">
                {console.log(props)}
                <UserAccountSideNav Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} />
                <div className="col-span-4">
                    <h1 className="text-3xl  text-center">Update Favourite Teams</h1>
                    <div className=" mt-10">
                    <table className="ms-10 table-auto size-4/5 ">
                        <thead className="border-b border-b-black ">
                            <tr>

                            </tr>
                        </thead>
                        <tbody className="border-s border-e border-black"> 
                            {props["favTeams"].map((item,index)=>(
                                <tr className=" border-b border-b-black" key={index}> 
                                    <td className=" ps-5 text-xl pt-5 size-1/2 font-semibold">
                                        <img className="size-20" src= {item['logo']} ></img>
                                         {item['name']}  
                                    </td>
                                    <td className="pe-16 text-end">
                                        <SecondaryButton onClick={onDelete} id={item['id']}>
                                            Delete
                                        </SecondaryButton>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}