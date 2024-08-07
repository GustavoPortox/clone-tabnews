import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseResult = await database.query("SHOW server_version;");

  const databaseValue = databaseResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );

  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;
  console.log(databaseMaxConnectionsValue);
  console.log(databaseValue);
  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
      },
    },
  });
}

export default status;
