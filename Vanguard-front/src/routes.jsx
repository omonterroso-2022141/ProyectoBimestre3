import { HomePage } from "./Pages/HomePage/HomePage"
import { Accounts } from "./Pages/Accounts/Accounts"
import {Loans} from "./Pages/Loans/Loans"

export const routes = [
    {path: '', element: <HomePage/>},
    {path: '/accounts', element: <Accounts/>},
    {path: '/loans', element: <Loans/>}
]
