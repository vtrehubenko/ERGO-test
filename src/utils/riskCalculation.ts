import type { InsuranceType, RiskResult } from '../types/wizard';
import { INSURANCE_TYPE_FACTORS } from '../types/wizard';

interface RiskInput {
  age: number;
  coverage: number;
  type: InsuranceType;
}

function calculateRiskLocally(input: RiskInput): RiskResult {
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

export async function fetchRiskScore(input: RiskInput): Promise<RiskResult> {
  try {
    const response = await fetch('/api/risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Risk API failed, using client-side fallback:', error);
    return calculateRiskLocally(input);
  }
}
