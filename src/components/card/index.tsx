import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { refreshCard, removeCard, upDateCard } from '../../redux/reducers/cardSlice';

import { GetCardItem, RefreshCardItem, Button, UpdateCardItem } from '..';

import { Card, CardActions, CardContent, Typography } from '@mui/material';

interface CardItemProps {
  type: string;
  setup: string;
  punchline: string;
  id: number;
  setCount: (count: number) => void;
  count: number;
}

export const CardItem: FC<CardItemProps> = ({ type, setup, punchline, id, setCount, count }) => {
  const dispatch = useAppDispatch();
  const cardList = useAppSelector((state) => state.CardReducer.cardList);

  const [cardItem, setCardItem] = React.useState({
    type: '',
    setup: '',
    punchline: '',
    id: 0,
  });
  const [cardUpdateItem, setCardUpdateItem] = React.useState({
    type: '',
    setup: '',
    punchline: '',
    id: 0,
  });

  const clickCardRemove = () => {
    dispatch(removeCard(id));

    if (localStorage.getItem('card') && JSON.parse(localStorage.getItem('card') || '').id === id) {
      localStorage.removeItem('card');
    }
  };

  const clickCardRefresh = () => {
    RefreshCardItem({ setCardItem });
  };

  React.useEffect(() => {
    const idMap = new Map();
    for (const card of cardList) {
      if (idMap.has(card.id)) {
        UpdateCardItem({ setCardUpdateItem });
        if (cardUpdateItem.type.length) {
          idMap.set(cardUpdateItem.id, cardUpdateItem);
        }
        setCount(count + 1);
      } else {
        idMap.set(card.id, card);
      }
    }
    const uniqueCards = Array.from(idMap.values());
    dispatch(upDateCard(uniqueCards));
  }, []);

  React.useEffect(() => {
    if (cardItem.type.length) {
      const newsCardList = [...cardList];

      const index = newsCardList.findIndex((item) => item.id === id);

      const newCardItem = {
        type: cardItem.type,
        setup: cardItem.setup,
        punchline: cardItem.punchline,
        id: cardItem.id,
      };

      newsCardList.splice(index, 1, newCardItem);
      dispatch(refreshCard(newsCardList));
    }
  }, [cardItem.type.length]);

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Type: {type}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>Id: {id}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Setup:
        </Typography>
        <Typography sx={{ mb: 1 }} variant="body2">
          {setup}
        </Typography>
        <Typography color="text.secondary">Punchline:</Typography>
        <Typography variant="body2">{punchline}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" click={clickCardRemove}>
          Delete
        </Button>
        <Button size="small" click={() => GetCardItem({ dispatch })}>
          Add
        </Button>
        <Button size="small" click={clickCardRefresh}>
          Refresh
        </Button>
      </CardActions>
    </Card>
  );
};
