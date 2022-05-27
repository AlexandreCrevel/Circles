import { emptySplitApi } from '../api/emptySplitApi';
const circleApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    /* Two types :
        - Query endpoints : for retrieving data.
        - Mutation endpoints : for CRUD
    */
    getCircle: builder.query({
      /**
       * Query for login user. Take the email and password on parameter, and send it to the server.
       * @param {*} param0
       * @returns
       */
      query: ({ circle_id, token }) => {
        return {
          url: `circle/${circle_id}`,
          method: 'GET',
          contentType: 'application/json',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
    }),
    createCircle: builder.mutation({
      query: ({ token, name, description, color, img_url, user_id }) => {
        return {
          url: `circle`,
          method: 'POST',
          contentType: 'application/json',
          body: new URLSearchParams({
            name,
            description,
            color,
            img_url,
            user_id,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    modifyCircle: builder.mutation({
      query: ({
        token,
        name,
        description,
        color,
        img_url,
        user_id,
        circle_id,
      }) => {
        return {
          url: `circle/${circle_id}`,
          method: 'PATCH',
          contentType: 'application/json',
          body: new URLSearchParams({
            name,
            description,
            color,
            img_url,
            user_id,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    joinCircle: builder.mutation({
      query: ({ token, user_id, unique_code }) => {
        return {
          url: `circle/new/${user_id}`,
          method: 'POST',
          contentType: 'application/json',
          body: new URLSearchParams({
            unique_code,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteCircle: builder.mutation({
      query: ({ token, user_id, circle_id }) => {
        return {
          url: `circle/${circle_id}`,
          method: 'DELETE',
          contentType: 'application/json',
          body: new URLSearchParams({
            user_id,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    inviteCircle: builder.mutation({
      query: ({ unique_code, email, token }) => {
        return {
          url: `circle/invite`,
          method: 'POST',
          contentType: 'application/json',
          body: new URLSearchParams({
            unique_code,
            email,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCircleQuery,
  useCreateCircleMutation,
  useJoinCircleMutation,
  useDeleteCircleMutation,
  useModifyCircleMutation,
  useInviteCircleMutation,
} = circleApi;
