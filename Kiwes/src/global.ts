import {Dimensions} from 'react-native';

export const colors = {
  textBlack: '#303030',
  textGreen: '#58C047',
  textRed: '#FF0000',
};

export const basicDimensions = {
  height: 812,
  width: 375,
};

export const DeviceHeight: number = Number(Dimensions.get('screen').height);
export const DeviceWidth: number = Number(Dimensions.get('screen').width);

export const height: number = // 높이 변환 작업
  Number(
    (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
  );

export const width: number = // 가로 변환 작업
  Number(
    (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
  );
