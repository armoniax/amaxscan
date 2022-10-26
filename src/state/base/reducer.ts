import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/state';
import { setUserInfo, AccountStatus } from './actions';
import {network, getScatter, getClient, initLink} from '@/utils/client'
import {IdentityProof} from "@amax/anchor-link";
import {numerToNameic} from "@/utils";

const initialState = {
    account: {
        kyc: false,
        name: '',
        publicKey: '',
        status: 0,
    }
};

const BaseInfoSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setUserInfo(state, { payload: account }) {
            state.account = account;
        }
    },
});
export const getUserInfo =
    (connectorType:any): AppThunk =>
    async dispatch => {
        try{
            if(connectorType === 'Scatter'){
                let accountStatus: AccountStatus;
                const scatter:any = getScatter(), _getClient:any = await getClient();
                const identity = await scatter.getIdentity({
                    accounts: [{ chainId: network.chainId, blockchain: network.blockchain }],
                });
                console.log('identityidentity',identity)
                const account = identity?.accounts[0];
                try{
                    await _getClient.getAccount(account.name);
                    accountStatus = 1;
                }catch(e){
                    accountStatus = 0;
                }
                console.log('ssssssssssss',account.name,identity.publicKey)
                dispatch(setUserInfo({
                    kyc: identity.kyc,
                    name: account.name,
                    publicKey: identity.publicKey,
                    status: accountStatus
                }));
            }else{
                const link = initLink();
                const identity = await link.login("anchor-link-demo");
                console.log(identity)
                const proof = IdentityProof.from(identity.proof);
                const account = await link.client.v1.chain.get_account(proof.signer.actor);
                console.log(identity.session,account)
                dispatch(setUserInfo({
                    kyc: false,
                    name: account.account_name.toString(),
                    publicKey: '',
                    status: 0
                }));
                console.log('ssssssssssss',account.account_name.toString())
            }

        }catch(e){
            console.error('login Error:', e)
        }
    };

export default BaseInfoSlice.reducer;

