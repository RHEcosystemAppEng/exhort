import { withTokenReport } from './reportWithToken.mock';
import { withoutTokenReport } from './reportWithoutToken.mock';
import { errorReport } from './reportWithError.mock';
import { forbiddenReport } from './reportWithForbidden.mock';
import { unauthorizedReport } from './reportWithUnauthorized.mock';
import { reportMixed } from './reportMixed.mock';
import { unauthenticatedReport } from './reportWithUnauthenticated.mock';

export const MOCK_REPORT = {
  mixed: reportMixed,
  withToken: withTokenReport,
  withoutToken: withoutTokenReport,
  error: errorReport,
  forbidden: forbiddenReport,
  unauthorizedReport: unauthorizedReport,
  unauthenticatedReport: unauthenticatedReport,
};
