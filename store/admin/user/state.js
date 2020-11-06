export default () => ({
    total: 0,
    data: [],
    query: {
        page: 1,
        limit: 10,
        sort: [
            'updatedat,DESC',
            'profile.name,ASC',
        ]
    }
})