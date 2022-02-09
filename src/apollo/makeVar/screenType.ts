import { makeVar } from "@apollo/client";

const initialState = {
    isMobile: true,
    isTablet: false,
    isPC: false,
};

const screenType = makeVar<ScreenType>(initialState);

export default screenType;
