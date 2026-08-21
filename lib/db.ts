import { indxflow } from './indxflow';
import { Profile } from './types';
import { PROFILES } from './data';

export interface AppSchema {
  profiles: Profile;
  swipes: { id: string; user_id: string; profile_id: string; action: 'like' | 'dislike' | 'later'; created_at: string };
  matches: { id: string; user_id: string; profile_id: string; matched_at: string };
  messages: { id: string; profile_id: string; sender: string; text: string; created_at: string };
}

class QueryBuilder<T = unknown> {
  private tableName: string;
  private selectedColumns: string[] = ['*'];
  private whereClauses: { column: string; op: string; value: unknown }[] = [];
  private limitCount?: number;
  private orderByColumn?: string;
  private orderDirection: 'ASC' | 'DESC' = 'ASC';

  constructor(table: string) {
    this.tableName = table;
  }

  select(...columns: string[]): this {
    this.selectedColumns = columns.length > 0 ? columns : ['*'];
    return this;
  }

  where(column: string, op: string, value: unknown): this {
    this.whereClauses.push({ column, op, value });
    return this;
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderByColumn = column;
    this.orderDirection = direction;
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  toSql(): { sql: string; params: unknown[] } {
    let sql = `SELECT ${this.selectedColumns.join(', ')} FROM ${this.tableName}`;
    const params: unknown[] = [];

    if (this.whereClauses.length > 0) {
      const conditions = this.whereClauses.map((clause, idx) => {
        params.push(clause.value);
        return `${clause.column} ${clause.op} $${idx + 1}`;
      });
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    if (this.orderByColumn) {
      sql += ` ORDER BY ${this.orderByColumn} ${this.orderDirection}`;
    }

    if (this.limitCount !== undefined) {
      sql += ` LIMIT ${this.limitCount}`;
    }

    return { sql, params };
  }

  async execute(): Promise<T[]> {
    const { sql, params } = this.toSql();
    const result = await indxflow.query<T>(sql, params);
    return result.rows;
  }

  async executeTakeFirst(): Promise<T | null> {
    this.limit(1);
    const rows = await this.execute();
    return rows[0] || null;
  }
}

class OrmClient {
  from<K extends keyof AppSchema>(table: K): QueryBuilder<AppSchema[K]> {
    return new QueryBuilder<AppSchema[K]>(table as string);
  }

  async raw<T = unknown>(sql: string, params: unknown[] = []) {
    return indxflow.query<T>(sql, params);
  }
}

export const db = new OrmClient();

export async function fetchAllProfilesFromDb(): Promise<Profile[]> {
  const result = await db.from('profiles').select().execute();
  return result.length > 0 ? (result as Profile[]) : PROFILES;
}

export async function fetchProfileByIdFromDb(id: string): Promise<Profile | null> {
  const result = await db.from('profiles').where('id', '=', id).executeTakeFirst();
  if (result) return result as Profile;
  return PROFILES.find((p) => p.id === id) || null;
}
