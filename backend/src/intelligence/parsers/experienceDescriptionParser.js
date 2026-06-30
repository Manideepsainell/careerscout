import { cleanText } from "../utils/textUtils.js";

const findRange = (text) => {
  const match = text.match(
    /\b(\d+)\s*[-–]\s*(\d+)\s*years?\b/i
  );

  if (!match) {
    return null;
  }

  return {
    min: Number(match[1]),
    max: Number(match[2]),
  };
};

const findPlus = (text) => {
  const match = text.match(
    /\b(\d+)\s*\+\s*years?\b/i
  );

  if (!match) {
    return null;
  }

  return {
    min: Number(match[1]),
    max: null,
  };
};
const findMinimum = (text) => {
  const patterns = [
    /\bminimum\s+of\s+(\d+)\s*years?\b/i,
    /\ba\s+minimum\s+of\s+(\d+)\s*years?\b/i,
    /\bminimum\s+(\d+)\s*years?\b/i,
    /\bat\s+least\s+(\d+)\s*years?\b/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      return {
        min: Number(match[1]),
        max: null,
      };
    }
  }

  return null;
};
const parseDescriptionExperience = (description = "") => {
  const text = cleanText(description);


const plus = findPlus(text);



return (
  findRange(text) ||
  plus ||
  findMinimum(text)
);

 
};

export default parseDescriptionExperience;