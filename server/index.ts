import express from 'express';
import cors from 'cors';
import { calculateRisk } from './riskCalculation.js';
import type { InsuranceType } from './riskCalculation.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const VALID_TYPES: InsuranceType[] = ['Car', 'Home', 'Travel'];

app.post('/api/risk', (req, res) => {
  const { age, coverage, type } = req.body;

  if (typeof age !== 'number' || age < 0) {
    res.status(400).json({ error: 'age must be a non-negative number' });
    return;
  }
  if (typeof coverage !== 'number' || coverage < 0) {
    res.status(400).json({ error: 'coverage must be a non-negative number' });
    return;
  }
  if (!VALID_TYPES.includes(type)) {
    res.status(400).json({ error: `type must be one of: ${VALID_TYPES.join(', ')}` });
    return;
  }

  const result = calculateRisk({ age, coverage, type });
  res.json(result);
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;
