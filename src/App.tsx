import React from 'react';
import { Grid, Box, Fab } from '@mui/material';

import { useAppSelector, useAppDispatch } from './redux/hooks';

import { CardItem, GetCardList, GetCardListTen, Button } from './components';

export const App = () => {
  const dispatch = useAppDispatch();
  const cardList = useAppSelector((state) => state.CardReducer.cardList);

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (cardList.length === 0) {
      GetCardList({ dispatch });
    }
  }, [cardList.length]);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Grid
        sx={{ textAlign: 'left', mb: 5 }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cardList.length !== 0
          ? cardList.map((item) => (
              <Grid key={item.id} item xs={3}>
                <Box sx={{ minWidth: 275 }}>
                  <CardItem
                    type={item.type}
                    setup={item.setup}
                    punchline={item.punchline}
                    setCount={setCount}
                    count={count}
                    id={item.id}
                  />
                </Box>
              </Grid>
            ))
          : 'loading...'}
      </Grid>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Fab variant="extended" size="small" color="primary" aria-label="add">
          {count} повторення
        </Fab>
      </Box>
      <Button click={() => GetCardListTen({ dispatch })} variant="contained" size="large">
        load more
      </Button>
    </Box>
  );
};
