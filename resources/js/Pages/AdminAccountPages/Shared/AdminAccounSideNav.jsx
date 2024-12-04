import { Link } from "@inertiajs/react"

export default function AdminAccountSideNav({Name}){
    return(
        <div className="size-full border-r-2">
            <ul className="text-center space-y-4">
                <li className="text-2xl border-b-2 pb-10 "><Link href={route("admin")}>{Name}</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link href={route("newEmail")}>Email</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link href={route("updatePassword")} >Password</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link href={route("updateUser")} >Update User</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link href={route("updatebet")}>Update Bet</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link href={route("articles")}>Articles</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link href={route("newAdmin")}>New Admin</Link></li>
            </ul>
        </div>
    )
}