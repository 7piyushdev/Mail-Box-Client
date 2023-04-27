import { mailSliceAction } from "./mailSlice";
import axios from "axios";

export const sendMailHandler = (mailobj) => {
  return async (dispatch) => {
    let emailId = await mailobj.email.replace(/[&@.]/g, "");
    let userId = JSON.parse(
      localStorage.getItem("mailId").replace(/[&@.]/g, "")
    );

    const postMail = async () => {
      const response = await fetch(
        `https://mail-client-react-49408-default-rtdb.firebaseio.com/${emailId}.json`,
        {
          method: "POST",
          body: JSON.stringify(mailobj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const resp2 = await axios.post(
        `https://mail-client-react-49408-default-rtdb.firebaseio.com/sentMails/${userId}.json`,
        mailobj
      );
      if (resp2.status) {
        //do nothing
      }
      if (data.error) {
        throw new Error("failed");
      }
      return data;
    };
    try {
      dispatch(mailSliceAction.setLoading(true));
      await postMail();
      dispatch(mailSliceAction.setSentData());
      dispatch(getMailHandler());
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(mailSliceAction.setLoading(false));
    }
  };
};

export const getMailHandler = () => {
  return async (dispatch) => {
    let emailId = JSON.parse(
      localStorage.getItem("mailId").replace(/[&@.]/g, "")
    );

    const getMail = async () => {
      const response = await fetch(
        `https://mail-client-react-49408-default-rtdb.firebaseio.com/${emailId}.json`
      );
      const data = await response.json();

      if (data.error) {
        throw new Error("failed");
      }
      return data;
    };

    const getSentMail = async () => {
      const resp2 = await axios.get(
        `https://mail-client-react-49408-default-rtdb.firebaseio.com/sentMails/${emailId}.json`
      );
      if (resp2.status) {
        const data = resp2.data;
        return data;
      }
    };
    try {
      dispatch(mailSliceAction.setLoading(true));
      const data = await getMail();
      const mailList = [];
      for (const key in data) {
        const Obj = {
          id: key,
          ...data[key],
        };
        mailList.push(Obj);
      }

      const sentMail = await getSentMail();
      const sentMailList = [];
      for (const key in sentMail) {
        const Obj = {
          id: key,
          ...sentMail[key],
        };
        sentMailList.push(Obj);
      }

      dispatch(mailSliceAction.updateCount(mailList));
      dispatch(mailSliceAction.updateMailList(mailList));
      dispatch(mailSliceAction.updateMailSentList(sentMailList));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(mailSliceAction.setLoading(false));
    }
  };
};

export const getMailByIdHandler = (id) => {
  return async (dispatch) => {
    let emailId = JSON.parse(
      localStorage.getItem("mailId").replace(/[&@.]/g, "")
    );

    const getMail = async () => {
      const response = await fetch(
        `https://mail-client-react-49408-default-rtdb.firebaseio.com/${emailId}/${id}.json`
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("failed");
      }
      return data;
    };
    try {
      dispatch(mailSliceAction.setLoading(true));
      const data = await getMail();
      dispatch(updateItemById(data, id));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(mailSliceAction.setLoading(false));
    }
  };
};

export const updateItemById = (item, id) => {
  return async (dispatch) => {
    let emailId = JSON.parse(
      localStorage.getItem("mailId").replace(/[&@.]/g, "")
    );

    const UpdateEmailList = async () => {
      const response = await fetch(
        `https://mail-client-react-49408-default-rtdb.firebaseio.com/${emailId}/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            email: item.email,
            subject: item.subject,
            editor: item.editor,
            read: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {
      dispatch(mailSliceAction.setLoading(true));
      await UpdateEmailList();
      dispatch(getMailHandler());
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(mailSliceAction.setLoading(false));
    }
  };
};

export const deleteItemById = (id) => {
  return async (dispatch) => {
    let emailId = JSON.parse(
      localStorage.getItem("mailId").replace(/[&@.]/g, "")
    );

    const deleteEmail = async () => {
      const response = await axios.delete(
        `https://mail-client-react-49408-default-rtdb.firebaseio.com/${emailId}/${id}.json`
      );
      if (response.status) {
        return;
      }
    };
    try {
      dispatch(mailSliceAction.setLoading(true));
      await deleteEmail();
      dispatch(getMailHandler());
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(mailSliceAction.setLoading(false));
    }
  };
};

export const deleteSentItemById = (id) => {
  return async (dispatch) => {
    let emailId = JSON.parse(
      localStorage.getItem("mailId").replace(/[&@.]/g, "")
    );

    const deleteEmail = async () => {
      const response = await axios.delete(
        `https://mail-client-react-49408-default-rtdb.firebaseio.com/sentMails/${emailId}/${id}.json`
      );
      if (response.status) {
        return;
      }
    };
    try {
      dispatch(mailSliceAction.setLoading(true));
      await deleteEmail();
      dispatch(getMailHandler());
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(mailSliceAction.setLoading(false));
    }
  };
};
