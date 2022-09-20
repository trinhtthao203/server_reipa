import LocalizedStrings from "react-localization";
import Constants from ".";
import en from "../commons/locales/en";
import vi from "../commons/locales/vn";

const Strings = new LocalizedStrings({
    // en,
    vi
});

Strings.setLanguage(Constants.DefaultLanguage);

export default Strings;
