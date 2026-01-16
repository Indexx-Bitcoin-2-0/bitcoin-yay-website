export const MINIMUM_BTCY_BALANCE_FOR_ALCHEMY = 50000;
export const SPECIAL_ALCHEMY_LIMIT_VALUE = 10000;

const SPECIAL_ALCHEMY_LIMIT_EMAILS = new Set(
  [
    "muhdbalaweenty712@gmail.com",
    "kuswantokus884@gmail.com",
    "sunkuomkarsai@gmail.com",
    "sunkuomkarsai5@gmail.com",
  
    "usmanwunti2020@gmail.com",
    
    "issaumer125@gmail.com",
  ].map((email) => email.toLowerCase())
);

export function getMinimumBTCYBalanceForAlchemy(email) {
  if (!email) {
    return MINIMUM_BTCY_BALANCE_FOR_ALCHEMY;
  }

  return SPECIAL_ALCHEMY_LIMIT_EMAILS.has(email.trim().toLowerCase())
    ? SPECIAL_ALCHEMY_LIMIT_VALUE
    : MINIMUM_BTCY_BALANCE_FOR_ALCHEMY;
}

export function getMinimumBalanceMessage(email) {
  const requiredBalance = getMinimumBTCYBalanceForAlchemy(email);
  return `You need at least ${requiredBalance.toLocaleString("en-US")} BTCY to start an Alchemy`;
}
