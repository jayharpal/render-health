const extractId = (id: string, index: number = 0) => {
  const parts = id.split('-');
  const extractedId = parts[index];
  return extractedId;
};

const hasData = (data: any) => data && Array.isArray(data) && data.length > 0;

export const RANDOM_INT = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export { extractId, hasData };
