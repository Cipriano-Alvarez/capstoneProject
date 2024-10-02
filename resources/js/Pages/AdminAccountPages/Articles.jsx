import AuthLayout from "@/Layouts/AuthLayout";
import AdminAccountSideNav from "./Shared/AdminAccounSideNav";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import {useForm} from "@inertiajs/react";
import {Link} from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Articles(Auth){
    const props = usePage().props
    const {data,setData,post,processing,errors} = useForm({
        title:"",
        link:"",
        description:""
    })

    function submitArticle(event){
        event.preventDefault();
        post('/adminAccount/articles')

    }

    function deleteArticle(event){
        event.preventDefault();
        router.delete("/adminAccount/articles/delete/"+event.target.id)
    }

    function ArticleList({articles}){
        return(
        <div className="mt-10">
            <table className="w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="text-start ps-5 text-3xl">Article</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {articles["data"].map((item,index)=>(
                        <tr key={index} className="border border-gray-400">

                            <td className="text-xl ps-5 pt-5 pb-5 ">{item["title"]}</td>
                            <td ><Link onClick={deleteArticle} id={item["id"]} className="hover:text-sky-600 hover:underline decoration-solid " href="">DELETE</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-inline w-full text-center justify-center mt-5">
                
                {articles["prev_page_url"] == null ?<Link className="text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href="#" onClick={(e)=>e.preventDefault()}>Prev</Link>:
                <Link className="text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={articles["prev_page_url"]}>Prev</Link>}
                {articles['next_page_url'] == null ? <Link className="ms-10 text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={articles["next_page_url"]} onClick={(e)=>e.preventDefault()} >Next</Link>:
                <Link className="ms-10 text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={articles["next_page_url"]}>Next</Link>}    
            </div>
        </div>)
    }

    return(
        <AuthLayout  name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} admin={true}>
            <div className="grid grid-cols-5">
                <AdminAccountSideNav Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} className="border"/>
                <div className="col-span-4">
                    {console.log(props)}
                    <h1 className="text-3xl text-center">Articles</h1>
                    <div className="mt-10 ps-10 pe-10">
                        <form className="bg-slate-200 pt-10 pb-5 border border-gray-300 " onSubmit={submitArticle}>
                            <div className="text-center">
                            <div className="ms-48 me-48 flex flex-inline mt-5 ">
                                    <InputLabel className="text-xl pe-10">Title:</InputLabel>
                                    <TextInput className="w-full" value={data.title} onChange={
                                        e =>setData('title',e.target.value)}></TextInput>
                                    
                                </div>
                                {errors.title && <div className="text-red-400 ">{errors.title}</div>}
                                <div className="ms-48 me-48 flex flex-inline mt-5">
                                    <InputLabel className="text-xl pe-10">Link:</InputLabel>
                                    <TextInput className="w-full" value={data.link} onChange={
                                        e =>setData('link',e.target.value)
                                    }></TextInput>
                                </div>
                                {errors.link && <div className="text-red-400 ">{errors.link}</div>}
                                <div className="ms-48 me-48 flex flex-inline mt-5">
                                    <InputLabel className="text-xl pe-10">Description:</InputLabel>
                                    <textarea value={data.description} onChange={
                                        e=>setData('description',e.target.value)
                                    } className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                </div>
                                {errors.description && <div className="text-red-400 ">{errors.description}</div>}
                                <SecondaryButton className="mt-5 text-center" type="submit">
                                    <p className="text-center text-xl">+Add</p>
                                </SecondaryButton>
                            </div>
                        </form>
                        <div className="w-full ">
                            <ArticleList articles={props.articles}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}