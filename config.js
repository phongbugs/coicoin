module.exports = {
  APIKEY: 'UMbi3qd7GRH128Be3dcl4pPhiProD5ajYOULcWnyxtOs3gcujNVcKzfaK2DMfAqo',
  APISECRET: 'DUA3aKL7cKno5AYvGHdWvICzQfsTJMzz0PqOWnAF64BmaBUKiEwJwias9STGWFhO',
  development: {
    localApiUrl: 'http://192.168.2.185:9999',
    TIMEOUT_SYNC_BNBMARKET: 10000,
    TIMEOUT_SYNC_EXTRAMARKET: 10000,
    TIMEOUT_START_INIT_SYMBOLS: 30000,
  },
  production: {
    localApiUrl: 'https://coicoin.cc',
    TIMEOUT_SYNC_BNBMARKET: 60000,
    TIMEOUT_SYNC_EXTRAMARKET: 300000,
    TIMEOUT_START_INIT_SYMBOLS: 60000,
  },
};
