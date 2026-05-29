/**
 * Standalone validators — used by Zod schemas and utility code alike.
 * Keep these pure (no side effects, no imports from app code).
 */

/** Return true if the string is a valid Injective wallet address. */
export function isValidInjectiveAddress(address: string): boolean {
  return /^inj1[a-z0-9]{38,}$/.test(address);
}

/** Return true if the string is a valid email address. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Return true if the password meets the minimum strength requirement. */
export function isStrongPassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

/** Return a human-readable reason if the address is invalid, or null if valid. */
export function walletAddressError(address: string): string | null {
  if (!address) return "Wallet address is required.";
  if (!address.startsWith("inj1")) return 'Injective addresses start with "inj1".';
  if (address.length < 42) return "Address is too short.";
  if (!/^inj1[a-z0-9]+$/.test(address)) return "Address contains invalid characters.";
  return null;
}

/** Return true if a URL uses HTTPS. */
export function isHttpsUrl(url: string): boolean {
  return /^https:\/\/.+/.test(url);
}
