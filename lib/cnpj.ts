export function normalizeCnpj(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidCnpjFormat(value: string): boolean {
  return normalizeCnpj(value).length === 14;
}

export function maskCnpj(rawInput: string): string {
  const digits = normalizeCnpj(rawInput).slice(0, 14);

  let result = digits;
  if (digits.length > 2) result = `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length > 5) result = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length > 8) result = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  if (digits.length > 12) result = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;

  return result;
}
