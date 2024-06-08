import {atom} from "recoil"


export const userName = atom<String>({
    key : 'userName',
    default : ""
})
 export const userRole = atom({
    key : 'userRole',
    default : ""
})