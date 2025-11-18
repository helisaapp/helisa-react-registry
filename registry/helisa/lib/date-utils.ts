import { addDays, isAfter, isBefore, isEqual, isValid, parseISO, startOfDay } from 'date-fns';

function parseDate(date: string | Date | number): Date | null {
  try {
    let parsedDate: Date;

    if (typeof date === 'string') {
      parsedDate = date.includes('T') || date.includes('-') ? parseISO(date) : new Date(date);
    } else if (typeof date === 'number') {
      parsedDate = new Date(date);
    } else {
      parsedDate = date;
    }

    return isValid(parsedDate) ? parsedDate : null;
  } catch {
    return null;
  }
}

/**
 * Evalúa el estado de expiración de una fecha en relación con un número de días a partir de hoy.
 *
 * @param expirationDate Fecha de expiración
 * @param daysFromNow Número de días desde la fecha actual para considerar como "por vencer"
 * @param referenceDate Fecha de referencia (por defecto es hoy)
 * @returns ExpirationStatus: 'EXPIRED' | 'EXPIRING_SOON' | 'VALID_FUTURE' | 'INVALID_DATE'
 */

export function isExpiringWithinDays(
  expirationDate: string | Date | number,
  daysFromNow: number = 15,
  referenceDate?: Date,
): boolean {
  if (!expirationDate) return false;

  if (!Number.isInteger(daysFromNow) || daysFromNow < 0) {
    throw new Error('daysFromNow must be a non-negative integer');
  }

  const expiration = parseDate(expirationDate);
  if (!expiration) return false;

  const reference = referenceDate ? parseDate(referenceDate) : new Date();
  if (!reference) return false;

  const normalizedReference = startOfDay(reference);
  const normalizedExpiration = startOfDay(expiration);
  const limitDate = startOfDay(addDays(reference, daysFromNow));

  return (
    (isEqual(normalizedExpiration, normalizedReference) || isAfter(normalizedExpiration, normalizedReference)) &&
    (isEqual(normalizedExpiration, limitDate) || isBefore(normalizedExpiration, limitDate))
  );
}

// Reusable function to safely format dates to YYYY-MM-DD without timezone issues
export const formatDateSafely = (date: Date): string => {
  if (!date) return '';

  try {
    // Extract just the date part (YYYY-MM-DD)
    const datePart = date.toString().split('T')[0];

    // Create a new date from just the date part and format it
    return datePart;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Calculates the elapsed time from a date to now in readable format.
 *
 * @param date Reference date (can be string, Date or number)
 * @param referenceDate Current reference date (defaults to now)
 * @returns Formatted string like "Hace X horas" or "Hace X días"
 */
export const getTimeAgo = (date: string | Date | number, referenceDate?: Date): string => {
  const parsedDate = parseDate(date);
  if (!parsedDate) return '';

  const now = referenceDate || new Date();
  const diffMs = now.getTime() - parsedDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 24) {
    return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  }
};
