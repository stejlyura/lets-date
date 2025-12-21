export type userInfo = {
    ocupation: string;
    isSmoking: boolean;
    isDrinking: boolean;
    aboutMe: string;
    isDogs: boolean;
    isCats: boolean;
    hobbies: string[];

}


export type userData = {
    data_id: number;
    fname: string;
    age: number;
    isLike: boolean;
    mainImg: string;
    isActive: boolean;
    range: number;
    additionalInfo: userInfo;
}