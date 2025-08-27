import { SQLDatabase } from "encore.dev/storage/sqldb";

// Reference the existing content database
export const adminDB = SQLDatabase.named("content");
