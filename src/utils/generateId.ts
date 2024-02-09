const NUMBER_SET = '0123456789';
const ALPHABET_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const RANDOMIZED_CHARACTER_LENGTH_FOR_ID = 8;

const RADIX_VALUE = 36;

function getUniqueIdFromTimestamp(): string {
  return new Date().getTime().toString(RADIX_VALUE);
}

export function getRandomString(length: number): string {
  const uniqueIdFromTimestamp = getUniqueIdFromTimestamp();

  const characters = ALPHABET_SET + NUMBER_SET;

  let result = '';

  const charactersLength = characters.length;
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return `${result}-${uniqueIdFromTimestamp}`;
}

export function generateId(): string {
  return getRandomString(RANDOMIZED_CHARACTER_LENGTH_FOR_ID);
}
