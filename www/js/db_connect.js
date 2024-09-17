const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./fish.db";

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
      } else {
        const db = new sqlite3.Database(filepath, (error) => {
          if (error) {
            return console.error(error.message);
          }
          createTable(db);
        });
        console.log("Connection with SQLite has been established");
        return db;
    }
}

function createTable(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS "staff" (
        "id" INTEGER NOT NULL,
        "userID" INTEGER NOT NULL,
        "sessionStartTimestamp" INTEGER NOT NULL,
        "errorMsg" TEXT,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("userID") REFERENCES "users"("id"),
        UNIQUE(userID, sessionStartTimestamp)
    );

      CREATE TABLE IF NOT EXISTS "book_titles" (
        "id" INTEGER NOT NULL,
        "userID" INTEGER NOT NULL,
        "sessionStartTimestamp" INTEGER NOT NULL,
        "errorMsg" TEXT,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("userID") REFERENCES "users"("id"),
        UNIQUE(userID, sessionStartTimestamp)
    );

    CREATE TABLE IF NOT EXISTS "seasson_info" (
        "id" INTEGER NOT NULL,
        "userID" INTEGER NOT NULL,
        "sessionStartTimestamp" INTEGER NOT NULL,
        "errorMsg" TEXT,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("userID") REFERENCES "users"("id"),
        UNIQUE(userID, sessionStartTimestamp)
    );

    CREATE TABLE IF NOT EXISTS "customer" (
      "id" INTEGER NOT NULL,
      "userID" INTEGER NOT NULL,
      "sessionStartTimestamp" INTEGER NOT NULL,
      "errorMsg" TEXT,
      PRIMARY KEY("id" AUTOINCREMENT),
      FOREIGN KEY("userID") REFERENCES "users"("id"),
      UNIQUE(userID, sessionStartTimestamp)
  );


      CREATE TABLE IF NOT EXISTS "official_sales" (
        "id" INTEGER NOT NULL,
        "userID" INTEGER NOT NULL,
        "sessionStartTimestamp" INTEGER NOT NULL,
        "errorMsg" TEXT,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("userID") REFERENCES "users"("id"),
        UNIQUE(userID, sessionStartTimestamp)
    );

    CREATE TABLE IF NOT EXISTS "customer_payment" (
        "id" INTEGER NOT NULL,
        "userID" INTEGER NOT NULL,
        "sessionStartTimestamp" INTEGER NOT NULL,
        "errorMsg" TEXT,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("userID") REFERENCES "users"("id")
    );


        CREATE TABLE IF NOT EXISTS "orders" (
          "id" INTEGER NOT NULL,
          "userID" INTEGER NOT NULL,
          "sessionStartTimestamp" INTEGER NOT NULL,
          "errorMsg" TEXT,
          PRIMARY KEY("id" AUTOINCREMENT),
          FOREIGN KEY("userID") REFERENCES "users"("id"),
          UNIQUE(userID, sessionStartTimestamp)
      );

      
        CREATE TABLE IF NOT EXISTS "company_returns" (
          "id" INTEGER NOT NULL,
          "userID" INTEGER NOT NULL,
          "sessionStartTimestamp" INTEGER NOT NULL,
          "errorMsg" TEXT,
          PRIMARY KEY("id" AUTOINCREMENT),
          FOREIGN KEY("userID") REFERENCES "users"("id"),
          UNIQUE(userID, sessionStartTimestamp)
      );

      
        CREATE TABLE IF NOT EXISTS "school_returns" (
          "id" INTEGER NOT NULL,
          "userID" INTEGER NOT NULL,
          "sessionStartTimestamp" INTEGER NOT NULL,
          "errorMsg" TEXT,
          PRIMARY KEY("id" AUTOINCREMENT),
          FOREIGN KEY("userID") REFERENCES "users"("id"),
          UNIQUE(userID, sessionStartTimestamp)
      );
      
        CREATE TABLE IF NOT EXISTS "requisition" (
          "id" INTEGER NOT NULL,
          "userID" INTEGER NOT NULL,
          "sessionStartTimestamp" INTEGER NOT NULL,
          "errorMsg" TEXT,
          PRIMARY KEY("id" AUTOINCREMENT),
          FOREIGN KEY("userID") REFERENCES "users"("id"),
          UNIQUE(userID, sessionStartTimestamp)
      );

      
        CREATE TABLE IF NOT EXISTS "invoice" (
          "id" INTEGER NOT NULL,
          "userID" INTEGER NOT NULL,
          "sessionStartTimestamp" INTEGER NOT NULL,
          "errorMsg" TEXT,
          PRIMARY KEY("id" AUTOINCREMENT),
          FOREIGN KEY("userID") REFERENCES "users"("id"),
          UNIQUE(userID, sessionStartTimestamp)
      );

      
        CREATE TABLE IF NOT EXISTS "official_price" (
          "id" INTEGER NOT NULL,
          "userID" INTEGER NOT NULL,
          "sessionStartTimestamp" INTEGER NOT NULL,
          "errorMsg" TEXT,
          PRIMARY KEY("id" AUTOINCREMENT),
          FOREIGN KEY("userID") REFERENCES "users"("id"),
          UNIQUE(userID, sessionStartTimestamp)
      );

      
        CREATE TABLE IF NOT EXISTS "custom_price" (
          "id" INTEGER NOT NULL,
          "userID" INTEGER NOT NULL,
          "sessionStartTimestamp" INTEGER NOT NULL,
          "errorMsg" TEXT,
          PRIMARY KEY("id" AUTOINCREMENT),
          FOREIGN KEY("userID") REFERENCES "users"("id"),
          UNIQUE(userID, sessionStartTimestamp)
      );

      
        CREATE TABLE IF NOT EXISTS "order" (
          "id" INTEGER NOT NULL,
          "userID" INTEGER NOT NULL,
          "sessionStartTimestamp" INTEGER NOT NULL,
          "errorMsg" TEXT,
          PRIMARY KEY("id" AUTOINCREMENT),
          FOREIGN KEY("userID") REFERENCES "users"("id"),
          UNIQUE(userID, sessionStartTimestamp)
      );
  `);
  }
 
module.exports = createDbConnection();