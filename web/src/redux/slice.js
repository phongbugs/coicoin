import { createSlice } from '@reduxjs/toolkit';
function fetchPrice(symbol, pair) {
  return 100;
}
export const slice = createSlice({
  name: 'coin',
  initialState: {
    listLoading: false,
    errorMessage: '',
    entities: [
      //   { i: 1, s: 'BTC', p:'USDT', n: 'Bitcoin', of: 201.3245, q: 0.1234, cf: 100.34 },
      //   { i: 1027, s: 'ETH', p:'USDT', n: 'Etherum', of: 501.1234, q: 0.4321, cf: 700.43 },
      //   { i: 1839, s: 'BNB', p:'USDT', n: 'Binance Coin', of: 321.1234, q: 5.4, cf: 5657 },
    ],
    // originalFund:0,
    // quantityCoin:0,
    // symbolCoin:'',
    // pair:''
  },
  reducers: {
    addCoin: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (action.payload) {
        console.log(action.payload);
        let coin = { ...action.payload, of: 1, cf: 3 };
        state.entities.push(coin);
      }
    },
    removeCoin: (state, action) => {
      state.entities.splice(0, 1);
      console.log(action);
    },
  },
});

export const { addCoin, removeCoin } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// export const addCoinAsync = (symbol) => (dispatch) => {
//   setTimeout(() => {
//     let coin = { symbol };
//     dispatch(addCoin(coin));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const entities = (state) => state.coin.entities;

export default slice.reducer;
