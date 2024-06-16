export function capitalize(sentence: string): string {
  const words = sentence.split(' ');

  const capitalWords = words.map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  return capitalWords.join(' ');
}
