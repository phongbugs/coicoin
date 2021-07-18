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
        { i: 825, s: 'USDT', p:'USDT', n: 'TetherUS', of: 1321.140334, q: 1321.140334, cf: 1321.140334 },
        { i: 1027, s: 'ETH', p:'USDT', n: 'Etherum', of: 863, q:0.303078, cf: 591 },
        { i: 1839, s: 'BNB', p:'USDT', n: 'Binance Coin', of: 1001, q:2.501058, cf: 762.58 },
        { i: 1, s: 'BTC', p:'USDT', n: 'Bitcoin', of:67000, q: 1, cf: 35000 },
        { i: 1027, s: 'XRP', p:'USDT', n: 'Ripple', of: 1340, q: 1009.06288, cf: 591.41 },
        { i: 1839, s: 'MATIC', p:'USDT', n: 'Polygon', of: 567, q: 413, cf: 339 },
        { i: 1, s: 'ADA', p:'USDT', n: 'Cardano', of: 100, q: 60.18, cf: 71.5 },
        { i: 1027, s: 'BTT', p:'USDT', n: 'Bittorrent', of: 288, q: 51464, cf: 147 },
        { i: 1839, s: 'TLM', p:'USDT', n: 'Alen Worlds', of: 310, q: 818.76057, cf: 147.73 },
        { i: 1839, s: 'WIN', p:'USDT', n: 'WINK', of: 116, q: 112945.941, cf: 35.93 },
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
