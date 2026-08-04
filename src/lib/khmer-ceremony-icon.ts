export interface CeremonyIcon {
  alt: string;
  isFallback: boolean;
  src: string;
}

const ICON_BASE_PATH = '/icons/khmer-wedding-icons';

const icon = (filename: string, alt: string): CeremonyIcon => ({ alt, isFallback: false, src: `${ICON_BASE_PATH}/${filename}.svg` });
const matches = (title: string, terms: string[]) => terms.some((term) => title.includes(term));

/** Maps invitation event names to the premium Khmer wedding icon pack. */
export const getKhmerCeremonyIcon = (eventTitle: string): CeremonyIcon => {
  const title = eventTitle.normalize('NFC').toLocaleLowerCase();

  if (matches(title, ['សែនក្រុងពាលី', 'ក្រុងពាលី', 'pali blessing', 'pali ceremony'])) return icon('pali-blessing-incense', 'Pali blessing ceremony');
  if (matches(title, ['សូត្រមន្ត', 'ចំរើនព្រះបរិត្ត', 'chanting', 'prayer ceremony'])) return icon('monk-chanting-lotus', 'Monk chanting ceremony');
  if (matches(title, ['ជាវខាន់ស្លា', 'ខាន់ស្លា', 'khan sla', 'betel leaf'])) return icon('khan-sla-betel-tray', 'Khan Sla ceremony');
  if (matches(title, ['ហែរជំនូន', 'ជំនូន', 'dowry procession', 'procession'])) return icon('dowry-procession-offering-tray', 'Dowry procession');
  if (matches(title, ['ជំនុំជើងការ', 'wedding ceremony', 'ring ceremony'])) return icon('wedding-ceremony-rings', 'Wedding ceremony');
  if (matches(title, ['ពិសារស្លាកំណត់', 'ស្លាកំណត់', 'fruit ceremony'])) return icon('fruit-ceremony-tray', 'Fruit ceremony');
  if (matches(title, ['កាត់សក់', 'បង្កក់សិរី', 'hair cutting', 'hair cut'])) return icon('hair-cutting-scissors', 'Hair cutting ceremony');
  if (matches(title, ['បង្វិលពពិល', 'ពពិល', 'candle blessing', 'candle ceremony'])) return icon('candle-blessing', 'Candle blessing ceremony');
  if (matches(title, ['សំពះផ្ទឹមសែនចងដៃ', 'ចងដៃ', 'wrist tying', 'blessing string'])) return icon('wrist-tying-blessing', 'Wrist-tying blessing');
  if (matches(title, ['អាហារថ្ងៃត្រង់', 'ទទួលទានថ្ងៃត្រង់', 'lunch reception', 'lunch'])) return icon('lunch-reception', 'Lunch reception');
  if (matches(title, ['អាហារពេលល្ងាច', 'ពិធីជប់លៀង', 'dinner reception', 'banquet', 'dinner'])) return icon('dinner-reception', 'Dinner reception');
  if (matches(title, ['ជួបជុំភ្ញៀវ', 'ទទួលភ្ញៀវ', 'guest gathering', 'guest reception', 'gathering'])) return icon('guest-gathering-sampeah', 'Guest gathering');
  if (matches(title, ['កូនកំលោះ', 'កូនក្រមុំ', 'wedding couple', 'bride and groom'])) return icon('khmer-wedding-couple', 'Wedding couple');
  if (matches(title, ['program day', 'កម្មវិធីថ្ងៃ', 'schedule day'])) return icon('program-day-calendar', 'Program day');

  return { alt: 'Ceremony time', isFallback: true, src: `${ICON_BASE_PATH}/ceremony-time-clock.svg` };
};
