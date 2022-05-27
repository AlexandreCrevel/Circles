import { emptySplitApi } from '../../api/emptySplitApi';
const calendarApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: ({
        circle_id,
        token,
        title,
        start,
        end,
        description,
        allday,
        user_id,
        color,
      }) => {
        return {
          url: `circle/${circle_id}/event`,
          method: 'POST',
          contentType: 'application/json',
          body: new URLSearchParams({
            // titre event
            title,
            // début event
            start,
            // fin event
            end,
            // desc de l'event,
            description,
            // si dure journée complete ou non
            allday,
            // celui qui crée l'event
            user_id,
            // la couleur
            color,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateEvent: builder.mutation({
      query: ({
        circle_id,
        token,
        title,
        start,
        end,
        description,
        allday,
        user_id,
        color,
        event_id,
      }) => {
        return {
          url: `circle/event/${event_id}`,
          method: 'PATCH',
          contentType: 'application/json',
          body: new URLSearchParams({
            // titre event
            title,
            // début event
            start,
            // fin event
            end,
            // desc de l'event,
            description,
            // si dure journée complete ou non
            allday,
            // celui qui crée l'event
            user_id,
            // la couleur
            color,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteEvent: builder.mutation({
      query: ({ token, user_id, event_id }) => {
        return {
          url: `circle/event/${event_id}`,
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
  }),
  overrideExisting: false,
});

export const {
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = calendarApi;
