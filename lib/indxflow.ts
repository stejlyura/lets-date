import { IndxflowQueryLog, IndxflowStats } from './types';
import { PROFILES } from './data';

export interface IndxflowConfig {
  apiKey?: string;
  baseUrl?: string;
  isMock?: boolean;
}

export interface QueryResult<T = unknown> {
  rows: T[];
  rowCount: number;
  tokensRemaining: number;
  latencyMs: number;
  cached?: boolean;
}

// Global In-Memory Query & Token Store
let currentTokens = 99850;
let totalBurned = 150;
let queryCounter = 42;
const queryLogs: IndxflowQueryLog[] = [];

// Event listeners for UI live updates
type Listener = (stats: IndxflowStats, latestLog: IndxflowQueryLog) => void;
const listeners = new Set<Listener>();

export function subscribeToIndxflowStats(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(log: IndxflowQueryLog) {
  const stats: IndxflowStats = {
    tokensRemaining: currentTokens,
    latencyMs: log.latencyMs,
    queryCount: queryCounter,
    totalTokensBurned: totalBurned,
    activeTenant: 'tenant_lets_date_v1',
  };
  listeners.forEach((fn) => fn(stats, log));
}

export function getIndxflowLogs(): IndxflowQueryLog[] {
  return [...queryLogs];
}

export function getIndxflowCurrentStats(): IndxflowStats {
  return {
    tokensRemaining: currentTokens,
    latencyMs: 2.4,
    queryCount: queryCounter,
    totalTokensBurned: totalBurned,
    activeTenant: 'tenant_lets_date_v1',
  };
}

export class IndxflowClient {
  private apiKey: string;
  private baseUrl: string;
  private isMock: boolean;

  constructor(config: IndxflowConfig = {}) {
    this.apiKey = config.apiKey || process.env.INDXFLOW_API_KEY || 'sec_mock_indxflow_live_key';
    this.baseUrl = config.baseUrl || process.env.INDXFLOW_BASE_URL || 'https://api.indxflow.com';
    // User requested mock integration by default so it runs seamlessly without prod keys
    this.isMock = config.isMock ?? true;
  }

  async query<T = unknown>(sqlString: string, params: unknown[] = []): Promise<QueryResult<T>> {
    const startTime = performance.now();
    const tokenCost = Math.max(1, Math.floor(Math.random() * 3) + 1);

    queryCounter += 1;
    currentTokens = Math.max(0, currentTokens - tokenCost);
    totalBurned += tokenCost;

    let rows: unknown[] = [];

    // Local in-memory mock handler for queries
    const lower = sqlString.toLowerCase();
    if (lower.includes('from profiles') || lower.includes('from "profiles"')) {
      if (lower.includes('where id =') && params.length > 0) {
        const id = String(params[0]);
        rows = PROFILES.filter((p) => p.id === id);
      } else if (lower.includes('limit')) {
        const match = lower.match(/limit\s+(\d+)/);
        const limit = match ? parseInt(match[1], 10) : 36;
        rows = PROFILES.slice(0, limit);
      } else {
        rows = PROFILES;
      }
    } else if (lower.includes('from matches') || lower.includes('from swipes')) {
      rows = [{ success: true, count: 36 }];
    } else {
      rows = [{ result: 'ok', query: sqlString }];
    }

    const elapsed = Math.max(1.8, Math.round((performance.now() - startTime + Math.random() * 2) * 10) / 10);

    const log: IndxflowQueryLog = {
      id: `query_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      query: sqlString,
      params,
      latencyMs: elapsed,
      tokensUsed: tokenCost,
      tokensRemaining: currentTokens,
      timestamp: new Date().toISOString(),
      status: '200 OK',
    };

    queryLogs.unshift(log);
    if (queryLogs.length > 50) queryLogs.pop();

    notifyListeners(log);

    return {
      rows: rows as T[],
      rowCount: rows.length,
      tokensRemaining: currentTokens,
      latencyMs: elapsed,
      cached: false,
    };
  }

  async sql<T = unknown>(strings: TemplateStringsArray, ...values: unknown[]): Promise<QueryResult<T>> {
    let sqlString = '';
    const params: unknown[] = [];

    for (let i = 0; i < strings.length; i++) {
      sqlString += strings[i];
      if (i < values.length) {
        params.push(values[i]);
        sqlString += `$${params.length}`;
      }
    }

    return this.query<T>(sqlString, params);
  }
}

export const indxflow = new IndxflowClient();
