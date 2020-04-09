export type postsType = {
    id: number,
    message: string,
    likes: number
};
export type profileContactType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
};
export type profilePhotosType = {
    small: string | null,
    large: string | null
};
export type profileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: profileContactType,
    photos: profilePhotosType,
};
export type userType = {
    id: number,
    name: string,
    status: string,
    photos: profilePhotosType
};