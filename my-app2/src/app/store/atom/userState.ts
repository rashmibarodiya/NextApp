import {atom} from "recoil"
import { courseType } from "@/app/types/ty";

export const userName = atom<String>({
    key : 'userName',
    default : ""
})
 export const userRole = atom<String>({
    key : 'userRole',
    default : ""
})

export const courseState = atom<courseType[]>({
    key: 'courseState',
    default: [],
  });