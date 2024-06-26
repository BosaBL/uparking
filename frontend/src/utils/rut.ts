export function getVerifierDigit(rut: string): string {
  const rutt = rut.replace(/\./g, '').split('-')[0];
  const reversed = [...rutt].reverse();

  let sum = 0;
  let seq = 2;

  reversed.forEach((digit) => {
    sum += parseInt(digit, 10) * seq;
    seq = seq % 7 === 0 ? 2 : seq + 1;
  });

  const dv = 11 - (sum % 11);

  if (dv === 10) {
    return 'k';
  }
  if (dv === 11) {
    return '0';
  }

  return dv.toString();
}

export function checkRut(rut: string): boolean {
  const [rutt, dv] = rut.toLowerCase().replace(/\./g, '').split('-');
  return dv === getVerifierDigit(rutt);
}

export function capitalizeFirstLetter(string: string | undefined) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}

export function formatRut(rut: string) {
  const dottedRut = rut
    .split('')
    .reverse()
    .join('')
    .replace(/(.{3})/g, '$1.')
    .split('')
    .reverse()
    .join('');
  return [dottedRut, getVerifierDigit(rut)].join('-');
}
