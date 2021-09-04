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
        q: 985.944,
        of: 5633,
        cf: 5763.16804152,
        price: '5.84533000',
        index: 1629905608624,
      },
      {
        i: 10903,
        n: 'Coin98',
        s: 'C98',
        r: 221,
        p: 'USDT',
        q: 842,
        of: 4800,
        cf: 4921.76786,
        price: '5.84533000',
        index: 1629902430943,
      },
      {
        i: 10903,
        n: 'Coin98',
        s: 'C98',
        r: 221,
        p: 'USDT',
        q: 96,
        of: 555.82568,
        cf: 561.1516799999999,
        price: '5.84533000',
        index: 1629905182885,
      },
      {
        i: 10903,
        n: 'Coin98',
        s: 'C98',
        r: 221,
        p: 'USDT',
        q: 48,
        of: 278.91528,
        cf: 280.57583999999997,
        price: '5.84533000',
        index: 1629905457790,
      },

      {
        i: 9119,
        s: 'TLM',
        p: 'USDT',
        n: 'Alen Worlds',
        of: 310,
        q: 818.76057,
        cf: 283.78241356200004,
        index: 1,
        price: '0.34660000',
      },
      {
        i: 3718,
        s: 'BTT',
        p: 'USDT',
        n: 'Bittorrent',
        of: 288,
        q: 51412.536,
        cf: 218.8014707088,
        index: 2,
        price: '0.00425580',
      },
      {
        i: 4206,
        s: 'WIN',
        p: 'USDT',
        n: 'WINK',
        of: 116.15,
        q: 112945.941,
        cf: 72.3079914282,
        index: 3,
        price: '0.00064020',
      },
      {
        i: 8757,
        s: 'SAFEMOON',
        p: 'USDT',
        n: 'SafeMoon',
        of: 267,
        q: 97850803.9617,
        cf: 224.5447708855147,
        index: 4,
        price: 0.000002294766744823111,
      },
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
