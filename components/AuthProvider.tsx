"use client";

import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/index";
import { useEffect } from "react";
import api from "@/lib/axios.client";
import { setUser, clearUser } from "@/store/authSlice";

function InitAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const userid = localStorage.getItem('userid')
        const res = await api.get(`/users/${userid}`);
        dispatch(setUser(res.data.data));
      } catch {
        dispatch(clearUser());
      }
    };

    fetchMe();
  }, [dispatch]);

  return null;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitAuth />
        {children}
      </PersistGate>
    </Provider>
  );
}
