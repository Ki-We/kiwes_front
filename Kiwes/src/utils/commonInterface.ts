export interface ClubInfo {
  clubId: number;
  title: string;
  currentPeople: number;
}

export interface Chat {
  msg: string;
  time: string;
  writer: string;
  userId: number;
}
export interface UserInfo {
  email: string;
  id: number;
  nickName: string;
}

export interface ClubSimpleData {
  title: string;
  currentPeople: number;
  hostId: number;
  hostNickname: string;
  hostThumbnailImage: string;
  members: ClubMember[];
}
export interface ClubMember {
  id: number;
  nickName: string;
  thumbnail: string;
}
export interface BoardPost {
  locationsKeyword: string;
  clubId: string;
  title: string;
  thumbnailImage: string;
  date: string;
  heart: boolean;
  languages: string[];
}
