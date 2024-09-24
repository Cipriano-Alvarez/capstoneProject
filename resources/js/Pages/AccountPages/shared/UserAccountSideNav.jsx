import { Link } from "@inertiajs/react"

export default function UserAccountSideNav({Name}){
    return(
        <div className="h-full size-full border-r-2">
            {console.log(Name)}
            <ul className="text-center space-y-4">
                <li className="text-2xl border-b-2 pb-10 "><Link href={route("account")}>{Name}</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link href={route("updateEmail")}>Email</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link>Password</Link></li>
                <li className="text-2xl border-b-2 pb-2"><Link>Favorites</Link></li>
            </ul>
        </div>
    )
}