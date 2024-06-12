import {atom} from "recoil"


export const userName = atom<String>({
    key : 'userName',
    default : ""
})
 export const userRole = atom<String>({
    key : 'userRole',
    default : ""
})