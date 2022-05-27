import { setStorage } from '../../utils/helperLocalStorage';
import { handleChange, handleToken } from '../auth/authSlice';
import { emptySplitApi } from '../api/emptySplitApi';
const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    /* Two types :
        - Query endpoints : for retrieving data.
        - Mutation endpoints : for CRUD
    */
    loginUser: builder.mutation({
      /**
       * Query for login user. Take the email and password on parameter, and send it to the server.
       * @param {*} param0
       * @returns
       */
      query: ({ email, password, circleCode }) => {
        return {
          url: 'login',
          method: 'POST',
          body: new URLSearchParams({
            email: email,
            password: password,
            unique_code: circleCode,
          }),
          header: 'Content-Type: application/x-www-form-urlencoded',
        };
      },
      /**
       * Se lance lorsque la query est terminée. Elle permet d'ajouter dans le storage le token, et l'user_id(a voir si on ne le coockies pas?)
       * @param {*} body
       * @param {*} param1
       */
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((result) => {
            const { token, user_id } = result.data;
            setStorage('token', token);
            setStorage('user_id', user_id);
            // Dispatch le handletoken du slice(permet d'utiliser facilement le token et l'user_id)
            dispatch(handleToken({ token, user_id }));
          })
          .catch(({ error }) => {});
      },
    }),
    registerUser: builder.mutation({
      /**
       * Query for login user. Take the email and password on parameter, and send it to the server.
       * @param {*} param0
       * @returns
       */
      query: ({
        firstname,
        lastname,
        birthdate,
        email,
        password,
        surname,
        circleCode,
      }) => {
        return {
          url: 'register',
          method: 'POST',
          body: new URLSearchParams({
            firstname,
            lastname,
            surname,
            email,
            password,
            birthdate,
            unique_code: circleCode,
          }),
          header: 'Content-Type: application/x-www-form-urlencoded',
        };
      },
      /**
       * Se lance lorsque la query est terminée. Elle permet d'ajouter dans le storage le token, et l'user_id(a voir si on ne le coockies pas?)
       * @param {*} body
       * @param {*} param1
       */
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((result) => {
            const { token, user_id } = result.data;
            //! A voir si JSON.stringify est ok
            setStorage('token', JSON.stringify(token));
            setStorage('user_id', JSON.stringify(user_id));
            // Dispatch le handletoken du slice(permet d'utiliser facilement le token et l'user_id)
            dispatch(handleToken({ token, user_id }));
          })
          .catch((error) => {
            handleChange({
              name: 'error',
              payload: error,
            });
          });
      },
    }),
    activateEmail: builder.query({
      /**
       * Query for login user. Take the email and password on parameter, and send it to the server.
       * @param {*} param0
       * @returns
       */
      query: ({ code_activate }) => {
        return {
          url: `activate/${code_activate}`,
          method: 'POST',
          header: 'Content-Type: application/x-www-form-urlencoded',
        };
      },
    }),
    resetPassword: builder.mutation({
      /**
       * Query for reset password
       * @param {*} param0
       * @returns
       */
       query: ({ email }) => {
        return {
          url: 'reset-password',
          method: 'POST',
          body: new URLSearchParams({
            email: email,
          }),
          header: 'Content-Type: application/x-www-form-urlencoded',
        };
      },
    }),
    changePassword: builder.mutation({
      /**
       * Query for reset password
       * @param {*} param0
       * @returns
       */
       query: ({ reset_code, newPassword }) => {
        return {
          url: `reset-password/${reset_code}`,
          method: 'POST',
          body: new URLSearchParams({
            reset_code: reset_code,
            newPassword: newPassword,
          }),
          header: 'Content-Type: application/x-www-form-urlencoded',
        };
      },
    }),
    inviteByEmail: builder.mutation({
      /**
       * Query for login user. Take the email and password on parameter, and send it to the server.
       * @param {*} param0
       * @returns
       */
      query: ({ code_activate }) => {
        return {
          url: `invite/${code_activate}`,
          method: 'POST',
          header: 'Content-Type: application/x-www-form-urlencoded',
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useActivateEmailQuery,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = extendedApi;
