const db = require("./db");

function insertRow() {
  const [name, color, weight] = process.argv.slice(2);
  db.run(
    `INSERT INTO sharks (name, color, weight) VALUES (?, ?, ?)`,
    [name, color, weight],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}
 
// INSERT INTO customers (fullName, birthdateTimestamp, address) 
// VALUES ('Andrew Mitch', 643911868, '206 Grange Road, Gillingham') 
// RETURNING *;

function selectRows() {
    db.each(`SELECT * FROM sharks`, (error, row) => {
      if (error) {
        throw new Error(error.message);
      }
      console.log(row);
    });
}
 
function updateRow() {
    const [id, name] = process.argv.slice(2);
    db.run(
      `UPDATE sharks SET name = ? WHERE id = ?`,
      [name, id],
      function (error) {
        if (error) {
          console.error(error.message);
        }
        console.log(`Row ${id} has been updated`);
      }
    );
}

async function deleteRow() {
    const [id] = process.argv.slice(2);
    db.run(`DELETE FROM sharks WHERE id = ?`, [id], function (error) {
      if (error) {
        return console.error(error.message);
      }
      console.log(`Row with the ID ${id} has been deleted`);
    });
}