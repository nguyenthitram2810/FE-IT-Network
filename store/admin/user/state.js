export default () => ({
  url: null,
  loading: false,
  loadingCreate: false,
  list: [],
  query: {
    page: 1, 
    limit: 10, 
    sort: [
      'updatedat,DESC'
    ], 
    or: undefined, 
    filter: undefined
  }, 
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
})