import { SQLDatabase } from "encore.dev/storage/sqldb";

// Reference the existing content database
export const authDB = SQLDatabase.named("content");
