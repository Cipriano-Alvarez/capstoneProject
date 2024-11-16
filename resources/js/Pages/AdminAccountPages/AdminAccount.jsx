import AuthLayout from "@/Layouts/AuthLayout";
import AdminAccountSideNav from "./Shared/AdminAccounSideNav";
import { usePage } from "@inertiajs/react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Label } from "recharts";




export default function AdminAccount(Auth){
    const props = usePage().props;
    console.log(props)

    const data = [
        {
            'title':'wins',
            'count':props.data.wins
        },
        {
            'title':'loses',
            'count':props.data.loses
        }
    ]

    const teamData = [];
    for(const key in props.data.fixtures){
        teamData.push({
            'name':props.data.fixtures[key].name,
            'count': props.data.fixtures[key].count
        });
    }

    


    return(
        <AuthLayout  name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} admin={true}>
            <div className="grid grid-cols-5">
                <AdminAccountSideNav Name={Auth["auth"]["user"]["first_name"] + " " +Auth["auth"]["user"]["last_name"]} className="border"/>
                <div className="col-span-4">
                    <h1 className="text-xl text-center">Welcome Admin</h1>
                    <div className="flex flex-row justify-center mt-10 mb-5" >
                        <BarChart width={500} height={250} data={data} margin={{bottom: 10,right:5}}>

                            <XAxis dataKey="title" >
                                <Label value="Total users Wins vs Losses" offset={0} position="insideBottom" />
                            </XAxis>

                            <Tooltip />

                            <Bar dataKey="count" fill="#8884d8"  />


                        </BarChart>

                        <BarChart className="mb-5" width={500} height={250} data={teamData} margin={{bottom: 10,left:5}}>

                            <XAxis dataKey="name"  >
                                <Label  value="Teams" offset={-5} position="bottom" />
                            </XAxis>

                            <Tooltip />

                            <Bar dataKey="count" fill="gray"  />


                        </BarChart>
                        
                    </div>
                    <p className="text-xl text-center">Total user Bets: {props.data.total}</p>
                </div>
            </div>
        </AuthLayout>
    )
}