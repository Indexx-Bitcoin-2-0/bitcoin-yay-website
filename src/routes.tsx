import { API_BASE_URL, EXTERNAL_URLS } from "@/lib/api-config";

export const CONTACT_US_ROUTE = `${API_BASE_URL}/api/v1/inex/basic/emailToAdmin`;

export const BTCY_LOYALTY_AIRDROP_REGISTER_API_ROUTE = `${API_BASE_URL}/api/v1/inex/basic/registerbtcyloyaltyairdrop`;

export const WALLSTREET_INEX_AIRDROP_REGISTER_API_ROUTE = `${API_BASE_URL}/api/v1/inex/basic/registerwallstreetinexairdrop`;

export const BTCY_SOCIAL_POST_AIRDROP_REGISTER_API_ROUTE = `${API_BASE_URL}/api/v1/inex/basic/registerbtcysocialpostairdrop`;

export const LOGIN_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/login`;

export const LOGIN_WITH_TOKEN_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/loginWithToken`;

export const REGISTER_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/registerwithapp`;

export const GOOGLE_LOGIN_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/login/google`;

export const GOOGLE_REGISTER_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/register/google`;

export const CREATE_SHORT_TOKEN_ROUTE = `${API_BASE_URL}/api/v1/inex/user/createShortToken`;

export const ALCHEMY_CREATE_API_ROUTE = `${API_BASE_URL}/api/v1/inex/alchemy/create`;

export const ALCHEMY_COMPLETE_API_ROUTE = `${API_BASE_URL}/api/v1/inex/alchemy/complete`;

export const ALCHEMY_CONFIG_API_ROUTE = `${API_BASE_URL}/api/v1/inex/alchemy/config`;

const ALCHEMY_V2_BASE_ROUTE = `${API_BASE_URL}/api/v2/bitcoinyay/alchemy`;

export const ALCHEMY_SESSIONS_API_ROUTE = `${ALCHEMY_V2_BASE_ROUTE}/sessions`;
export const ALCHEMY_PROCESS_API_ROUTE = `${ALCHEMY_V2_BASE_ROUTE}/process`;
export const ALCHEMY_COMPLETE_V2_API_ROUTE = `${ALCHEMY_V2_BASE_ROUTE}/complete`;

export const ALCHEMY_GET_USER_SUBSCRIPTION = `${API_BASE_URL}/api/v1/mining/getUserSubscriptionPlan/BTCY`;

export const EMAIL_TO_ADMIN_API_ROUTE = `${API_BASE_URL}/api/v1/inex/basic/emailsubscribe`;

export const GET_USER_BTCY_BALANCE_API_ROUTE = `${API_BASE_URL}/api/v1/mining/getUserBalance/BTCY`;
export const GET_USER_MINING_BALANCE_API_ROUTE = `${API_BASE_URL}/api/v1/mining/getUserMiningBalance/BTCY`;
export const GET_MINING_STATUS_API_ROUTE = `${API_BASE_URL}/api/v1/mining/getMiningStatus/BTCY`;
export const GET_USER_WALLET_BALANCE_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/getBalance`;

export const SET_PASSWORD_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/setPassword`;

export const CHECK_EMAIL_FOR_REGISTRATION_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/checkemail`;

export const CHECK_USERNAME_FOR_REGISTRATION_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/checkusername`;

export const SEND_OTP_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/sendOtp`;

export const VERIFY_OTP_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/validateOtp`;

export const CREATE_SHORT_TOKEN_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/createShortToken`;

export const CAPTAIN_BEE_BY_EMAIL_ROUTE = `${API_BASE_URL}/api/v1/inex/captainbee/getCaptainBeeByEmail`;

// Forgot Password Routes

export const FORGOT_PASSWORD_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/sendForgotOtp`;

export const FORGOT_PASSWORD_VERIFY_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/validateForgotOtp`;

export const FORGOT_PASSWORD_RESET_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/resetPassword`;

// Quantum Mining Routes
export const QUANTUM_BUY_ORDER_API_ROUTE = `${API_BASE_URL}/api/v1/inex/order/createOrderForQuantum`;
export const QUANTUM_CRYPTO_CHECK_PAYMENT_API_ROUTE = `${API_BASE_URL}/api/v1/inex/order/quantum/crypto/check-payment`;
export const QUANTUM_CRYPTO_CHECK_PAYMENT_BY_TX_API_ROUTE = `${API_BASE_URL}/api/v1/inex/order/quantum/crypto/check-payment-by-tx`;
export const QUANTUM_CANCEL_ORDER_API_ROUTE = `${API_BASE_URL}/api/v1/inex/order/quantum/cancel`;

export const QUANTUM_USER_ORDER_API_ROUTE = `${API_BASE_URL}/api/v1/inex/user/getUserOrder`;

// External API Routes
export const COINGECKO_PRICE_API_ROUTE =
  EXTERNAL_URLS.api.coinGeckoPrice;

export const SELL_BTCY_CREATE_ORDER_ROUTE = `${API_BASE_URL}/api/v1/inex/sell-btcy/createSellOrder`;
export const SELL_BTCY_CREATE_ROUTE = SELL_BTCY_CREATE_ORDER_ROUTE;
export const SELL_BTCY_ELIGIBILITY_ROUTE = `${API_BASE_URL}/api/v1/inex/sell-btcy/eligibility`;
export const BTCY_ORDER_HISTORY_ROUTE = `${API_BASE_URL}/api/v1/inex/order/btcy/orders`;

const P2P_BASE_ROUTE = `${API_BASE_URL}/api/v1/p2p`;
export const P2P_SELL_OFFERS_ROUTE = `${P2P_BASE_ROUTE}/sell`;
export const P2P_USER_OFFERS_ROUTE = `${P2P_BASE_ROUTE}/user/offers`;
export const P2P_USER_OFFER_ROUTE = (offerId: string) =>
  `${P2P_USER_OFFERS_ROUTE}/${encodeURIComponent(offerId)}`;
export const P2P_USER_OFFER_PAUSE_ROUTE = (offerId: string) =>
  `${P2P_USER_OFFER_ROUTE(offerId)}/pause`;
export const P2P_TRADES_ROUTE = `${P2P_BASE_ROUTE}/trades`;
export const P2P_TRADE_ROUTE = (tradeId: string) =>
  `${P2P_TRADES_ROUTE}/${encodeURIComponent(tradeId)}`;
export const P2P_TRADE_PAY_ROUTE = (tradeId: string) =>
  `${P2P_TRADE_ROUTE(tradeId)}/pay`;
export const P2P_TRADE_CONFIRM_ROUTE = (tradeId: string) =>
  `${P2P_TRADE_ROUTE(tradeId)}/confirm`;
export const P2P_TRADE_CANCEL_ROUTE = (tradeId: string) =>
  `${P2P_TRADE_ROUTE(tradeId)}/cancel`;
export const P2P_TRADE_PAYMENT_PROOF_ROUTE = (tradeId: string) =>
  `${P2P_TRADE_ROUTE(tradeId)}/payment-proof`;
export const P2P_DISPUTES_ROUTE = `${P2P_BASE_ROUTE}/disputes`;
