module.exports = {
  APIKEY: 'UMbi3qd7GRH128Be3dcl4pPhiProD5ajYOULcWnyxtOs3gcujNVcKzfaK2DMfAqo',
  APISECRET: 'DUA3aKL7cKno5AYvGHdWvICzQfsTJMzz0PqOWnAF64BmaBUKiEwJwias9STGWFhO',
  development: {
    localApiUrl: 'http://localhost:9999',
    TIMEOUT_SYNC_BNBMARKET: 20000,
    TIMEOUT_SYNC_EXTRAMARKET: 30000,
    TIMEOUT_START_INIT_SYMBOLS: 10000,
  },
  production: {
    localApiUrl: 'https://coicoin.cc',
    TIMEOUT_SYNC_BNBMARKET: 30000,
    TIMEOUT_SYNC_EXTRAMARKET: 60000,
    TIMEOUT_START_INIT_SYMBOLS: 10000,
  },
};
