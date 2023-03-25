import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CardProps {
  cardList: {
    type: string;
    setup: string;
    punchline: string;
    id: number;
  }[];
}

const initialState: CardProps = {
  cardList: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCardList: (state, actions) => {
      state.cardList = actions.payload;
    },
    removeCard: (state, actions) => {
      state.cardList = state.cardList.filter((card) => card.id !== actions.payload);
    },
    addCard: (state, actions) => {
      state.cardList.unshift(actions.payload);
    },
    refreshCard: (state, actions) => {
      state.cardList = actions.payload;
    },
    upDateCard: (state, actions) => {
      state.cardList = actions.payload;
    },
    addCardListTen: (state, actions) => {
      state.cardList = [...state.cardList, ...actions.payload];
    },
  },
});

export const { addCardList, removeCard, addCard, refreshCard, addCardListTen, upDateCard } = cardSlice.actions;
export default cardSlice.reducer;
