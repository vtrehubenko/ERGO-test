import { describe, it, expect } from 'vitest';
import { calculateRisk } from './riskCalculation';

describe('calculateRisk', () => {
  it('returns Low for young traveler with low coverage', () => {
    const result = calculateRisk({ age: 20, coverage: 1000, type: 'Travel' });
    expect(result.score).toBeCloseTo(3.1);
    expect(result.level).toBe('Low');
  });

  it('returns Medium for middle-aged home owner with moderate coverage', () => {
    const result = calculateRisk({ age: 40, coverage: 20000, type: 'Home' });
    expect(result.score).toBeCloseTo(8);
    expect(result.level).toBe('Medium');
  });

  it('returns High for older car owner with high coverage', () => {
    const result = calculateRisk({ age: 60, coverage: 50000, type: 'Car' });
    expect(result.score).toBeCloseTo(14);
    expect(result.level).toBe('High');
  });

  it('returns Low at exact boundary (score = 5)', () => {
    const result = calculateRisk({ age: 20, coverage: 10000, type: 'Home' });
    expect(result.score).toBeCloseTo(5);
    expect(result.level).toBe('Low');
  });

  it('returns Medium just above 5', () => {
    const result = calculateRisk({ age: 21, coverage: 10000, type: 'Home' });
    expect(result.score).toBeCloseTo(5.1);
    expect(result.level).toBe('Medium');
  });

  it('returns High just above 8', () => {
    const result = calculateRisk({ age: 50, coverage: 10000, type: 'Car' });
    expect(result.score).toBeCloseTo(9);
    expect(result.level).toBe('High');
  });

  it('handles minimum age (18)', () => {
    const result = calculateRisk({ age: 18, coverage: 1000, type: 'Travel' });
    expect(result.score).toBeCloseTo(2.9);
    expect(result.level).toBe('Low');
  });

  it('handles maximum age (100) with high coverage', () => {
    const result = calculateRisk({ age: 100, coverage: 100000, type: 'Car' });
    expect(result.score).toBeCloseTo(23);
    expect(result.level).toBe('High');
  });
});
