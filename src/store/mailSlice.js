import { createSlice } from "@reduxjs/toolkit";

const initialval = { sendMail: false, mailList: [], count: 0, mailsSent: [], loading: false };

const mailSlice = createSlice({
  name: "mail",
  initialState: initialval,
  reducers: {
    setSentData: (state) => {
      state.sendMail = !state.sendMail;
      console.log("success");
    },
    updateMailList: (state, action) => {
      state.mailList = action.payload;
    },
    updateCount: (state, action) => {
      const mails = action.payload;
      const unreadMsgs = mails.filter((item) => item.read === false);
      state.count = unreadMsgs.length;
    },
    updateMailSentList: (state, action) => {
      state.mailsSent = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    onLogout: (state) => {
      state.mailList = []
      state.mailsSent = []
      state.count = 0
    }
  },
});
export const mailSliceAction = mailSlice.actions;
export default mailSlice.reducer;