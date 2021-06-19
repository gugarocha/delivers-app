export const captalize = (text: string) => {
  return text.replace(/^./, text[0].toUpperCase());
};