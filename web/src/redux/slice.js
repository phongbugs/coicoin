import { createSlice } from '@reduxjs/toolkit';
export const slice = createSlice({
  name: 'coin',
  initialState: {
    btnAddIsLoading: false,
    btnIsUpdating: false,
    isShowPrice: false,
    isShowPercent: true,
    isDCAMode: true,
    prevMarkets: {},
    errorMessage: '',
    entities: [
      {
        i: 11947,
        n: 'HeroVerse',
        s: 'HER',
        r: 3781,
        p: 'USDT',
        q: 9228.4259,
        of: 1000,
        cf: 1349.229480042837,
        price: 0.1462036423831324,
        index: 1635679721305,
      },
      {
        i: 12252,
        n: 'Bombcrypto',
        s: 'BCOIN',
        r: 3195,
        p: 'USDT',
        q: 256.6408,
        of: 800,
        cf: 711.3996407462873,
        price: 2.7719662685990976,
        index: 1634295282281,
      },
      {
        i: 1839,
        n: 'Binance Coin',
        s: 'BNB',
        r: 3,
        p: 'USDT',
        q: 1.5854,
        of: 765,
        cf: 835.82288,
        price: '527.20000000',
        index: 1635647864292,
      },
      {
        i: 10903,
        n: 'Coin98',
        s: 'C98',
        r: 225,
        p: 'USDT',
        q: 196.8,
        of: 765,
        cf: 716.5488,
        price: '3.64100000',
        index: 1635647952750,
      },
      {
        i: 12116,
        n: 'Diamond Boyz Coin',
        s: 'DBZ',
        r: 3680,
        p: 'USDT',
        q: 7306.529,
        of: 430,
        cf: 340.35440020867605,
        price: 0.046582228060502606,
        index: 1635682408831,
      },
      {
        i: 13105,
        n: 'MetaWars',
        s: 'WARS',
        r: 2778,
        p: 'USDT',
        q: 372.7686,
        of: 100,
        cf: 242.80131272022618,
        price: 0.6513459361121784,
        index: 1635729084287,
      },
      {
        i: 12344,
        n: 'SafeAffinity',
        s: 'AFFINITY',
        r: 3867,
        p: 'USDT',
        q: 38625881,
        of: 50,
        cf: 53.76556553125964,
        price: 0.0000013919570023855155,
        index: 1633450042010,
      },
      {
        i: 12585,
        n: 'Demole',
        s: 'DMLG',
        r: 2888,
        p: 'USDT',
        q: 216.4735,
        of: 50,
        cf: 88.52799928306288,
        price: 0.4089553653590988,
        index: 1634782743653,
      },
      {
        i: 12574,
        n: 'World of Cryptia',
        s: 'CRYPT',
        r: 2982,
        p: 'USDT',
        q: 700.2675,
        of: 100,
        cf: 77.66430465369226,
        price: 0.1109066244737793,
        index: 1633920548430,
      },
      {
        i: 12739,
        n: 'Revolotto',
        s: 'RVL',
        r: 5022,
        p: 'USDT',
        q: 394,
        of: 100,
        cf: 148.49475743804166,
        price: 0.3768902473046743,
        index: 1635643256433,
      },
      {
        i: 12268,
        n: 'Inferno Pay',
        s: 'IFO',
        r: 3762,
        p: 'USDT',
        q: 26051.14,
        of: 80,
        cf: 88.99000224597714,
        price: 0.0034159734370924704,
        index: 1635126240905,
      },
      {
        i: 12281,
        n: 'Lofi Defi',
        s: 'LOFI',
        r: 3926,
        p: 'USDT',
        q: 7304042.7738,
        of: 180,
        cf: 123.42318142480009,
        price: 0.00001689792697648565,
        index: 1634886053207,
      },
      {
        i: 12362,
        n: 'AetherV2',
        s: 'ATH',
        r: 4080,
        p: 'USDT',
        q: 36147.2913,
        of: 100,
        cf: 67.29931806414427,
        price: 0.0018618080537654085,
        index: 1635648120547,
      },
      {
        i: 13073,
        n: 'Fantasy Fox',
        s: 'FF',
        slug: 'fantasy-fox',
        p: 'USDT',
        q: 1688813.1468,
        of: 50,
        cf: 33.542735982457316,
        price: 0.00001986172126029148,
        index: 1635056844021,
      },
      {
        i: 12021,
        n: 'Minisoccer',
        s: 'MINISOCCER',
        r: 4656,
        p: 'USDT',
        q: 1844013108997.18,
        of: 50,
        cf: 10.737209549566716,
        price: 5.822740357527e-12,
        index: 1634187860808,
      },
      {
        i: 12564,
        n: 'TetherBlack',
        s: 'TTB',
        r: 3166,
        p: 'USDT',
        q: 2708.0706,
        of: 20,
        cf: 5.207906345152285,
        price: 0,
        index: 1633849100711,
      },
      {
        i: 4687,
        n: 'Binance USD',
        s: 'BUSD',
        r: 17,
        p: 'USDT',
        q: 95,
        of: 95,
        cf: 94.943,
        price: '0.99940000',
        index: 1635729115576,
      },
      {
        i: 1839,
        n: 'Binance Coin',
        s: 'BNB',
        r: 3,
        p: 'USDT',
        q: 0.0132,
        of: 6,
        cf: 6.959040000000001,
        price: '527.20000000',
        index: 1635647749997,
      },
      {
        i: 1839,
        n: 'Binance Coin',
        s: 'BNB',
        r: 3,
        p: 'USDT',
        q: 0.0167,
        of: 8,
        cf: 8.80424,
        price: '527.20000000',
        index: 1635647800971,
      },
      {
        i: 1839,
        n: 'Binance Coin',
        s: 'BNB',
        r: 3,
        p: 'USDT',
        q: 0.0941,
        of: 50,
        cf: 49.60952,
        price: '527.20000000',
        index: 1635688949294,
      },
      {
        i: 825,
        n: 'Tether',
        s: 'USDT',
        r: 4,
        p: 'USDT',
        q: 0.1,
        of: 1719,
        cf: 0.1000551023403244,
        price: 1.000551023403244,
        index: 1635731634173,
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
