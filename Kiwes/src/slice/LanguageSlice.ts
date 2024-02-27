import {LANGUAGE} from '@/utils/utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: LANGUAGE.KO,
};

export const LanguageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(
      state: LanguageState,
      action: PayloadAction<{language: string}>,
    ) {
      state.language = action.payload.language;
    },
  },
});
export const {setLanguage} = LanguageSlice.actions;

export default LanguageSlice.reducer;
