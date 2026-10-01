/**
 * Currency formatter strictly adheres to Ghana Cedis (GH₵).
 * IMPORTANT: Financial records must use clear numbers with two decimals (e.g. GH₵ 12,500.00),
 * NEVER '12.5k' for audit compliance.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace('GHS', 'GH₵');
}

/**
 * Standard date formatter
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Format Ghanaian phone numbers for readability
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone;
}
