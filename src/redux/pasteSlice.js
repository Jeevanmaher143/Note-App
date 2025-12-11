import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
};

export const pasteSlice = createSlice({
  name: 'Paste',
  initialState,
  reducers: {

    // ADD PASTE
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully!");
    },

    // UPDATE PASTE
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(p => p._id === updatedPaste._id);

      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully!");
      }
    },

    // DELETE SINGLE PASTE
    removeFromPastes: (state, action) => {
      const pasteId = action.payload; // passed from UI
      const index = state.pastes.findIndex(item => item._id === pasteId);

      if (index !== -1) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted!");
      }
    },

    // RESET ALL PASTES
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.setItem("pastes", JSON.stringify([]));
      toast.success("All Pastes Deleted!");
    }

  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes
} = pasteSlice.actions;

export default pasteSlice.reducer;
