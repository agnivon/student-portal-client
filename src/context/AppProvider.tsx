"use client";

import { Provider } from "react-redux";
import store, { persistor } from "../redux/store";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@/components/global/Loading";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TooltipProvider>
        <Toaster closeButton />
        <Provider store={store}>
          <PersistGate
            loading={<Loading className="h-screen w-screen" />}
            persistor={persistor}
          >
            {children}
          </PersistGate>
        </Provider>
      </TooltipProvider>
    </>
  );
}
