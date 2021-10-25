import { createSlice } from '@reduxjs/toolkit';
export const slice = createSlice({
  name: 'coin',
  initialState: {
    btnAddIsLoading: false,
    btnIsUpdating: false,
    isShowPrice: false,
    isShowPercent: true,
    isDCAMode:true,
    prevMarkets: {},
    errorMessage: '',
    entities: [
        // {
        //   i: 10903,
        //   n: 'Coin98',
        //   s: 'C98',
        //   r: 221,
        //   p: 'USDT',
        //   q: 509.1,
        //   of: 3324,
        //   cf: 2254.2948,
        //   price: '4.42800000',
        //   index: 1630946672529,
        // },
        // {
        //   i: 1765,
        //   n: 'EOS',
        //   s: 'EOS',
        //   r: 30,
        //   p: 'USDT',
        //   q: 372.2,
        //   of: 2227,
        //   cf: 2306.1512,
        //   price: '6.19600000',
        //   index: 1630945497869,
        // },
        // {
        //   i: 1765,
        //   n: 'EOS',
        //   s: 'EOS',
        //   r: 30,
        //   p: 'USDT',
        //   q: 36.4,
        //   of: 227,
        //   cf: 225.53439999999998,
        //   price: '6.19600000',
        //   index: 1630945378619,
        // },
        // {
        //   i: 1765,
        //   n: 'EOS',
        //   s: 'EOS',
        //   r: 30,
        //   p: 'USDT',
        //   q: 335.8,
        //   of: 2000,
        //   cf: 2080.6168,
        //   price: '6.19600000',
        //   index: 1630945430509,
        // },
        // {
        //   i: 8757,
        //   n: 'SafeMoon',
        //   s: 'SAFEMOON',
        //   r: 212,
        //   p: 'USDT',
        //   q: 36526124.1412,
        //   of: 103.49,
        //   cf: 88.38269383838187,
        //   price: 0.0000024197118067254703,
        //   index: 1630895611543,
        // },
        // {
        //   i: 8757,
        //   n: 'SafeMoon',
        //   s: 'SAFEMOON',
        //   r: 212,
        //   p: 'USDT',
        //   q: 105281687.34084447,
        //   of: 294.49,
        //   cf: 254.75134189062084,
        //   price: 0.0000024197118067254703,
        //   index: 1630946552956,
        // },
        // {
        //   i: 52,
        //   n: 'XRP',
        //   s: 'XRP',
        //   r: 6,
        //   p: 'USDT',
        //   q: 195.354,
        //   of: 250,
        //   cf: 269.197812,
        //   price: '1.37800000',
        //   index: 1630946602071,
        // },
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
        let coin = { ...action.payload };
        state.entities.push(coin);
        state.btnAddIsLoading = false;
      }
    },

    getCoins: (state, _) => state.entities,

    updateCoins: (state, { payload }) => ({
      ...state,
      entities: payload,
    }),
    enableDCAMode: (state) => ({
      ...state,
      isDCAMode: true,
    }),
    disableDCAMode: (state) => ({
      ...state,
      isDCAMode: false,
    }),
    showPrice: (state) => ({
      ...state,
      isShowPrice: true,
    }),
    hidePrice: (state) => ({
      ...state,
      isShowPrice: false,
    }),
    showPercent: (state) => ({
      ...state,
      isShowPercent: true,
    }),
    hidePercent: (state) => ({
      ...state,
      isShowPercent: false,
    }),
    removeCoin: (state, action) => {
      let { index } = action.payload;
      let coinIndex = state.entities.findIndex(
        (entity) => entity.index === index
      );
      state.entities.splice(coinIndex, 1);
    },
    backupMarkets: (state) => ({
      ...state,
      prevMarkets: state.entities.reduce((markets, entity) => {
        let pair = entity.s + entity.p;
        markets[pair] = entity.price;
        return markets;
      }, {}),
    }),
  },
});

export const {
  addCoin,
  removeCoin,
  updateCoins,
  getCoins,
  enableDCAMode,
  disableDCAMode,
  hidePrice,
  showPrice,
  hidePercent,
  showPercent,
  backupMarkets,
} = slice.actions;

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
