import { InsuranceType, RiskResult, INSURANCE_TYPE_FACTORS } from '../types/wizard';

interface RiskInput {
  age: number;
  coverage: number;
  type: InsuranceType;
}

export function calculateRisk(input: RiskInput): RiskResult {
  const score =
    input.age / 10 +
    input.coverage / 10000 +
    INSURANCE_TYPE_FACTORS[input.type];

  let level: RiskResult['level'];
  if (score <= 5) {
    level = 'Low';
  } else if (score <= 8) {
    level = 'Medium';
  } else {
    level = 'High';
  }

  return { score: Math.round(score * 100) / 100, level };
}
