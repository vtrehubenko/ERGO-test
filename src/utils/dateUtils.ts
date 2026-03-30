export function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export function formatDateOfBirth(dateOfBirth: string, locale: 'en' | 'pl'): string {
  if (!dateOfBirth) return '';
  const [year, month, day] = dateOfBirth.split('-');
  if (locale === 'pl') {
    return `${day}.${month}.${year}`;
  }
  return `${month}/${day}/${year}`;
}
