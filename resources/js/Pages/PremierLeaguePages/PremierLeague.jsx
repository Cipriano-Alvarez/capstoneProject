import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {Link} from "@inertiajs/react";


function DrawTeams({teams}){
    const img = "size-7 m-1 hover:border-2 hover:border-black hover:rounded-full hover:size-12 hover:p-1";

    function getTeam(id){
        console.log(id)
        router.get("/premierleague/team/"+id)
    }

    return(
    <div className="">
        <ul className="flex flex-row justify-center">
            {teams.response.map((item,index)=>(
                <li key={index} onClick={()=>{
                    getTeam(item.team.id)
                }
                }>
                    <img className={img}  src={item['team']['logo']}/>
                </li>
            ))}
        </ul>
    </div>)
}

function DrawStats({stats,players,matches,rank}){
    const statsClass= "bg-slate-50 border border-slate-200 size-1/3 m-1 p-2";

    const data =[
        {
            stat:"goals for",
            team:stats.goals,
            avg:stats.avgGoals
        },
        {
            stat:"goals against",
            team:stats.goals_against,
            avg:stats.avgGoalsAgainst
        },
        {
            stat:"points",
            team:stats.points,
            avg:stats.avgPoints
        }
    ]

    return(
        <div className=" ms-1 w-full border-t border-slate-300">
            <div className="flex flex-row justify-center mt-5">
            <Link href={route("premierleague")} className="justify-self-start text-sm me-10"><img className="size-5" src="\images\back.png"/></Link>
                {/* {console.log(players)} */}
                <div className="size-1/5">
                    <img className="size-24 " src={stats.logo}/>
                </div>
                
                <div className="size-2/3">
                    <ul className="flex flex-row ">
                        {matches.response.map((item, index)=>(
                            <li className="flex flex-row justify-center size-1/3 bg-slate-50 border border-slate-200 ms-2 me-2 p-3" key={index}>
                                <img className="size-10 me-3" src={item.teams.home.logo}/>
                                <p className="text-lg">VS</p>
                                <img className="size-10 ms-3" src={item.teams.away.logo}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-2 flex flex-row justify-center mt-7">
                <div className=" size-1/5">
                    <p className=' bg-slate-50 border border-slate-200 w-2/5 text-center'>{rank}</p>
                </div>
                <div className="size-2/3 text-sm flex flex-row">
                    <p className={statsClass}>Goals Per Game: {stats.goals_per_game}</p>
                    <p className={statsClass}>Goals conceded Per Game: {stats.goals_against_per_game}</p>
                    <p className={statsClass}>Clean Sheets: {stats.clean_sheets}</p>
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="size-1/5 mt-3">
                    {players.map((item,index)=>(
                        <div className="flex flex-row justify-center mt-5 me-3" key={index}>
                            <div>
                                <div className="border border-slate-300 rounded-full size-16">
                                    <img className="size-14 rounded-full m-1" src={item.player.photo}/>
                                </div>
                                <p className="text-xs">{item.player.name}</p>
                            </div>
                            <div className=" text-start text-xs ms-3 bg-slate-50 border border-slate-200 w-1/2 p-1 font-semibold">
                                <p className="">Goals:{item.statistics[0].goals.total}</p>
                                <p>Assists:{item.statistics[0].goals.assists}</p>
                                <p>Key Passes:{item.statistics[0].passes.key}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="size-2/3 size-full h-96">
                    <ResponsiveContainer  width="100%" height="100%">
                    <BarChart
                    
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 15,
                            left: 15,
                            bottom: 5,
                            }}
                        >





                    <XAxis dataKey="stat" tick={{fontSize:15}}  />
                    <YAxis hide="true"/>
                    <Tooltip />
                    <Bar dataKey="team" fill="#154A97" activeBar={<Rectangle fill="#154A97" stroke="blue" />} />
                    <Bar dataKey="avg" fill="#ea4435" activeBar={<Rectangle fill="#ea4435" stroke="purple" />} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}


function DrawMatches({matches}){

    function chosenMatch(id){
        router.get("/premierleague/fixture/"+id);
    }




    const li = "flex flex-row border border-slate-400 content-center hover:ring-2 hover:ring-black bg-slate-100 rounded-md"
    return(
        <div className="flex justify-center flex-wrap mt-5 rounded-full ">
            <ul className="grid gap-5 grid-cols-2 bg-slate-50 p-5 rounded-md">
                {matches.response.map((item,index)=>(
                    
                    <li  onClick={()=>{
                        chosenMatch(item['fixture']['id'])
                    }} className={index % 2 == 1 ? li + " mt-6" : li +" mb-6"}
                    key={index}>
                        <img id={item['fixture']['id']} onClick={chosenMatch}  className="size-8 m-3" src={item['teams']['home']['logo']}></img> <p className="m-3 mt-4 size-4">VS</p> <img className=" m-3 size-8" src={item['teams']['away']['logo']}></img>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function DrawMatch({match,odds,awayForm,homeForm}){




    function DrawRecordImg({letter}){


        var src= "";
        if(letter =="L"){
            src="/images/reds.png"
        }else if(letter == 'W'){
            src="/images/green.png"
        }else if(letter == "D")
            src="/images/grey.png"
        return(
            <img className="size-4 ms-1 me-1" src={src}/>
        )
    }

    function DrawForm({form}){
        const rows = [];

        for(let i =1; i <= 5; i++){
            rows.push(<DrawRecordImg letter={form[form.length-i]} key={i}/>)
        }

        return(
            <div className="flex flex-row justify-center size-1/2 mt-3">
                {rows}
            </div>
        )
    }

    function DrawLast3Matches({h2h}){
    const dateStyle = "text-lg mt-2"

        if(h2h.length == 0){
            return(
                <div>
                    <p>NO RECENT MATCHES PLAYED</p>
                </div>
            )
        }else if(h2h.length < 3 && h2h.length > 0){
                return(
                    <div>
                        {h2h.map((item,index)=>(
                            <div key={index} className="p-2 m-2 w-1/2 border border-black">
                                <p className="flex flex row justify-center"><img className="size-10 me-3" src={item.teams.home.logo}/>{item.goals.home}-{item.goals.away}<img className="size-10 ms-3 " src={item.teams.away.logo}/></p>
                                <p className={dateStyle}>{item.fixture.date.substring(0,10)}</p>
                            </div>
                        ))}
                    </div>
                )
        }else{
            return(
                <div className="flex flex-row justify-center">
                    <div className="p-2 m-2 w-1/3 border border-black">
                        <p className="flex flex row justify-center"><img className="size-10 me-3" src={h2h[0].teams.home.logo}/>{h2h[0].goals.home}-{h2h[0].goals.away}<img className="size-10 ms-3 " src={h2h[0].teams.away.logo}/></p>
                        <p className={dateStyle}>{h2h[0].fixture.date.substring(0,10)}</p>
                    </div>
                    <div className="p-2 m-2 w-1/3 border border-black">
                        <p className="flex flex row justify-center"><img className="size-10 me-3" src={h2h[1].teams.home.logo}/>{h2h[1].goals.home}-{h2h[1].goals.away}<img className="size-10 ms-3 " src={h2h[1].teams.away.logo}/></p>
                        <p className={dateStyle}>{h2h[1].fixture.date.substring(0,10)}</p>
                    </div>
                    <div className="p-2 m-2 w-1/3 border border-black">
                        <p className="flex flex row justify-center"><img className="size-10 me-3" src={h2h[2].teams.home.logo}/>{h2h[2].goals.home}-{h2h[2].goals.away}<img className="size-10 ms-3 " src={h2h[2].teams.away.logo}/></p>
                        <p className={dateStyle}>{h2h[2].fixture.date.substring(0,10)}</p>
                    </div>
                </div>
            )
        }
    }

const logoImage= "size-14"
const oddsClass="text-lg"
const homeDecimalOdds = odds.response[0].bookmakers[0].bets[0].values[0].odd;
const awayDecimalOdds = odds.response[0].bookmakers[0].bets[0].values[2].odd;
var homeOdds;
var awayOdds;
var colourHome;
var colourAway;
if(homeDecimalOdds >= 2.0){
    homeOdds = Math.round(((awayDecimalOdds-1) *100));
}else if(homeDecimalOdds < 2.0){
    homeOdds = Math.round( (-100/(awayDecimalOdds -1)));
}


if(awayDecimalOdds >= 2.0){
    awayOdds = Math.round(((awayDecimalOdds-1) *100));
}else if(awayDecimalOdds < 2.0){
    awayOdds =Math.round( (-100/(awayDecimalOdds -1)));
}


if(homeOdds > awayOdds){
    colourHome = "text-green-500"
    colourAway = "text-red-500"
}else if(homeOdds < awayOdds){
    colourHome = "text-red-500"
    colourAway="text-green-500"
}else{
    colourHome="text-neutral-500"
    colourAway="text-neutral-500"
}     

function cardTotal(cardArray){
    var total =0;
        for(let key in cardArray){
            total += cardArray[key].total
        }
    return total;
}
    const data = [
        {
            stat:"goals scored",
            home: homeForm['response']['goals']['for']['total']['total'],
            away:awayForm['response']['goals']['for']['total']['total']
        },
        {
            stat:"goals conceded",
            home:homeForm['response']['goals']['against']['total']['total'],
            away:awayForm['response']['goals']['against']['total']['total']
        },
        {
            stat:"penalties won",
            home:homeForm['response']['penalty']['total'],
            away:awayForm['response']['penalty']['total']
        },
        {
            stat:"penalties scored",
            home:homeForm['response']['penalty']['scored']['total'],
            away:awayForm['response']['penalty']['scored']['total']
        },
        {
            stat:"clean sheets",
            home:homeForm['response']['clean_sheet']['total'],
            away:awayForm['response']['clean_sheet']['total']
        },
        {
            stat:"yellow cards",
            home:cardTotal(homeForm['response']['cards']['yellow']),
            away:cardTotal(awayForm['response']['cards']['yellow'])
        },

        {
            stat:"red cards",
            home:cardTotal(homeForm['response']['cards']['red']),
            away:cardTotal(awayForm['response']['cards']['red'])
        }
    ];
 


    return(
    <div className="mt-5 w-full">
        <div className="flex flex-row mb-3">
            <p className="size-1/3 text-end ">Home</p>
            <p className="size-1/3"></p>
            <p className="size-1/3 text-start ">Away</p>
        </div>
        <div className="flex flex-row justify-center">

        <Link href={route("premierleague")} className="justify-self-start text-sm me-10"><img className="size-5" src="\images\back.png"/></Link>
            {/* <p className="me-5">Home</p> */}
            <div className="flex flex-row justify-center ">
                <p className={oddsClass + " me-5 " + colourHome}>Odds : {homeOdds}</p>
                <img className={logoImage} src={match.response[0].teams.home.logo}/>
            </div>
            <p className="text-xl ms-20 me-20  ">{odds.response[0].fixture.date.substring(5,10)}<br/> {odds.response[0].fixture.date.substring(11,16)}</p>
            
            <div className="flex flex-row justify-center ">
                <img className={logoImage} src={match.response[0].teams.away.logo}/>
                <p className={oddsClass + " ms-5 " + colourAway}>Odds : {awayOdds}</p>
            </div>
            {/* <p className="ms-3">Away</p> */}
        </div>
        <div className="flex flex-row">
            <DrawForm form={homeForm['response']['form']} />
            <DrawForm form={awayForm['response']['form']}/>

        </div>
        <div  className="h-96 mt-14">
            <ResponsiveContainer  width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 15,
                        left: 15,
                        bottom: 5,
                        }}
                >
                    <XAxis dataKey="stat" tick={{fontSize:15}}  />
                    <YAxis hide="true"/>
                    <Tooltip />
                    <Bar dataKey="home" fill="#154A97" activeBar={<Rectangle fill="#154A97" stroke="blue" />} />
                    <Bar dataKey="away" fill="#ea4435" activeBar={<Rectangle fill="#ea4435" stroke="purple" />} />
                </BarChart>
                </ResponsiveContainer>
        </div>
        <div className="text-center">
            <DrawLast3Matches h2h={match.response[0].h2h}/>
        </div>
    </div>)
}
function DrawStandings({standings}){


    return(
        <div className="flex justify-center mt-5 overflow-y-scroll h-96 border border-slate-500 bg-slate-50 me-10 rounded-lg p-2">
            <table className=" text-sm w-full me-4 table-auto shrink   ">
                <thead>
                    <tr className="border-b border-black">
                        <th colSpan="3" className="text-start text-lg">Club</th>

                        <th>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody className="">
                    {standings['response'][0]['league']['standings'][0].map((item,index)=>(
                        <tr key={index} className="border-b border-black">
                            <td>{item['rank']}</td>
                            <td><img className="size-8 m-1" src={item['team']['logo']}/></td>
                            <td className="text-start text-lg">{item['team']['name']}</td>
                            <td>{item['all']['played']}</td>
                            <td>{item['all']['win']}</td>
                            <td>{item["all"]['draw']}</td>
                            <td>{item['all']['lose']}</td>
                            <td>{item['all']['goals']['for']}</td>
                            <td>{item['all']['goals']['against']}</td>
                            <td>{item['goalsDiff']}</td>
                            <td>{item['points']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function Page({props}){
    
    return(
        <div className="grid gap-0 grid-cols-3">
            {/* {console.log(props)} */}
            <section className="text-center col-span-1">
                <h1 className="text-3xl">Upcoming matches</h1>
                <DrawMatches matches={props.matches}/>
            </section>
            {props.match == null ?
            <section className="col-span-2 text-center text-3xl"> 
                <h1 className="mb-3">Premier League</h1>
                <DrawTeams teams={props.teams}/>
                {props.stats == null ?<DrawStandings standings={props.standings}/>:<DrawStats stats={props.stats} players={props.players} matches={props.matches3} rank={props.rank} />}
                 
            </section>:
             <section className="col-span-2 text-center text-3xl h-full w-full">
                <DrawMatch match={props.match} odds={props.odds} awayForm={props.awayForm} homeForm={props.homeForm}/>
            </section> }
        </div>
    )
}

export default function PremierLeague(Auth){
    const props = usePage().props;
    const {user} = Auth.auth;
    if(user !== null){
        return(
        <AuthLayout name={user.first_name + " " + user.last_name}>
            <Page props={props}/>
        </AuthLayout>
        )

    }else{
        return(
            <GuestLayout>
                <Page props={props}/>
            </GuestLayout>
        )
    }
}