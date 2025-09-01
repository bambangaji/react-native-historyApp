import "expo-sqlite";

declare module "expo-sqlite" {
  export interface SQLiteTransaction {
    executeSqlAsync: (sql: string, params?: any[]) => Promise<{
      rows: any[];
      rowsAffected: number;
      insertId?: number;
    }>;
  }

  export interface SQLiteDatabase {
    withTransactionAsync<T>(
      asyncCallback: (tx: SQLiteTransaction) => Promise<T>
    ): Promise<T>;
  }
}
