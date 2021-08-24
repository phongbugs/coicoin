import { createSlice } from '@reduxjs/toolkit';
export const slice = createSlice({
  name: 'coin',
  initialState: {
    btnAddIsLoading: false,
    btnIsUpdating: false,
    isShowPrice: false,
    isShowPercent: true,
    prevMarkets: {},
    errorMessage: '',
    entities: [
      {
        i: 10903,
        n: 'Coin98',
        s: 'C98',
        r: 221,
        p: 'USDT',
        q: 761.032,
        of: 500 + 500 + 300 + 2500,
        cf: 0.6362361,
        price: 0.0104301,
      },
      {
        i: 10903,
        n: 'Coin98',
        s: 'C98',
        r: 221,
        p: 'USDT',
        q: 131,
        of: 500,
        cf: 0.6362361,
        price: 0.0104301,
      },
      {
        i: 10903,
        n: 'Coin98',
        s: 'C98',
        r: 221,
        p: 'USDT',
        q: 101,
        of: 500,
        cf: 0.6362361,
        price: 0.0104301,
      },
      {
        i: 10903,
        n: 'Coin98',
        s: 'C98',
        r: 221,
        p: 'USDT',
        q: 529,
        of: 2500+300,
        cf: 0.6362361,
        price: 0.0104301,
      },
      {
        i: 1027,
        s: 'ETH',
        p: 'USDT',
        n: 'Etherum',
        of: 1000,
        q: 0.310669,
        cf: 591,
      },
      {
        i: 9119,
        s: 'TLM',
        p: 'USDT',
        n: 'Alen Worlds',
        of: 310,
        q: 818.76057,
        cf: 111.38,
      },
      {
        i: 3718,
        s: 'BTT',
        p: 'USDT',
        n: 'Bittorrent',
        of: 288,
        q: 51412.536,
        cf: 99.01,
      },
      {
        i: 4206,
        s: 'WIN',
        p: 'USDT',
        n: 'WINK',
        of: 116.15,
        q: 112945.941,
        cf: 30.55,
      },
      {
        i: 8757,
        s: 'SAFEMOON',
        p: 'USDT',
        n: 'SafeMoon',
        of: 267,
        q: 97850803.9617,
        cf: 236,
      },
      //{
      //   i: 8916,
      //   s: 'ICP',
      //   p: 'USDT',
      //   n: 'Internet Computer',
      //   of: 210,
      //   q: 0.0001,
      //   cf: 30.55,
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
