import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import {Link} from "@inertiajs/react";
import { Dialog} from "@headlessui/react";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";



export default function Bets(Auth){
    const props = usePage().props

    
    console.log(props);
    
    function DrawDisscusionForm({comments,user,fixture_id}){
        const [newComment,onChangeNewComment] = useState("");
        

        function submitComment(e){
            e.preventDefault();
            var values = {'comment':newComment,'fixture':fixture_id}
            router.post('/bets/comment',values);
        }

        function deletePost(e){
            e.preventDefault();
            router.delete("/bets/comment/delete/"+e.target.id)

        }

        function reportPost(e){
            e.preventDefault();
            var  values = {'user_id': user.id, 'comment_id': e.target.id}
            router.post('/bets/reportedcomment' ,values);
        }
        

        return(
            <div className="flex flex-col text-center mt-5  me-2 ms-2 justify-center">
                <p className="text-2xl">Discussion</p>
                <div className="border border-slate-300 bg-slate-50">
                    <div className="flex flex-row justify-center bg-slate-50 pt-2 mt-5 ">
                     
                        <form className="size-1/2 flex" onSubmit={submitComment}>
                            <textarea className="border-transparent rounded-lg bg-slate-50  focus:ring-0 focus:border-b focus:border-t-0 focus:border-e-0 focus:border-s-0 focus:rounded-none   focus:border-slate-600  resize-none"
                            placeholder="Add Comment" rows="1" cols="40" autoFocus={true}
                            value={newComment}
                            onChange={(e)=>{
                                onChangeNewComment(e.target.value);
                            }}
                            />
                            <PrimaryButton className=" bg-slate-400 text-black h-7 text-sm rounded-xl ms-3" >Comment</PrimaryButton>
                        </form>
                    </div>
                    <div className="flex bg-slate-50 pt-5">
                            <ul>
                                {comments.data.map((item,index)=>(
                                    <li className=" grid grid-cols-3 w-full border-b border-black mt-5 ms-1 mb-3 " key={index}>
                                        <div className="text-start">
                                            <p className="ms-5 text-xl  border-black">{item.first_name} {item.last_name}</p>
                                        </div>
                                        
                                        <div className="text-start">
                                            <p className="ms-5 text-lg">{item.text}</p>
                                        </div>

                                        <div  className="">
                                            {user.id == item.user_id
                                                ?<img id={item.id} onClick={deletePost} className="size-6 me-8 justify-self-end cursor-pointer hover:size-7" src="/images/trash.png"/>:
                                                <img id={item.id} onClick={reportPost} className="size-6 me-8 justify-self-end cursor-pointer hover:size-7" src="/images/red-flag.png"/>}                                       
                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                    </div>
                    <div className="mb-3">
                        {comments["prev_page_url"] == null ?<Link className="text-xl  decoration-solid "  href={comments["prev_page_url"]} onClick={(e)=>e.preventDefault()}>Prev</Link>:
                        <Link className="text-xl hover:text-sky-600  decoration-solid hover:text-3xl" href={comments["prev_page_url"]}>Prev</Link>}
                        {comments['next_page_url'] == null ? <Link className="ms-10 text-xl   decoration-solid " href={comments["next_page_url"]} onClick={(e)=>e.preventDefault()} >Next</Link>:
                        <Link className="ms-10 text-xl  hover:text-sky-600  decoration-solid hover:text-3xl" href={comments["next_page_url"]}>Next</Link>}  
                    </div>
                </div>
            </div>
        )
    }
    function DrawOdds({fixture,odds}){
        const [betChoice, setBetChoice] = useState("");
        const [location,setLocation] = useState("");
        const  [fixtureId, setFixtureId] = useState("");

        const [teamId,setTeamId] = useState(0);
        const [teamImg,setTeamImg] = useState("");
        const [teamName,setTeamName] = useState("");
        

        function DrawModal({betChoice,location,fixtureId,awayTeam,homeTeam,hImg,aImg}){
            
            function betConfirmation(e){
                e.preventDefault();
                var values={choice:betChoice,fixture:fixtureId}
                router.post("/bets/match",values)
            }

            return(
            <dialog id="my_modal_1" className="modal rounded-xl">
                <div className="modal-box p-5">
                    <div className="flex flex-row justify-between">
                        <div className="text-center">
                            <img className="size-20 " src={hImg}/>
                            <p>{homeTeam}</p>
                        </div>
                        <p className=" me-9">VS</p>
                        <div className="text-center">
                            <img className="size-20 " src={aImg}/>
                            <p>{awayTeam}</p>
                        </div>

                    </div>
                    <p className="py-4 text-lg border-t border-black">Place a bet on {betChoice} at {location} </p>
                    <div className="modal-action">
                        <form method="dialog" className="flex flex-row justify-between">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="  border text-lg rounded-xl p-1  ps-3 pe-3 bg-slate-50 hover:bg-slate-200" onClick={betConfirmation}>Confirm Bet</button>
                            <button className="  border text-lg rounded-xl p-1  ps-3 pe-3 bg-slate-50 hover:bg-slate-200">Back</button>
                        </form>
                    </div>
                </div>
            </dialog>
            )
        }

        function DrawFavModal({teamid,teamImg,teamName}){
            function addFav(){
                var values = {"team_id":teamid};
                router.post('/bets/addfavourite',values)
            }

            return(
                <dialog id="my_modal_2" className="modal rounded-xl">
                <div className="modal-box p-5">
                    <div className="flex flex-row justify-center">
                        <div>
                            <img className="size-20 me-4 mb-3" src={teamImg}/>
                        </div>
                    </div>
                    <p className="py-4 text-lg border-t border-black">Add {teamName} to your favourites</p>
                    <div className="modal-action">
                        <form method="dialog" className="flex flex-row justify-between">
                            {/* if there is a button in form, it will close the modal */}
                            <button className=" border text-lg rounded-xl p-1  ps-3 pe-3 bg-slate-50 hover:bg-slate-200" onClick={addFav}>Add</button>
                            <button className=" border text-lg rounded-xl p-1  ps-3 pe-3  bg-slate-50 hover:bg-slate-200">Back</button>
                        </form>
                    </div>
                </div>
            </dialog>
            )
        }

        return(
            <div className="w-full">
                <div className="flex flex-row justify-center w-full">
                    <img src={fixture[0].teams.home.logo} className="size-20 me-20 hover:cursor-pointer " onClick={()=>{
                        setTeamId(fixture[0].teams.home.id);
                        setTeamImg(fixture[0].teams.home.logo)
                        setTeamName(fixture[0].teams.home.name)
                        document.querySelector("#my_modal_2").showModal()
                    }}
                    
                    />
                    <p className="text-5xl"> vs </p>
                    <img src={fixture[0].teams.away.logo} className="size-20 ms-20 hover:cursor-pointer" onClick={()=>{
                        setTeamId(fixture[0].teams.away.id)
                        setTeamImg(fixture[0].teams.away.logo)
                        setTeamName(fixture[0].teams.away.name)
                        document.querySelector("#my_modal_2").showModal()
                    }}
                    
                    />
                </div>
                <div className="flex flex-row justify-center gap-0 text-3xl  me-60 ms-60  mt-5 ">
                    <div className="bg-slate-200 border border-slate-400 rounded-s-xl text-center hover:cursor-pointer" onClick={()=>{
                        setLocation(fixture[0].fixture.venue.name);
                        setFixtureId(fixture[0].fixture.id);
                        setBetChoice(fixture[0].teams.home.name);
                        //console.log(location);
                        document.querySelector("#my_modal_1").showModal()
                        
                        }}>
                        <p className="me-10 ms-10">{odds[0].bookmakers[0].bets[0].values[0].odd}</p>
                        <p className="text-lg">home</p>
                    </div>
                    <div>
                       <DrawModal location={location} betChoice={betChoice} fixtureId={fixtureId}
                        awayTeam={fixture[0].teams.away.name} homeTeam={fixture[0].teams.home.name}
                        hImg={fixture[0].teams.home.logo} aImg={fixture[0].teams.away.logo}/>
                    </div>
                    <div>
                        <DrawFavModal teamid={teamId} teamImg={teamImg} teamName={teamName}/>
                    </div>
                    <div className="bg-slate-200 border text-center border-slate-400 hover:cursor-pointer" onClick={()=>{
                        setLocation(fixture[0].fixture.venue.name);
                        setFixtureId(fixture[0].fixture.id);
                        setBetChoice("DRAW")
                        document.querySelector("#my_modal_1").showModal()
                        
                        
                        }}>
                        <p className="me-10 ms-10">{odds[0].bookmakers[0].bets[0].values[1].odd}<br/></p>
                        <p className="text-lg">draw</p>
                    </div>
                    
                    <div className="bg-slate-200 text-center border border-slate-400 rounded-e-xl hover:cursor-pointer " onClick={()=>{


                        setLocation(fixture[0].fixture.venue.name);
                        setFixtureId(fixture[0].fixture.id);
                        setBetChoice(fixture[0].teams.away.name);
                        document.querySelector("#my_modal_1").showModal(fixture[0].teams.away.name,fixture[0].fixture.id,fixture[0].fixture.venue.name)
                        
                        
                        
                        }}>
                        <p className="me-10 ms-10">{odds[0].bookmakers[0].bets[0].values[2].odd}</p>
                        <p className="text-sm">away</p>
                    </div>
                </div>
            </div>
        )
    }
    
    function DrawMatches({matches,logged_in}){

        const imgClass = "size-7 mt-1 mb-1"


        function convertTime(time){
            var localDate = new Date(time);

            if(localDate.toString()[16] == "0"){
                return localDate.toString().substring(17,21)
            }
            return localDate.toString().substring(16,21)
            
        }

        function chosenMatch(id,logged_in){
            if(logged_in){
                router.get("/bets/match/"+id)
            }
        }

        return(
            <div className="w-full">
                <h1 className="text-center text-xl">Home vs Away</h1>
                <ul className="">
                    {matches.map((item,index)=>(
                        <li className="flex flex-row w-full bg-slate-50 size-10 justify-center mt-2 mb-2 border rounded-md hover:border-black " onClick={()=>
                            chosenMatch(item['fixture']['id'],logged_in)
                        } key={index}>
                            <img src={item.teams.home.logo} className={imgClass + " self-start me-10"}/>
                            <p className="text-center text-sm">
                                {item.fixture.date.substring(0,10)} <br/>
                                {convertTime(item.fixture.date)}
                            </p>
                            <img src={item.teams.away.logo} className={imgClass +" self-end ms-10" } />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    function DrawBets({bets}){
        


        var statusImgClass = "size-2 mt-2 ms-2"

        var betClassName = "mt-5 ms-5 me-5 bg-slate-200";
        var correctBetClassName = "mt-5 ms-5 me-5 bg-slate-200 border border-green-500";
        var incorrectBetClassName = "mt-5 ms-5 me-5 bg-slate-200 border border-red-500";

        

        return(
            <div className="bg-slate-100 p-10 m-3">
                <ul className="flex flex-col ">
                    {
                        bets.data.map((item,index)=>(
                            <li className={item.outcome == "correct" || item.outcome == "incorrect"? item.outcome == "correct" ? correctBetClassName : incorrectBetClassName :betClassName} key={index}>

                                 <div className="flex flex-row justify-between">
                                 {
                                        item.status =="NS" || item.status == "FT" ? item.status  == "NS"? <img className={statusImgClass} src="images/blue.png"/>: <img className={statusImgClass} src="images/reds.png"/>: <img className={statusImgClass} src="images/green.png"/> 
                                    }
                                    <div className="flex flex-row">
                                        <img className="size-10 me-5" src={item.homeImg}/>
                                        <p className="text-lg">VS</p>
                                        <img className="size-10 ms-5" src={item.awayImg} />
                                    </div>
                                    <p className="me-2 mt-2">{item.awayGoals == null && item.homeGoals == null? "": item.homeGoals + "-" +item.awayGoals}</p>
                                 </div>
                                 <p className="text-xl">Prediction: {item.choice}</p>
                            </li>
                        ))
                    }
                </ul>
                <div className="mt-3">
                {bets["prev_page_url"] == null ?<Link className="text-xl  decoration-solid "  href={bets["prev_page_url"]} onClick={(e)=>e.preventDefault()}>Prev</Link>:
                <Link className="text-xl hover:text-sky-600  decoration-solid hover:text-3xl" href={bets["prev_page_url"]}>Prev</Link>}
                {bets['next_page_url'] == null ? <Link className="ms-10 text-xl   decoration-solid " href={bets["next_page_url"]} onClick={(e)=>e.preventDefault()} >Next</Link>:
                <Link className="ms-10 text-xl  hover:text-sky-600  decoration-solid hover:text-3xl" href={bets["next_page_url"]}>Next</Link>}  
                </div>
            </div>
        )
    }

    if(!props.logged_in){
        return(
            <GuestLayout>
                <div className="grid gap-0 grid-cols-3">
                    <div className="col-span-1 ms-10">
                        <DrawMatches matches={props.matches} logged_in={props.logged_in} />
                    </div>
                    <div className="text-center col-span-2">
                        <h1 className="text-3xl">Pick a Match <br/>Place a Bet</h1>
                        <p className="text-xl mt-10 mb-10">Need to log into account to place a bet</p>
                        <Link className="text-3xl mt-10 border font-thin text-slate-800  bg-slate-200 border-s border-e   rounded-lg text-center border-slate-400 ps-10 pe-10 rounded-lg hover:border-black" href={route('login')}>LOGIN</Link>
                    </div>
                </div>
            </GuestLayout>
        )
    }else{
        return(
            <AuthLayout name={props.auth.user.first_name + " " + props.auth.user.last_name}>
                <div className="grid gap-0 grid-cols-3">
                    <div className="col-span-1 ms-10">
                        <DrawMatches matches={props.matches} logged_in={props.logged_in} />
                    </div>
                    {props.chosenMatch ?<div className="w-full col-span-2"> <DrawOdds fixture={props.fixture} odds={props.odds} /> <DrawDisscusionForm comments={props.comments} user={props.auth.user} fixture_id={props.fixture[0].fixture.id} /> </div> :
                        <div className="text-center col-span-2">
                            <h1 className="text-3xl">Pick a Match <br/>Place a Bet</h1>
                            <DrawBets bets={props.allBets}/>
                        </div>
                    }
                </div>
            </AuthLayout>
        )
    }


}