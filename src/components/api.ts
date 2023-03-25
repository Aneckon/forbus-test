import axios from 'axios';
import { addCard, addCardList, addCardListTen } from '../redux/reducers/cardSlice';

interface GetCardListProps {
  dispatch: (res: any) => void;
}

export const GetCardList = ({ dispatch }: GetCardListProps) => {
  axios
    .get('https://official-joke-api.appspot.com/jokes/ten')
    .then(function (res) {
      dispatch(addCardList(res.data));
      if (localStorage.getItem('card')) {
        dispatch(addCard(JSON.parse(localStorage.getItem('card') || '')));
      }
    })
    .catch(function (error) {
      alert(error);
    });
};

export const GetCardListTen = ({ dispatch }: GetCardListProps) => {
  axios
    .get('https://official-joke-api.appspot.com/jokes/ten')
    .then(function (res) {
      dispatch(addCardListTen(res.data));
    })
    .catch(function (error) {
      alert(error);
    });
};

export const GetCardItem = ({ dispatch }: GetCardListProps) => {
  axios
    .get('https://official-joke-api.appspot.com/jokes/random')
    .then(function (res) {
      dispatch(addCard(res.data));
      localStorage.setItem('card', JSON.stringify(res.data));
    })
    .catch(function (error) {
      alert(error);
    });
};

interface RefreshCardItemProps {
  setCardItem: (res: any) => void;
}

export const RefreshCardItem = ({ setCardItem }: RefreshCardItemProps) => {
  axios
    .get('https://official-joke-api.appspot.com/jokes/random')
    .then(function (res) {
      setCardItem(res.data);
    })
    .catch(function (error) {
      alert(error);
    });
};

interface UpdateCardItemProps {
  setCardUpdateItem: (res: any) => void;
}

export const UpdateCardItem = ({ setCardUpdateItem }: UpdateCardItemProps) => {
  axios
    .get('https://official-joke-api.appspot.com/jokes/random')
    .then(function (res) {
      setCardUpdateItem(res.data);
    })
    .catch(function (error) {
      alert(error);
    });
};
