export const chunkify = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  let start = 0;
  while (start < arr.length) {
    const onePack = arr.slice(start, start + size);
    chunks.push(onePack);
    start += size;
  }
  return chunks;
};
