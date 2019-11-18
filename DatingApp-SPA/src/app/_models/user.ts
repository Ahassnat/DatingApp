import { Photo } from "./Photo";

export interface User {
    id: number;
    username: string;
    gender: string;
    age: number;
    knownas: string;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    photoUrl: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    photo?: Photo[];
}
