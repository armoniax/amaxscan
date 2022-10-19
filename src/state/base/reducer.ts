import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/state';
import { setUserInfo, AccountStatus } from './actions';
import { network, getScatter, getClient } from '@/utils/client'

const initialState = {
    topBar: {
        title: '',
        goback: '',
    },
    account: {
        kyc: false,
        name: '',
        publicKey: '',
        status: 0,
    },
    themeMode: 'light',
};

const BaseInfoSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setTopBar(state, { payload: TopBar }) {
            state.topBar = TopBar;
        },
        setTheme(state, { payload: theme }) {
            state.themeMode = theme;
        },
        setUserInfo(state, { payload: account }) {
            state.account = account;
        }
    },
});
export const getUserInfo =
    (): AppThunk =>
    async dispatch => {
        try{
            let accountStatus: AccountStatus;
            const scatter:any = getScatter(), _getClient:any = await getClient();
            const identity = await scatter.getIdentity({
                accounts: [{ chainId: network.chainId, blockchain: network.blockchain }],
            });

            const account = identity?.accounts[0];
            try{
                await _getClient.getAccount(account.name);
                accountStatus = 1;
            }catch(e){
                accountStatus = 0;
            }

            dispatch(setUserInfo({
                kyc: identity.kyc,
                name: account.name,
                publicKey: identity.publicKey,
                status: accountStatus
            }));
            console.log("----login",identity)
        }catch(e){
            console.error('login Error:', e)
        }
    };

export default BaseInfoSlice.reducer;

