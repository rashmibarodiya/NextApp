import { atom } from "recoil";

export interface CourseType{
    title: string,
    description: string,
    imageLink: string,
    price: number,
    published: boolean
    _id : string
}

export const courseState = atom<CourseType[]>({
    key: 'courseState',
    default: [],
  });
  

export const courseDetails = atom<CourseType | null>({
    key: 'courseDetails',
    default: null
});

export const title = atom<string>({
    key: 'title',
    default: ""
});

export const des = atom<string>({
    key: 'desc',
    default: ""
});

export const img = atom<string>({
    key: 'img',
    default: ""
});

export const price = atom<number>({
    key: 'price',
    default: 0  // Correctly initialize with a number
});
