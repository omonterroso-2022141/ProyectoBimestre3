import { HomePage } from "./Pages/HomePage/HomePage"
import { Accounts } from "./Pages/Accounts/Accounts"
import { Loans } from "./Pages/Loans/Loans"
import { OwnAccount } from "./Pages/OwnAccount/OwnAccount"
import { OthersAccounts } from "./Pages/OthersAccounts/OthersAccounts"
import { Payments } from "./Pages/Payments/Payments"
import { History } from "./Pages/History/History"

export const routes = [
    { path: '', element: <HomePage /> },
    { path: '/accounts', element: <Accounts /> },
    { path: '/loans', element: <Loans /> },
    { path: '/ownaccounts', element: <OwnAccount /> },
    { path: '/othersaccounts', element: <OthersAccounts /> },
    { path: '/payments', element: <Payments /> },
    { path: '/history', element: <History /> }
]
