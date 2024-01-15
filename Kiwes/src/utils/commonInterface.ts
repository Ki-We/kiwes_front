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
  locationKeyword: string;
  clubId: string;
  title: string;
  thumbnailImage: string;
  date: string;
  isHeart: string;
  languages: string[];
  category: string;
}
export interface ClubApprovalRequest {
  clubId: string;
  title: string;
  currentPeople: number;
}
export interface ClubMemberApprovalRequestEach {
  nickname: string;
  profileImg: string;
  memberId: string;
}
export interface Alarm {
  type: string;
  content: string;
  clubId: string;
  createAfterHour: string;
  createAfterDay: string;
  memberId: string;
  imageUrl: string;
  noticeId: string;
}
