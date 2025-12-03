export const CONTACT_US_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/basic/emailToAdmin`;

export const AIRDROP_REGISTER_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/basic/registerbtcyairdrop`;

export const LOGIN_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/login`;

export const LOGIN_WITH_TOKEN_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/loginWithToken`;

export const REGISTER_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/registerwithapp`;

export const GOOGLE_LOGIN_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/login/google`;

export const GOOGLE_REGISTER_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/register/google`;

export const CREATE_SHORT_TOKEN_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/createShortToken`;

export const ALCHEMY_CREATE_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/alchemy/create`;

export const ALCHEMY_COMPLETE_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/alchemy/complete`;

export const ALCHEMY_CONFIG_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/alchemy/config`;

const ALCHEMY_V2_BASE_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v2/bitcoinyay/alchemy`;

export const ALCHEMY_SESSIONS_API_ROUTE = `${ALCHEMY_V2_BASE_ROUTE}/sessions`;
export const ALCHEMY_PROCESS_API_ROUTE = `${ALCHEMY_V2_BASE_ROUTE}/process`;
export const ALCHEMY_COMPLETE_V2_API_ROUTE = `${ALCHEMY_V2_BASE_ROUTE}/complete`;

export const ALCHEMY_GET_USER_SUBSCRIPTION = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mining/getUserSubscriptionPlan/BTCY`;

export const EMAIL_TO_ADMIN_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/basic/emailsubscribe`;

export const GET_USER_BTCY_BALANCE_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mining/getUserBalance/BTCY`;
export const GET_USER_MINING_BALANCE_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mining/getUserMiningBalance/BTCY`;
export const GET_MINING_STATUS_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mining/getMiningStatus/BTCY`;
export const GET_USER_WALLET_BALANCE_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/getBalance`;

export const SET_PASSWORD_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/setPassword`;

export const CHECK_EMAIL_FOR_REGISTRATION_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/checkemail`;

export const CHECK_USERNAME_FOR_REGISTRATION_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/checkusername`;

export const SEND_OTP_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/sendOtp`;

export const VERIFY_OTP_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/validateOtp`;

export const CREATE_SHORT_TOKEN_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/createShortToken`;

export const CAPTAIN_BEE_BY_EMAIL_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/captainbee/getCaptainBeeByEmail`;

// Forgot Password Routes

export const FORGOT_PASSWORD_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/sendForgotOtp`;

export const FORGOT_PASSWORD_VERIFY_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/validateForgotOtp`;

export const FORGOT_PASSWORD_RESET_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/resetPassword`;

// Quantum Mining Routes
export const QUANTUM_BUY_ORDER_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/order/createOrderForQuantum`;

export const QUANTUM_USER_ORDER_API_ROUTE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/getUserOrder`;

// External API Routes
export const COINGECKO_PRICE_API_ROUTE =
  "https://api.coingecko.com/api/v3/simple/price";
