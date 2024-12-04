import AuthLayout from "@/Layouts/AuthLayout";
import { Link, usePage,router} from "@inertiajs/react";
import UserAccountSideNav from "@/Pages/AccountPages/shared/UserAccountSideNav";
import PrimaryButton from "@/Components/PrimaryButton";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Label } from "recharts";


function Favourites(teams){
return(
    <ul className="inline-flex size-1/4 space-x-2 mt-5 ">
        
        {teams["team"].map((item,index)=>(
            <li  onClick={teamClick} className="cursor-pointer" key={index}>
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
                <ul className="inline-flex space-x-2">
                    {Fixtures["response"].map((item,index)=>(
                        <li className="inline-flex space-x-2 border-2" key={index}>
                            <div className="size-11">
                            {item["teams"]["home"]["id"] ==40 ? <img className="ps-2 size-10 pe-2 pt-2" src={item["teams"]["home"]["logo"]}/>:<img className="ps-2 pe-2 pt-2" src={item["teams"]["home"]["logo"]}/> }
                                
                            </div>
                            <p className="pt-2">vs</p>
                            <div className="size-11 ">
                                {item["teams"]["away"]["id"] ==40 ? <img className="ps-2 size-10 pe-2 pt-2" src={item["teams"]["away"]["logo"]}/>:<img className="ps-2 pe-2 pt-2" src={item["teams"]["away"]["logo"]}/> }
                                
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

function DrawGraphs({wins,loses,teams}){
    const data = [
        {
            'title':'wins',
            'count':wins
        },
        {
            'title':'loses',
            'count':loses
        }
    ]

    const teamData = [];
    for(const key in teams){
        teamData.push({
            'name':teams[key].name,
            'count': teams[key].count
        });
    }

    return(
        <div className="flex flex-row ms-5 mt-5">
            <BarChart width={500} height={250} data={data} margin={{bottom: 10,right:5}}>

                <XAxis dataKey="title" >
                    <Label value="Wins vs Losses" offset={0} position="insideBottom" />
                </XAxis>

                <Tooltip />

                <Bar dataKey="count" fill="#8884d8"  />


            </BarChart>
            {teamData.length > 0 ? 
            <BarChart className="mb-5" width={500} height={250} data={teamData} margin={{bottom: 10,left:5}}>

                <XAxis dataKey="name"  >
                    <Label  value="Teams" offset={-5} position="bottom" />
                </XAxis>

                <Tooltip />

                <Bar dataKey="count" fill="gray"  />


            </BarChart>: null}
        
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
                        {props['nextFixtures'] != null ? <ShowTeamInfo Fixtures={props['nextFixtures']} Record={props['record']} MatchHistory={props['lastFixtures']}/> : <DrawGraphs wins={props.wins} loses={props.loses} teams={props.teams} />}
                    </div>
                </div>




            </div>
        </div>
    </AuthLayout>)

}