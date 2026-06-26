// Khmer localisation helpers for invitation templates: Khmer numerals, month
// names, and date/time labels. Kept in one place so every template formats
// Khmer text the same way.

const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

const KH_MONTHS = [
  "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
  "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ",
];

/** Convert any Arabic digits in the input to Khmer digits. */
export function toKhmerDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

/** Khmer month name for a 0-based month index (0 = January). */
export function khmerMonth(monthIndex: number): string {
  return KH_MONTHS[monthIndex] ?? "";
}

/**
 * Full Khmer solar date, e.g. "ត្រូវនឹងថ្ងៃទី ១២ ខែធ្នូ ឆ្នាំ ២០២៧".
 * Returns "" for an invalid date.
 */
export function khmerSolarDate(date: Date): string {
  if (Number.isNaN(date.getTime())) return "";

  return `ត្រូវនឹងថ្ងៃទី ${toKhmerDigits(date.getDate())} ខែ${khmerMonth(
    date.getMonth(),
  )} ឆ្នាំ ${toKhmerDigits(date.getFullYear())}`;
}

/**
 * Khmer time label from an English time string like "9:00 AM", e.g.
 * "វេលាម៉ោង ៩:០០ ព្រឹក". Falls back to the input if it can't be parsed.
 */
export function khmerTimeLabel(timeStr: string): string {
  const clean = (timeStr ?? "").trim().toUpperCase();
  const match = clean.match(/(\d+):?(\d+)?\s*(AM|PM)?/);
  if (!match) return timeStr ?? "";

  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3] || "";

  const kh = toKhmerDigits(hours);
  const km = toKhmerDigits(minutes.toString().padStart(2, "0"));

  let periodKh = "ព្រឹក";
  if (period === "PM") {
    if (hours === 12) periodKh = "ថ្ងៃត្រង់";
    else if (hours >= 1 && hours < 5) periodKh = "រសៀល";
    else if (hours >= 5 && hours < 7) periodKh = "ល្ងាច";
    else periodKh = "យប់";
  } else if (period === "AM") {
    if (hours === 12) periodKh = "យប់";
    else if (hours >= 1 && hours < 5) periodKh = "ទៀបភ្លឺ";
  }

  if (hours === 12 && minutes === 0 && period === "PM") {
    return "វេលាម៉ោង ១២:០០ ថ្ងៃត្រង់";
  }

  return `វេលាម៉ោង ${kh}:${km} ${periodKh}`;
}
