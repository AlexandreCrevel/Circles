import { createSlice } from '@reduxjs/toolkit';
// Initialise the default state.
const initialState = {
  open: false,
  message: '',
  success: false,
};
// Crée automatiquement des actions avec le TODO_FUNCTION
// Tranche de state (le "slice)")
export const eventSlice = createSlice({
  name: 'event', // name of the slice
  initialState, // we give it the initialState
  reducers: {
    // functions used for changing the state
    /**
     * When an input change, add the value of this input to the state
     * @param {*} state
     * @param {*} action
     */
    snackbarHandle: (state, action) => {
      for (const key in action.payload.data) {
        state[key] = action.payload.data[key];
      }

      /* state[nomDuChamp] --> En fonction ce sera email ou password(si on est sur l'input email, ce sera email) et on modifie la valeur basé sur le payload envoyé.
      Ici ce sera donc state[email] = action.payload.payload qui est égal à la valeur renseigné par l'utilisateur
      
      */
      //   state.forEach((element) => {
      //     console.log(element);
      //   });
      //   state[action.payload.name] = action.payload.payload;
      //   action.name.forEach((element) => console.log(element));
    },
    snackBarClose: (state, action) => {
      state.open = action.payload.open;
    },
  },
});

export const { snackbarHandle, snackBarClose } = eventSlice.actions;

// we export the reducer of our slice
export default eventSlice.reducer;
