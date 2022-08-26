import {Routes, RouterModule} from '@angular/router';
import {AdminLayoutComponent} from "../layouts/admin/admin-layout.component";
import {ComingSoonComponent} from "../shared/components/coming/coming.component";

export const AdminRoutes: Routes = [
    {
        path: '', component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#AdminDashboardModule'
            },
            {
                path: 'wallet',
                loadChildren: './wallet/wallet.module#AdminWalletModule'
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule'
            },
            {
                path: 'userverify',
                loadChildren: './verify/verify.module#VerifyModule'
            },
            {
                path: 'users/detail/:user_id',
                loadChildren: './userdetail/userdetail.module#UserDetailModule',
            },
            {
                path: 'marketorder',
                loadChildren: './marketOrder/marketOrder.module#MarketOrderModule',
            },
            {
                path: 'markethistory',
                loadChildren: './marketHistory/marketHistory.module#MarketHistoryModule',
            },
            {
                path: 'competition',
                loadChildren: './competition/competition.module#CompetitionModule',
            },
            {
                path: 'depositpending',
                loadChildren: './depositpending/depositpending.module#DepositPendingModule',
            },
            {
                path: 'deposithistory',
                loadChildren: './depositHistory/depositHistory.module#DepositHistoryModule',
            },
            {
                path: 'withdrawpending',
                loadChildren: './withdrawpending/withdrawpending.module#WithdrawPendingModule',
            },
            {
                path: 'withdrawhistory',
                loadChildren: './withdrawHistory/withdrawHistory.module#WithdrawHistoryModule',
            },
            {
                path: 'pairsetting',
                loadChildren: './pairSetting/pairSetting.module#PairSettingModule',
            },
            {
                path: 'statistics',
                loadChildren: './statistics/statistics.module#StatisticsModule',
            },
            // {
            //     path: 'fastbuyhistory',
            //     loadChildren: './fastbuyHistory/fastbuyHistory.module#FastbuyHistoryModule',
            // },
            {
                path: 'icohistory',
                loadChildren: './icoHistory/icoHistory.module#ICOHistoryModule',
            },{
                path: 'icosetting',
                loadChildren: './icoSetting/icoSetting.module#ICOSettingModule',
            },
            // {
            //     path: 'setting',
            //     data: {
            //         title: 'Setting'
            //     },
            //     component: ComingSoonComponent
            // },
            // {
            //     path: 'ticket',
            //     loadChildren: './ticket/ticket.module#AdminTicketModule',
            // }
        ]
    },
    { path: '**', redirectTo: 'dashboard'}
];
