import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/state';
import { setUserInfo, AccountStatus } from './actions';
import {network, getScatter, getClient, initLink} from '@/utils/client'
import {IdentityProof,ChainId,APIError} from "@amax/anchor-link";

const initialState = {
    account: {
        kyc: false,
        name: '',
        publicKey: '',
        status: 0,
    }
};

export const blockchains = [
  {
    chainId: network.chainId,
    name: network.blockchain,
    rpcEndpoints: [
      {
        protocol: network.protocol,
        host: network.host,
        port: 0,
      },
    ],
  },
];

const BaseInfoSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setUserInfo(state, { payload: account }) {
            state.account = account;
        }
    },
});


export async function verifyProof(link, identity) {
  // Generate an array of valid chain IDs from the demo configuration
  const chains = blockchains.map(chain => chain.chainId);

  // Create a proof helper based on the identity results from anchor-link
  const proof = IdentityProof.from(identity.proof);

  // Check to see if the chainId from the proof is valid for this demo
  const chain = chains.find(id => ChainId.from(id).equals(proof.chainId));
  if (!chain) {
    throw new Error('Unsupported chain supplied in identity proof');
  }

  // Load the account data from a blockchain API
  // let account: API.v1.AccountObject;
  let account = null;
  try {
    account = await link.client.v1.chain.get_account(proof.signer.actor);
  } catch (error) {
    if (error instanceof APIError && error.code === 0) {
      throw new Error('No such account');
    } else {
      throw error;
    }
  }

  // Retrieve the auth from the permission specified in the proof
  const auth = account.getPermission(proof.signer.permission).required_auth;

  // Determine if the auth is valid with the given proof
  const valid = proof.verify(auth, account.head_block_time);

  // If not valid, throw error
  if (!valid) {
    throw new Error('Proof invalid or expired');
  }

  // Recover the key from this proof
  const proofKey = proof.recover();

  // Return the values expected by this demo application
  return {
    account,
    proof,
    proofKey,
    proofValid: valid,
  };
}

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
                console.log(link,'linklink');

                const identity = await link.login("anchor-link-demo");
                const { account, proof, proofKey, proofValid } = await verifyProof(
                  link,
                  identity,
                );
                console.log(account, proof, proofKey, proofValid,'ssss');
                // return
                // const account = await link.client.v1.chain.get_account(proof.signer.actor);
                // console.log(identity.session,account)
                // dispatch(setUserInfo({
                //     kyc: false,
                //     name: account.account_name.toString(),
                //     publicKey: '',
                //     status: 0
                // }));
                // console.log('ssssssssssss',account.account_name.toString())
            }

        }catch(e){
            console.error('login Error:', e)
        }
    };

export default BaseInfoSlice.reducer;

