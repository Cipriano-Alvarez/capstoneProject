import AuthLayout from "@/Layouts/AuthLayout";
import { Link, usePage,router} from "@inertiajs/react";
import UserAccountSideNav from "@/Pages/AccountPages/shared/UserAccountSideNav";
import PrimaryButton from "@/Components/PrimaryButton";


function Favourites(teams){
return(
    <ul className="inline-flex size-1/4 space-x-2 mt-5 ">
        {/* {console.log(teams)} */}
        {teams["team"].map((item,index)=>(
            <li  onClick={teamClick} key={index}>
                <img id={item["id"]} src={item["logo"]}/>
            </li>
            
        ))}
    </ul>
)



function teamClick(event){
    var id = event["target"]["id"];
    router.get('/account/'+id);
}
}
function ShowTeamInfo({Fixtures,Record,MatchHistory}){
    return(
        
        <div className="mt-10">
            <div>
            {console.log(MatchHistory)}
                <ul className="inline-flex space-x-2">
                    {Fixtures["response"].map((item,index)=>(
                        <li className="inline-flex space-x-2 border-2" key={index}>
                            <div className="size-11">
                            {item["teams"]["home"]["id"] ==40 ? <img className="ps-2 size-10 pe-2 pt-2" src={item["teams"]["home"]["logo"]}/>:<img className="ps-2 pe-2 pt-2" src={item["teams"]["home"]["logo"]}/> }
                                {/* <p>{item["teams"]["home"]["name"]}</p> */}
                            </div>
                            <p className="pt-2">vs</p>
                            <div className="size-11 ">
                                {item["teams"]["away"]["id"] ==40 ? <img className="ps-2 size-10 pe-2 pt-2" src={item["teams"]["away"]["logo"]}/>:<img className="ps-2 pe-2 pt-2" src={item["teams"]["away"]["logo"]}/> }
                                {/* <p>{item["teams"]["away"]["name"]}</p> */}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-5">
                    <h1 className="text-xl ">Record: W{Record["response"]["fixtures"]["wins"]["total"]}-D{Record["response"]["fixtures"]["draws"]["total"]}-L{Record["response"]["fixtures"]["loses"]["total"]}</h1>
                </div>
                <div className="mt-10 bg-slate-200 pb-10 ">
                    <h1 className="text-3xl underline underline-offset-8">Match History</h1>
                    
                        <ul className="mt-6">
                            {MatchHistory["response"].map((item,index)=>(
                                <li className="grid grid-cols-5 mt-4 bg-slate-50 pt-3 pb-3 ms-10 me-10 " key={index}>
                                    <div className="col-start-2">
                                        <img className="size-14" src={item["teams"]["home"]["logo"]}/>
                                    </div>
                                    <p className="col-start-3 text-2xl">{item["goals"]["home"]} - {item["goals"]["away"]}</p>
                                    <div className="col-start-5">
                                    <img className="size-14" src={item["teams"]["away"]["logo"]}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default function UserAccount(Auth){
    const props = usePage().props;

    return(
    <AuthLayout
        name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]}
        className="relative"
    >
        <div className="grid grid-cols-5">
            <UserAccountSideNav Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} className="border"/>
            <div className="col-span-4">
                <div className="text-center">
                    <h1 className="text-xl font-medium ">User Account</h1>
                    <div className="">
                        <Favourites team={props['favTeams']}  />
                        {props['nextFixtures'] != null ? <ShowTeamInfo Fixtures={props['nextFixtures']} Record={props['record']} MatchHistory={props['lastFixtures']}/> : null}
                    </div>
                </div>




            </div>
        </div>
    </AuthLayout>)

}