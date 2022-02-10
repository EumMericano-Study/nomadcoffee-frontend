import { makeVar } from "@apollo/client";

const initialState = {
  isMobile: true,
  isTablet: false,
  isPC: false,
};

export const screenTypeVar = makeVar<ScreenType>(initialState);

export const setScreenType = (payload: ScreenType) => screenTypeVar(payload);
