import { emptySplitApi } from '../api/emptySplitApi';
const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    /* Two types :
        - Query endpoints : for retrieving data.
        - Mutation endpoints : for CRUD
    */
    getUserDashBoard: builder.query({
      /**
       * Query for login user. Take the email and password on parameter, and send it to the server.
       * @param {*} param0
       * @returns
       */
      query: ({ user_id, token }) => {
        return {
          url: `dashboard/${user_id}`,
          method: 'GET',
          contentType: 'application/json',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      tagTypes: ['circle'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserDashBoardQuery } = extendedApi;
