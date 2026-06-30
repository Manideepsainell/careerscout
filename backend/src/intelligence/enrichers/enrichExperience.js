import {
  parseStructuredExperience,
} from "../parsers/experienceParser.js";

import parseDescriptionExperience from "../parsers/experienceDescriptionParser.js";

const buildExperienceMetadata = (
  job,
  parsed,
  source,
  confidence
) => ({
  ...job,
  experienceYearsMin: parsed.min,
  experienceYearsMax: parsed.max,
  experienceSource: source,
  experienceConfidence: confidence,
});

const enrichExperience = (job) => {

  // ============================
  // 1. Structured Experience
  // ============================

  let parsed = parseStructuredExperience(
    job.experience
  );

  if (parsed) {
    return buildExperienceMetadata(
      job,
      parsed,
      "STRUCTURED",
      1
    );
  }

  // ============================
  // 2. Description Experience
  // ============================

  parsed = parseDescriptionExperience(
    job.description
  );

  if (parsed) {
    return buildExperienceMetadata(
      job,
      parsed,
      "DESCRIPTION",
      0.8
    );
  }

  // ============================
  // 3. Nothing Found
  // ============================

  return job;
};

export default enrichExperience;