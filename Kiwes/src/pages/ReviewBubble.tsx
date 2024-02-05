import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ReviewList} from '../utils/commonInterface';

export default function ReviewBubble({
  reviewList,
  navigation,
}: {
  reviewList: ReviewList;
  navigation: any;
}) {
  return (
    <View style={styles.reviewContainer}>
      <TouchableOpacity
        style={reviewList.mine === true ? styles.myReview : styles.otherReview}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('ClubDetail', {clubId: reviewList.clubId});
          console.log(reviewList.clubId);
        }}>
        <>
          {reviewList.mine === true ? (
            <>
              <Text style={styles.myClubTitle}>{reviewList.clubTitle}</Text>
              <Text style={styles.myReviewContent}>
                {reviewList.reviewContent}
              </Text>
              <Text style={styles.myReviewDate}>{reviewList.reviewDate}</Text>
            </>
          ) : (
            <>
              <Text style={styles.otherClubTitle}>{reviewList.clubTitle}</Text>
              <Text style={styles.otherReviewContent}>
                {reviewList.reviewContent}
              </Text>
              <Text style={styles.otherReviewDate}>
                {reviewList.reviewDate}
              </Text>
            </>
          )}
        </>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    // backgroundColor: 'black',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myReview: {
    width: '85%',
    backgroundColor: '#58C047',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderBottomRightRadius: 0,
  },
  otherReview: {
    width: '85%',
    backgroundColor: '#EDEDED',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
  },
  myClubTitle: {
    color: '#FFF',
    fontFamily: 'Pretendard-bold',
    fontSize: 16,
    fontWeight: '600',
  },
  myReviewContent: {
    marginTop: 5,
    color: '#FFF',
    fontFamily: 'Pretendard-bold',
    fontSize: 14,
    fontWeight: '400',
  },
  myReviewDate: {
    marginTop: 5,
    color: '#FFF',
    fontFamily: 'Pretendard-bold',
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
  otherClubTitle: {
    color: '#303030',
    fontFamily: 'Pretendard-bold',
    fontSize: 16,
    fontWeight: '600',
  },
  otherReviewContent: {
    marginTop: 5,
    color: '#303030',
    fontFamily: 'Pretendard-bold',
    fontSize: 14,
    fontWeight: '400',
  },
  otherReviewDate: {
    marginTop: 5,
    color: '#8A8A8A',
    fontFamily: 'Pretendard-bold',
    fontSize: 12,
    fontWeight: '400',
  },
});
