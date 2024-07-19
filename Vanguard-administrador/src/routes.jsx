import { HomePage } from "./Pages/HomePage/HomePage"
import { Accounts } from "./Pages/Accounts/Accounts"
import { AccountInfo } from "./Pages/AccountInfo/AccountInfo"
import { Loans } from "./Pages/Loans/Loans"
import { OwnAccount } from "./Pages/OwnAccount/OwnAccount"
import { OthersAccounts } from "./Pages/OthersAccounts/OthersAccounts"
import { Payments } from "./Pages/Payments/Payments"
import { History } from "./Pages/History/History"
import { LoanVoucher } from "./Pages/LoanVoucher/LoanVoucher"
import { UserInfo } from "./Pages/UserInfo/UserInfo"
import { OthersTransfer } from "./Pages/OthersTransfer/OthersTransfer"

export const routes = [
    { path: '', element: <HomePage /> },
    { path: '/accounts', element: <Accounts /> },
    { path: '/accounts/:uid', element: <AccountInfo /> },
    { path: '/user', element: <UserInfo /> },
    { path: '/loans', element: <Loans /> },
    { path: '/ownaccounts', element: <OwnAccount /> },
    { path: '/othersaccounts', element: <OthersAccounts /> },
    { path: '/thirdtransfer', element: <OthersTransfer /> },
    { path: '/payments', element: <Payments /> },
    { path: '/history', element: <History /> },
    { path: '/loanvoucher', element: <LoanVoucher /> }
]
