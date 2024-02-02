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
  location: string;
  latitude: number;
  longitude: number;
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

export interface LocationType {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
export interface Banner {
  type: string;
  imageUrl: string;
  url: string;
  id: number;
}

export interface ParticipatedClubInfo {
  clubId: number;
  thumbnailImage: string;
}
export interface ReviewDetail {
  reviewId: string;
  isAuthorOfReply: boolean;
  isAuthorOfReview: boolean;
  isModified: boolean;
  reviewerId: string;
  respondentId: string;
  replyContent: string;
  replyDate: string;
  respondentNickname: string;
  respondentProfileImg: string;
  reviewContent: string;
  reviewDate: string;
  reviewerNickname: string;
  reviewerProfileImg: string;
}
export interface QnADetail {
  adate: string;
  answerContent: string;
  isAuthorOfAnswer: boolean;
  isAuthorOfQuestion: boolean;
  isModified: boolean;
  qdate: string;
  qnaId: string;
  questionContent: string;
  questionerId: string;
  questionerNickname: string;
  questionerProfileImg: string;
  respondentId: string;
  respondentNickname: string;
  respondentProfileImg: string;
  isDeleted: string;
  isAnswered: string;
}

export interface BoardPost {
  locationKeyword: string;
  clubId: string;
  title: string;
  thumbnailImage: string;
  date: string;
  isHeart: string;
  languages: string[];
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
export interface MypageInfo {
  age: number;
  gender: string;
  introduction: string;
  nationality: string;
  nickname: string;
  profileImage: string;
}
export interface OwnClubInfo {
  clubId: number;
  title: string;
  currentPeople: number;
}
export interface ReviewList {
  clubId: number;
  clubTitle: string;
  mine: boolean;
  reviewContent: string;
  reviewDate: string;
  reviewId: number;
}
