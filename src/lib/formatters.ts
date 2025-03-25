export function formatPrural(
  count: number,
  singular: string,
  plural: string,
  includeCount = true
) {
  const word = count === 1 ? singular : plural;

  return includeCount ? `${count} ${word}` : word;
}
