import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

const initialState = {
  username: '',
  status: 'idle',
  position: '',
  address: '',
  error: '',
}

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",

  async function () {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
  }
)


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createName(state, action) {
      state.username = action.payload;
    }
  },
  extraReducers: (builder) => builder
  .addCase(fetchAddress.pending, (state) =>{
    state.status = 'loading'
    state.error = ''
  })
  .addCase(fetchAddress.fulfilled, (state, action) => {
    state.status = 'fulfilled'
    state.position = action.payload.position;
    state.address = action.payload.address;
  })
  .addCase(fetchAddress.rejected, (state) => {
    state.status = 'error';
    state.error =  "There was a problem getting your address. Make sure to fill this field!";
  })
})
 
export default userSlice.reducer;
export const {createName } = userSlice.actions;

export const getUsername = state => state.user.username;