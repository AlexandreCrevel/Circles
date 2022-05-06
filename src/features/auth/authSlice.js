import { createSlice } from '@reduxjs/toolkit';
// Initialise the default state.

const initialState = {
  id: '',
  firstname: '',
  lastname: '',
  surname: '',
  email: '',
  password: '',
  birthdate: '',
};
// Crée automatiquement des actions avec le TODO_FUNCTION
// Tranche de state (le "slice)")
export const authSlice = createSlice({
  name: 'auth', // name of the slice
  initialState, // we give it the initialState
  reducers: {
    // functions used for changing the state
    /**
     * When an input change, add the value of this input to the state
     * @param {*} state
     * @param {*} action
     */
    handleChange: (state, action) => {
      /* state[nomDuChamp] --> En fonction ce sera email ou password(si on est sur l'input email, ce sera email) et on modifie la valeur basé sur le payload envoyé.
      Ici ce sera donc state[email] = action.payload.payload qui est égal à la valeur renseigné par l'utilisateur
      */
      state[action.payload.name] = action.payload.payload;
    },
  },
});

export const { handleChange } = authSlice.actions;

// we export the reducer of our slice
export default authSlice.reducer;
