import { Link } from "@inertiajs/react"

export default function UserAccountSideNav(Auth){
    return(
        <div className="h-full border-r-2">
            <ul className="text-center space-y-4">
                <li className="text-3xl border-b-2 pb-10 "><Link>{Auth.Auth.auth['user']['first_name'] + " " + Auth.Auth.auth['user']['last_name']}</Link></li>
                <li className="text-3xl border-b-2 pb-2"><Link>Email</Link></li>
                <li className="text-3xl border-b-2 pb-2"><Link>Password</Link></li>
                <li className="text-3xl border-b-2 pb-2"><Link>Favorites</Link></li>
            </ul>
        </div>
    )
}