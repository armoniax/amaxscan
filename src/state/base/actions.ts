import { createAction } from '@reduxjs/toolkit';

export enum UserStatus {
    efficient = 1,
    unefficient = 2,
}
export type Theme = 'drak' | 'light';
export type AccountStatus = 0 | 1; // 0: 未激活   1：已激活
export type Language = string;
export interface AcountState {
    kyc: boolean;
    name: string;
    publicKey: string;
    status: AccountStatus;
}
export interface TopBarInfo {
    title: string;
    goback?: string;
}

export const setUserInfo = createAction<AcountState>('base/setUserInfo');
export const setTheme = createAction<Theme>('base/setTheme');
export const setTopBar = createAction<TopBarInfo>('base/setTopBar');
export const setLanguage = createAction<Language>('base/setLanguage');
