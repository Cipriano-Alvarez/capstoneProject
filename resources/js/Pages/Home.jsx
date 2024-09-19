import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";




function isAuth(Auth){
    console.log(Auth)
}
function printResults(results){
    console.log(results);
}

function DrawStandings(standingsData){
    return(
        <div className="mt-5">
            <table className=" table-auto">
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
                        <tr className="mt-5 border">
                            <td colSpan={4} key={index} className="flex">
                                <p className="pe-5 ps-2">{item["rank"] + " " }</p>
                                <img src={item["team"]["logo"]} className="size-8 "/>
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

    if (Auth.auth.user !== null ) {
        return (
            <AuthLayout
                name={Auth.auth.user.first_name + " " +Auth.auth.user.last_name}
            >
                <div>{isAuth(Auth)}</div>
                <div className="grid grid-cols-4 gap-1">
                    <section className="col-start-2">
                        <h3 className="text-5xl">Premier League Standings</h3>
                        <div>{DrawStandings(results["response"]["0"]["league"])}</div>
                    </section>
                    <section className="col-start-3 text-center">
                        <h3 className="text-5xl">Articles </h3>
                    </section>
                </div>
            </AuthLayout>
        )
    }else{
    return (
        <GuestLayout>
            <div className="grid grid-cols-4 gap-1">
                <div>{printResults(results["response"]["0"]["league"]["standings"][0])}</div>
                <section className="col-start-2">
                    <h3 className="text-3xl">Premier League Standings</h3>
                    <div>{DrawStandings(results["response"]["0"]["league"])}</div>
                </section>
                <section className="col-start-3 text-center">
                    <h3 className="text-3xl">Articles </h3>
                </section>
            </div>
        </GuestLayout>
    )
    }

}

