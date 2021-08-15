import { createSlice } from '@reduxjs/toolkit';
export const slice = createSlice({
  name: 'coin',
  initialState: {
    btnAddIsLoading: false,
    btnIsUpdating: false,
    isDCAMode: true,
    errorMessage: '',
    entities: [
      //{ i: 1, s: 'BTC', p:'USDT', n: 'Bitcoin', of:900.5, q: 0.030075, cf: 893.32 },
      {
        i: 1839,
        s: 'BNB',
        p: 'USDT',
        n: 'Binance Coin',
        of: 1001,
        q: 2.15556398,
        cf: 762.58,
      },
      // {
      //   i: 1027,

      //   s: 'ETH',
      //   p: 'USDT',
      //   n: 'Etherum',
      //   of: 2000 - 936,
      //   q: 0.60145844 - 0.29071,
      //   cf: 591,
      // },
      {
        i: 52,
        s: 'XRP',
        p: 'USDT',
        n: 'Ripple',
        of: 2458 + 708,
        q: 2370.05327,
        cf: 528.71,
      },
      {
        i: 52,
        s: 'XRP',
        p: 'USDT',
        n: 'Ripple',
        of: 1458,
        q: 1009,
        cf: 528.71,
      },
      {
        i: 52,
        s: 'XRP',
        p: 'USDT',
        n: 'Ripple',
        of: 1000,
        q: 825.62,
        cf: 528.71,
      },
      {
        i: 52,
        s: 'XRP',
        p: 'USDT',
        n: 'Ripple',
        of: 708.855,
        q: 535.67,
        cf: 528.71,
      },
      {
        cf: 594.360723,
        i: 1765,
        n: 'EOS',
        of: 500,
        p: 'USDT',
        q: 93.98,
        r: 27,
        s: 'EOS',
      },

      {
        i: 2010,
        s: 'ADA',
        p: 'USDT',
        n: 'Cardano',
        of: 200,
        q: 91.00976,
        cf: 68.08,
      },
      {
        i: 3890,
        s: 'MATIC',
        p: 'USDT',
        n: 'Polygon',
        of: 200,
        q: 136.9,
        cf: 0,
      },
      {
        i: 512,
        n: 'Stellar',
        s: 'XLM',
        r: 20,
        p: 'USDT',
        q: 507.3,
        of: 200,
        cf: 0.39776,
      },
      {
        i: 825,
        s: 'USDT',
        p: 'USDT',
        n: 'TetherUS',
        of: 908,
        q: 708.754296,
        cf: 908,
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
        q: 97297673,
        cf: 236,
      },
      {
        i: 8916,
        s: 'ICP',
        p: 'USDT',
        n: 'Internet Computer',
        of: 210,
        q: 0.0001,
        cf: 30.55,
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
        console.log(action.payload);
        let coin = { ...action.payload };
        state.entities.push(coin);
        state.btnAddIsLoading = false;
        // return {
        //   ...state,
        //   btnAddIsLoading: false,
        // };
      }
    },

    getCoins: (state, _) => state.entities,

    updateCoins: (state, { payload }) => ({
      ...state,
      entities: payload,
    }),
    removeCoin: (state, action) => {
      let { symbol, pair } = action.payload;
      let coinIndex = state.entities.findIndex(
        (entity) => entity.s === symbol && entity.p === pair
      );
      state.entities.splice(coinIndex, 1);
      //console.log(action);
    },
  },
});

export const { addCoin, removeCoin, updateCoins, getCoins } = slice.actions;

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
