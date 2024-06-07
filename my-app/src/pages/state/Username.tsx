import {atom} from "recoil"


export const userName = atom({
    key : 'userName',
    default : null
})
 export const userRole = atom({
    key : 'userRole',
    default : ""
})