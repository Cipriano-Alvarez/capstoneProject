import AuthLayout from "@/Layouts/AuthLayout";
import AdminAccountSideNav from "./Shared/AdminAccounSideNav";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import {Link} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import Select from "react-select"






export default function AdminAccountUpdateBet(Auth){
    const props = usePage().props;
    const [userEmail, onChangeUserEmail] = useState("");




    console.log(props)
    
    function grabUser(e){
        e.preventDefault();
        if(userEmail.length > 0){
            router.get("/adminAccount/updatebet/grabuser/"+userEmail)
        };
    }
    
    function DrawBetsTable({bets,teams}){
        const [isEdit,setIsEdit] = useState(false);
        const [homeTeam,setHomeTeam] = useState("");
        const [awayTeam,setAwayTeam] = useState("");
        const [currentChoice,setCurrentChoice] = useState("");
        const [betID,setBetID] = useState("");
        
        
        
        function updateFunction(id){
            var bet = null;
            for(var i =0; i < bets.data.length;i++){
                if(bets.data[i].id == id){
                    bet = bets.data[i];
                    break;
                }
                continue;
            }
            setIsEdit(true);
            setAwayTeam(teams[bet.fixture_id].awayteam)
            setHomeTeam(teams[bet.fixture_id].hometeam)
            setBetID(bet.id)
            setCurrentChoice(bet.choice);


        }

        function deleteBet(id){
            
            
            router.delete('/adminAccount/deletebet/'+id);
        }

        function DrawEdit({awayteam,hometeam,currentValue,currBetId}){
            const [newChoice,setNewChoice] = useState({value: currentValue,label:currentValue});
            
            
            function updateBet(event){
                event.preventDefault()
                console.log(newChoice.value)
                const newData = {
                    'newchoice': newChoice.value,
                    'betid':currBetId
                }
                router.put('/adminAccount/updatebet/newchoice',newData);
            }


            const data = [
                {
                    value: hometeam,
                    label: hometeam
                },
                {
                    value: awayteam,
                    label: awayteam
                },
                {
                    value: "DRAW",
                    label: "Draw"
                }
            ];

            return(
                <div className="flex justify-center border border-slate-400 p-5 m-5">
                    <p className="me-5 text-lg">ID: {currBetId} {hometeam} vs {awayteam}</p>
                    <Select className="w-1/2" options={data} defaultValue={newChoice} onChange={setNewChoice} />
                    <SecondaryButton className="ms-5" onClick={updateBet} >Change</SecondaryButton>
                </div>
            )
        }

        return (
            <div className="flex flex-col justify-center mt-6">
                <table className="table-auto ms-5 me-5">
                    <thead>
                        <tr className="border border-black">
                            <th className="text-start ">Bet ID</th>
                            <th className=" ">Match</th>
                            <th className="">Predicted</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bets.data.map((item,index)=>(
                            <tr key={index} className="" >
                                <td className="text-start border border-black">{item.id}</td>
                                <td className="text-center border border-black"> {teams[item.fixture_id].hometeam} vs {teams[item.fixture_id].awayteam} </td>
                                <td className="text-center border border-black">{item.choice}</td>
                                <td className="flex flex-col  border-e border-b border-black">
                                    <Link className="hover:text-blue-500" onClick={(event)=>{
                                        event.preventDefault();
                                        deleteBet(item.id);
                                    }}>Delete</Link>
                                    <Link id={item.id} className="hover:text-blue-500" onClick={(event)=>{
                                        event.preventDefault();
                                        updateFunction(event.target.id)
                                    }}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex mt-5 w-full justify-center">
                    {bets["prev_page_url"] == null ?<Link className="text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href="#" onClick={(e)=>e.preventDefault()}>Prev</Link>:
                    <Link className="text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={bets["prev_page_url"]}>Prev</Link>}
                    {bets['next_page_url'] == null ? <Link className="ms-10 text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={bets["next_page_url"]} onClick={(e)=>e.preventDefault()} >Next</Link>:
                    <Link className="ms-10 text-xl hover:text-sky-600 hover:underline decoration-solid hover:text-2xl" href={bets["next_page_url"]}>Next</Link>}    
                    {isEdit ? <DrawEdit hometeam={homeTeam} awayteam={awayTeam} currBetId={betID} currentValue={currentChoice} /> :null}
                </div>


            </div>
                )
    }
    
    return(
        <AuthLayout name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} admin={true}>
            <div className="grid grid-cols-5">
                <AdminAccountSideNav Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} className="border"/>
                <div className="col-span-4">
                    <div>
                    {props.status !== undefined ? <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative mt-1" role="alert">{props.errors.userError}</div> : null}
                    </div>
                    <h1 className="text-center text-2xl">Update Bet</h1>
                    <div className="mt-6 text-center">
                        <form onSubmit={grabUser}>
                            <InputLabel className="text-xl">Enter User Email</InputLabel>
                                <TextInput className=""
                                value={userEmail}
                                onChange={(e)=>{
                                    onChangeUserEmail(e.target.value)
                                }}
                                />  
                                <SecondaryButton type="submit" className=" ms-2">
                                    Search
                                </SecondaryButton>
                        </form>
                    </div>
                    <div>
                        {props.user?<DrawBetsTable bets={props.bets} teams={props.fixtures}/>:null}
                    </div>
                </div>
            </div>

        </AuthLayout>
    )
}