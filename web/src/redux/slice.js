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
        { i: 1, s: 'BTC', p:'USDT', n: 'Bitcoin', of:900.5, q: 0.030075, cf: 893.32 },
        { i: 1839, s: 'BNB', p:'USDT', n: 'Binance Coin', of: 1001, q:2.501058, cf: 762.58 },
        { i: 1027, s: 'ETH', p:'USDT', n: 'Etherum', of: 863, q:0.303078, cf: 591 },
        { i: 52, s: 'XRP', p:'USDT', n: 'Ripple', of: 1340, q: 1009.06288, cf: 528.71 },
        { i: 3890, s: 'MATIC', p:'USDT', n: 'Polygon', of: 767, q: 698, cf: 476 },
        { i: 8757, s: 'SMN', p:'USDT', n: 'SafeMoon', of: 267, q: 97297673, cf: 236 },
        { i: 9119, s: 'TLM', p:'USDT', n: 'Alen Worlds', of: 310, q: 818.76057, cf: 111.38 },
        { i: 3718, s: 'BTT', p:'USDT', n: 'Bittorrent', of: 288, q: 51464, cf: 99.01 },
        { i: 2010, s: 'ADA', p:'USDT', n: 'Cardano', of: 100, q: 60.18, cf: 68.08},
        { i: 4206, s: 'WIN', p:'USDT', n: 'WINK', of: 116.15, q: 112945.941, cf: 30.55 },
        { i: 825, s: 'USDT', p:'USDT', n: 'TetherUS', of: 1, q: 1, cf: 2 },
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
