import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";
import {Link} from "@inertiajs/react";



function DrawArticles({articles}){
    return(
<div className="mt-10">
            <table className=" border border-gray-400">
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    {articles["data"].map((item,index)=>(
                        <tr key={index} className="border border-gray-400 border-t-0">
                            <td className=" p-1 ">
                                <a className=" underline text-gray-400 hover:text-sky-400  hover:text-sky-600 hover:underline decoration-solid " href={item["website_link"]}>{item['title']}</a>
                                <p className="ps-2 pt-2 pe-2">{item['description']}</p>
                                <p className="text-sm text-end pt-5">Date: {item['created_at'].substring(0,10)}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-inline w-full text-center justify-center mt-5">
                
                {articles["prev_page_url"] == null ?<Link className="text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href="#" onClick={(e)=>e.preventDefault()}>Prev</Link>:
                <Link className="text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={articles["prev_page_url"]}>Prev</Link>}
                {articles['next_page_url'] == null ? <Link className="ms-10 text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={articles["next_page_url"]} onClick={(e)=>e.preventDefault()} >Next</Link>:
                <Link className="ms-10 text-xl  hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={articles["next_page_url"]}>Next</Link>}    
            </div>
        </div>
    )
}

function DrawStandings(standingsData){
    return(
        <div className="mt-5 ">
            <table className="table-auto">
                <thead>
                    <tr className="border text-sm">
                        <th  className="text-start border">Club</th>
                        <th className="border">MP</th>
                        <th className="border">W</th>
                        <th className="border">D</th>
                        <th className="border">L</th>
                        <th className="border">GF</th>
                        <th className="border">GA</th>
                        <th className="border">GD</th>
                        <th className="border">PTS</th>
                    </tr>
                </thead>
                <tbody className="">
                    {standingsData["standings"]["0"].map((item,index)=>(
                        <tr className="mt-5 border" key={index}>
                            <td colSpan={4}  className="flex">
                                <p className="pe-5 ps-2">{item["rank"] + " " }</p>
                                <img src={item["team"]["logo"]} className="size-6 "/>
                                <p className="ps-3">{item["team"]["name"]}</p> 
                            </td>
                            <td className="ps-2 border-s text-center">
                                {item["all"]["played"]}
                            </td>
                            <td className="ps-2  text-center">
                                {item["all"]["win"]}
                            </td>
                            <td className="ps-2">
                                {item["all"]["draw"]}
                            </td>
                            <td className="ps-2">
                                {item["all"]["lose"]}
                            </td>
                            <td className="ps-2">
                                {item["all"]["goals"]["for"]}
                            </td>
                            <td className="ps-2">
                                {item["all"]["goals"]["against"]}
                            </td>
                            <td className="ps-2">
                                {item["goalsDiff"]}
                            </td>
                            <td className="ps-2">
                                {item["points"]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default function Home( Auth ){
    const {results} = usePage().props;
    const props = usePage().props
    

    if (Auth.auth.user !== null ) {
        return (
            <AuthLayout
                name={Auth.auth.user.first_name + " " +Auth.auth.user.last_name}
            >
                <div className="flex flex-inline justify-center">
                    
                    <section className="">
                        <h3 className="text-3xl pe-10 ">Premier League <br/>Standings</h3>
                        <div>{DrawStandings(results["response"]["0"]["league"])}</div>
                    </section>
                    <section className="ms-48 pt-10 text-center">
                        <h3 className="text-3xl">Articles </h3>
                        <DrawArticles articles={props.articles}/>
                    </section>
                </div>
            </AuthLayout>
        )
    }else{
    return (
        <GuestLayout>
                <div className="flex flex-inline justify-center">
 
                    <section className="">
                        <h3 className="text-3xl pe-10 ">Premier League <br/>Standings</h3>
                        <div>{DrawStandings(results["response"]["0"]["league"])}</div>
                    </section>
                    <section className="ms-48 pt-10 text-center">
                        <h3 className="text-3xl">Articles </h3>
                        <DrawArticles articles={props.articles}/>
                    </section>
                </div>
        </GuestLayout>
    )
    }

}

