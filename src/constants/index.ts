const DOMAIN = process.env.REACT_APP_BASE_URL;

const Constants = {
    Api: {
        BASE_URL: `${DOMAIN}/api`,
        TIMEOUT: 25 * 1000,
    },

    /**
     * Return code from Api
     */
    ApiCode: {
        // Code from server api
        SUCCESS: 200,
        BAD_REQUEST: 400,
        INTERNAL_SERVER_ERROR: 500,

        // Code from local app
        CONNECTION_TIMEOUT: "CONNECTION_TIMEOUT",
        INTERNAL_SERVER: "INTERNAL_SERVER",
        UNKNOWN_NETWORK: "UNKNOWN_NETWORK",
    },

    ApiPath: {
        LOGIN: "/auth/login",

        // User report
        USER_REPORT_CREATE: "userReport/create",
        USER_REPORT_UPDATE: "userReport/update",
        USER_REPORT_TOTAL_TIME: "/userReport/total",
        FILTER_USER_REPORT: "/userReport/filter",
        DELETE_USER_REPORT: "/userReport/delete",

        // Absence
        LIST_ABSENCE: "absence/list",
        CREATE_ABSENCE: "absence/create",
        UPDATE_ABSENCE: "absence/update",
        DELETE_ABSENCE: "absence/delete",
        FILTER_ABSENCE: "absence/filter",

        // Acccount
        GET_USER_SETTING: "userSetting/get",
        LIST_TEAM: "team/list",
        LIST_ORGANIZATION: "organization/list",
    },

    /**
     * Styles for app.
     *
     * Color refer
     * @see https://www.rapidtables.com/web/color/index.html
     * @see https://www.w3schools.com/w3css/w3css_colors.asp
     */
    Styles: {
        COLOR_CHETWODE_BLUE: "#878DE1",
        COLOR_AMBER: "#F7C005",
        COLOR_ATHENSGRAY: "#EEEEF0",
        COLOR_GHOST: "#737373",
        COLOR_BLACK: "#201E11",
        CORLOR_WHITE: "#F6FAFB",
        COLOR_ERROR: "#D75C4D",


        HORIZONTAL_SPACE_SIZE: 16,
        HORIZONTAL_SPACE_SIZE_LARGE: 32,
        HORIZONTAL_SPACE_SIZE_SMALL: 8,
        VERTICAL_SPACE_SIZE: 20,
        VERTICAL_SPACE_SIZE_SMALL: 13,
        VERTICAL_SPACE_SIZE_LARGE: 32,
        CONTENT_SPACE: 16,
        // =====================================================================
        // Height or padding
        // =====================================================================
        HEADER_HEIGHT: 92,
        NAVIGATION_BAR_HEIGHT: 48,

        LOGO_HEIGHT: 70,
        TEXT_INPUT_HEIGHT: 45,

        BORDER_COLOR: "#F2F2F2",

        FONT_SIZE_SMALL: 13,
        FONT_SIZE_DEFAULT: 14,
        FONT_SIZE_MEDIUM: 17,
        FONT_SIZE_LARGE: 20,
        FONT_SIZE_XLARGE: 27,
        FONT_SIZE_XXLARGE: 31,

        // =====================================================================
        // icon
        // =====================================================================
        ICON_STYLE_FONT_AWESOME: "font-awesome",
        ICON_STYLE_FONT_IONICON: "ionicon",

        ICON_SIZE_SMALL: 16,
        ICON_SIZE_MEDIUM: 26,
        ICON_SIZE_LARGE: 36,

        INPUT_SIZE: "50vh",

        // =====================================================================
        // Console log style
        // Color refer at: https://www.w3schools.com/w3css/w3css_colors.asp
        // =====================================================================
        CONSOLE_LOG_DONE_ERROR: "border: 2px solid #F44336; color: #000000", // Red
        CONSOLE_LOG_DONE_SUCCESS: "border: 2px solid #4CAF50; color: #000000", // Green
        CONSOLE_LOG_ERROR: "background: #F44336; color: #FFFFFF", // Red
        CONSOLE_LOG_NOTICE: "background: #FF9800; color: #000000; font-size: x-large", // Orange
        CONSOLE_LOG_PREPARE: "border: 2px solid #2196F3; color: #000000", // Blue
        CONSOLE_LOG_START: "background: #2196F3; color: #FFFFFF", // Blue
        CONSOLE_LOG_SUCCESS: "background: #4CAF50; color: #FFFFFF", // Green
    },
    /**
     * Regex Expression
     */
    RegExp: {
        /** https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */
        EMAIL_ADDRESS: new RegExp(`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@`
            + `((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`),
        NEW_EMAIL_ADDRESS: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        /** https://gist.github.com/HarishChaudhari/0dd5514ce430991a1b1b8fa04e8b72a4 */
        PASSWORD: new RegExp(`/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/`),
        PHONE_NUMBER: new RegExp(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/),
    },

    /**
     * Storage keys
     */
    StorageKeys: {
        ACCESS_TOKEN: "ACCESS_TOKEN",
        USER_INFO: "USER_INFO",
    },

    DefaultLanguage: "vi",

    COCCOC_BRAND_NAME: "CocCoc",
};

export default Constants;
