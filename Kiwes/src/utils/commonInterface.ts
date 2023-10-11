export interface ClubInfo {
  clubId: number;
  title: string;
  currentPeople: number;
}

export interface Chat {
  msg: string;
  time: string;
  writer: string;
}
export interface UserInfo {
  email: string;
  id: number;
  nickName: string;
}

export interface ClubSimpleData {
  title: string;
  currentPeople: number;
  hostNickname: string;
  hostThumbnailImage: string;
  members: ClubMember[];
}
export interface ClubMember {
  id: number;
  nickname: string;
  thumbnail: string;
}
