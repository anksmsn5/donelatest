"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@vercel";
exports.ids = ["vendor-chunks/@vercel"];
exports.modules = {

/***/ "(rsc)/./node_modules/@vercel/postgres/dist/chunk-VGUHM5WG.js":
/*!**************************************************************!*\
  !*** ./node_modules/@vercel/postgres/dist/chunk-VGUHM5WG.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   VercelClient: () => (/* binding */ VercelClient),\n/* harmony export */   VercelPool: () => (/* binding */ VercelPool),\n/* harmony export */   createClient: () => (/* binding */ createClient),\n/* harmony export */   createPool: () => (/* binding */ createPool),\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   postgresConnectionString: () => (/* binding */ postgresConnectionString),\n/* harmony export */   sql: () => (/* binding */ sql)\n/* harmony export */ });\n/* harmony import */ var _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/@neondatabase/serverless/index.mjs\");\n// src/create-pool.ts\n\n\n// src/error.ts\nvar VercelPostgresError = class extends Error {\n  constructor(code, message) {\n    super(`VercelPostgresError - '${code}': ${message}`);\n    this.code = code;\n    this.name = \"VercelPostgresError\";\n  }\n};\n\n// src/postgres-connection-string.ts\nfunction postgresConnectionString(type = \"pool\") {\n  let connectionString;\n  switch (type) {\n    case \"pool\": {\n      connectionString = process.env.POSTGRES_URL;\n      break;\n    }\n    case \"direct\": {\n      connectionString = process.env.POSTGRES_URL_NON_POOLING;\n      break;\n    }\n    default: {\n      const _exhaustiveCheck = type;\n      const str = _exhaustiveCheck;\n      throw new VercelPostgresError(\n        \"invalid_connection_type\",\n        `Unhandled type: ${str}`\n      );\n    }\n  }\n  if (connectionString === \"undefined\")\n    connectionString = void 0;\n  return connectionString;\n}\nfunction isPooledConnectionString(connectionString) {\n  return connectionString.includes(\"-pooler.\");\n}\nfunction isDirectConnectionString(connectionString) {\n  return !isPooledConnectionString(connectionString);\n}\nfunction isLocalhostConnectionString(connectionString) {\n  try {\n    const withHttpsProtocol = connectionString.startsWith(\"postgresql://\") ? connectionString.replace(\"postgresql://\", \"https://\") : connectionString;\n    return new URL(withHttpsProtocol).hostname === \"localhost\";\n  } catch (err) {\n    if (err instanceof TypeError) {\n      return false;\n    }\n    if (typeof err === \"object\" && err !== null && \"message\" in err && typeof err.message === \"string\" && err.message === \"Invalid URL\") {\n      return false;\n    }\n    throw err;\n  }\n}\n\n// src/sql-template.ts\nfunction sqlTemplate(strings, ...values) {\n  var _a, _b;\n  if (!isTemplateStringsArray(strings) || !Array.isArray(values)) {\n    throw new VercelPostgresError(\n      \"incorrect_tagged_template_call\",\n      \"It looks like you tried to call `sql` as a function. Make sure to use it as a tagged template.\\n\tExample: sql`SELECT * FROM users`, not sql('SELECT * FROM users')\"\n    );\n  }\n  let result = (_a = strings[0]) != null ? _a : \"\";\n  for (let i = 1; i < strings.length; i++) {\n    result += `$${i}${(_b = strings[i]) != null ? _b : \"\"}`;\n  }\n  return [result, values];\n}\nfunction isTemplateStringsArray(strings) {\n  return Array.isArray(strings) && \"raw\" in strings && Array.isArray(strings.raw);\n}\n\n// src/create-client.ts\n\nvar VercelClient = class extends _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.Client {\n  /**\n   * A template literal tag providing safe, easy to use SQL parameterization.\n   * Parameters are substituted using the underlying Postgres database, and so must follow\n   * the rules of Postgres parameterization.\n   * @example\n   * ```ts\n   * const pool = createClient();\n   * const userId = 123;\n   * await client.connect();\n   * const result = await pool.sql`SELECT * FROM users WHERE id = ${userId}`;\n   * // Equivalent to: await pool.query('SELECT * FROM users WHERE id = $1', [id]);\n   * await client.end();\n   * ```\n   * @returns A promise that resolves to the query result.\n   */\n  async sql(strings, ...values) {\n    const [query, params] = sqlTemplate(strings, ...values);\n    return this.query(query, params);\n  }\n};\nfunction createClient(config) {\n  var _a;\n  const connectionString = (_a = config == null ? void 0 : config.connectionString) != null ? _a : postgresConnectionString(\"direct\");\n  if (!connectionString)\n    throw new VercelPostgresError(\n      \"missing_connection_string\",\n      \"You did not supply a 'connectionString' and no 'POSTGRES_URL_NON_POOLING' env var was found.\"\n    );\n  if (!isLocalhostConnectionString(connectionString) && !isDirectConnectionString(connectionString))\n    throw new VercelPostgresError(\n      \"invalid_connection_string\",\n      \"This connection string is meant to be used with a pooled connection. Try `createPool()` instead.\"\n    );\n  return new VercelClient({\n    ...config,\n    connectionString\n  });\n}\n\n// src/create-pool.ts\nvar VercelPool = class extends _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.Pool {\n  constructor(config) {\n    var _a;\n    super(config);\n    this.Client = VercelClient;\n    this.connectionString = (_a = config.connectionString) != null ? _a : \"\";\n  }\n  /**\n   * A template literal tag providing safe, easy to use SQL parameterization.\n   * Parameters are substituted using the underlying Postgres database, and so must follow\n   * the rules of Postgres parameterization.\n   * @example\n   * ```ts\n   * const pool = createPool();\n   * const userId = 123;\n   * const result = await pool.sql`SELECT * FROM users WHERE id = ${userId}`;\n   * // Equivalent to: await pool.query('SELECT * FROM users WHERE id = $1', [id]);\n   * ```\n   * @returns A promise that resolves to the query result.\n   */\n  async sql(strings, ...values) {\n    const [query, params] = sqlTemplate(strings, ...values);\n    const sql2 = (0,_neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.neon)(this.connectionString, {\n      fullResults: true\n    });\n    return sql2(query, params);\n  }\n  connect(callback) {\n    return super.connect(\n      callback\n    );\n  }\n};\nfunction createPool(config) {\n  var _a;\n  const connectionString = (_a = config == null ? void 0 : config.connectionString) != null ? _a : postgresConnectionString(\"pool\");\n  if (!connectionString)\n    throw new VercelPostgresError(\n      \"missing_connection_string\",\n      \"You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found.\"\n    );\n  if (!isLocalhostConnectionString(connectionString) && !isPooledConnectionString(connectionString))\n    throw new VercelPostgresError(\n      \"invalid_connection_string\",\n      \"This connection string is meant to be used with a direct connection. Make sure to use a pooled connection string or try `createClient()` instead.\"\n    );\n  let maxUses = config == null ? void 0 : config.maxUses;\n  let max = config == null ? void 0 : config.max;\n  if (typeof EdgeRuntime !== \"undefined\") {\n    if (maxUses && maxUses !== 1) {\n      console.warn(\n        \"@vercel/postgres: Overriding `maxUses` to 1 because the EdgeRuntime does not support client reuse.\"\n      );\n    }\n    if (max && max !== 1e4) {\n      console.warn(\n        \"@vercel/postgres: Overriding `max` to 10,000 because the EdgeRuntime does not support client reuse.\"\n      );\n    }\n    maxUses = 1;\n    max = 1e4;\n  }\n  const pool2 = new VercelPool({\n    ...config,\n    connectionString,\n    maxUses,\n    max\n  });\n  return pool2;\n}\n\n// src/index.ts\nvar pool;\nvar sql = new Proxy(\n  // eslint-disable-next-line @typescript-eslint/no-empty-function -- [@vercel/style-guide@5 migration]\n  () => {\n  },\n  {\n    get(_, prop) {\n      if (!pool) {\n        pool = createPool();\n      }\n      const val = Reflect.get(pool, prop);\n      if (typeof val === \"function\") {\n        return val.bind(pool);\n      }\n      return val;\n    },\n    apply(_, __, argumentsList) {\n      if (!pool) {\n        pool = createPool();\n      }\n      return pool.sql(...argumentsList);\n    }\n  }\n);\nvar db = sql;\n\n\n//# sourceMappingURL=chunk-VGUHM5WG.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHZlcmNlbC9wb3N0Z3Jlcy9kaXN0L2NodW5rLVZHVUhNNVdHLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxLQUFLLEtBQUssUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLElBQUk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDLGtCQUFrQixFQUFFLEVBQUUsb0NBQW9DO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNrRDtBQUNsRCxpQ0FBaUMsNERBQU07QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLE9BQU87QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLCtCQUErQiwwREFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLE9BQU87QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhEQUFJO0FBQ3JCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVVFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtZHJpenpsZS8uL25vZGVfbW9kdWxlcy9AdmVyY2VsL3Bvc3RncmVzL2Rpc3QvY2h1bmstVkdVSE01V0cuanM/YzFjZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvY3JlYXRlLXBvb2wudHNcbmltcG9ydCB7IFBvb2wsIG5lb24gfSBmcm9tIFwiQG5lb25kYXRhYmFzZS9zZXJ2ZXJsZXNzXCI7XG5cbi8vIHNyYy9lcnJvci50c1xudmFyIFZlcmNlbFBvc3RncmVzRXJyb3IgPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY29kZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKGBWZXJjZWxQb3N0Z3Jlc0Vycm9yIC0gJyR7Y29kZX0nOiAke21lc3NhZ2V9YCk7XG4gICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB0aGlzLm5hbWUgPSBcIlZlcmNlbFBvc3RncmVzRXJyb3JcIjtcbiAgfVxufTtcblxuLy8gc3JjL3Bvc3RncmVzLWNvbm5lY3Rpb24tc3RyaW5nLnRzXG5mdW5jdGlvbiBwb3N0Z3Jlc0Nvbm5lY3Rpb25TdHJpbmcodHlwZSA9IFwicG9vbFwiKSB7XG4gIGxldCBjb25uZWN0aW9uU3RyaW5nO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicG9vbFwiOiB7XG4gICAgICBjb25uZWN0aW9uU3RyaW5nID0gcHJvY2Vzcy5lbnYuUE9TVEdSRVNfVVJMO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJkaXJlY3RcIjoge1xuICAgICAgY29ubmVjdGlvblN0cmluZyA9IHByb2Nlc3MuZW52LlBPU1RHUkVTX1VSTF9OT05fUE9PTElORztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb25zdCBfZXhoYXVzdGl2ZUNoZWNrID0gdHlwZTtcbiAgICAgIGNvbnN0IHN0ciA9IF9leGhhdXN0aXZlQ2hlY2s7XG4gICAgICB0aHJvdyBuZXcgVmVyY2VsUG9zdGdyZXNFcnJvcihcbiAgICAgICAgXCJpbnZhbGlkX2Nvbm5lY3Rpb25fdHlwZVwiLFxuICAgICAgICBgVW5oYW5kbGVkIHR5cGU6ICR7c3RyfWBcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlmIChjb25uZWN0aW9uU3RyaW5nID09PSBcInVuZGVmaW5lZFwiKVxuICAgIGNvbm5lY3Rpb25TdHJpbmcgPSB2b2lkIDA7XG4gIHJldHVybiBjb25uZWN0aW9uU3RyaW5nO1xufVxuZnVuY3Rpb24gaXNQb29sZWRDb25uZWN0aW9uU3RyaW5nKGNvbm5lY3Rpb25TdHJpbmcpIHtcbiAgcmV0dXJuIGNvbm5lY3Rpb25TdHJpbmcuaW5jbHVkZXMoXCItcG9vbGVyLlwiKTtcbn1cbmZ1bmN0aW9uIGlzRGlyZWN0Q29ubmVjdGlvblN0cmluZyhjb25uZWN0aW9uU3RyaW5nKSB7XG4gIHJldHVybiAhaXNQb29sZWRDb25uZWN0aW9uU3RyaW5nKGNvbm5lY3Rpb25TdHJpbmcpO1xufVxuZnVuY3Rpb24gaXNMb2NhbGhvc3RDb25uZWN0aW9uU3RyaW5nKGNvbm5lY3Rpb25TdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB3aXRoSHR0cHNQcm90b2NvbCA9IGNvbm5lY3Rpb25TdHJpbmcuc3RhcnRzV2l0aChcInBvc3RncmVzcWw6Ly9cIikgPyBjb25uZWN0aW9uU3RyaW5nLnJlcGxhY2UoXCJwb3N0Z3Jlc3FsOi8vXCIsIFwiaHR0cHM6Ly9cIikgOiBjb25uZWN0aW9uU3RyaW5nO1xuICAgIHJldHVybiBuZXcgVVJMKHdpdGhIdHRwc1Byb3RvY29sKS5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIjtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyciBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGVyciA9PT0gXCJvYmplY3RcIiAmJiBlcnIgIT09IG51bGwgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIHR5cGVvZiBlcnIubWVzc2FnZSA9PT0gXCJzdHJpbmdcIiAmJiBlcnIubWVzc2FnZSA9PT0gXCJJbnZhbGlkIFVSTFwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG4vLyBzcmMvc3FsLXRlbXBsYXRlLnRzXG5mdW5jdGlvbiBzcWxUZW1wbGF0ZShzdHJpbmdzLCAuLi52YWx1ZXMpIHtcbiAgdmFyIF9hLCBfYjtcbiAgaWYgKCFpc1RlbXBsYXRlU3RyaW5nc0FycmF5KHN0cmluZ3MpIHx8ICFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICB0aHJvdyBuZXcgVmVyY2VsUG9zdGdyZXNFcnJvcihcbiAgICAgIFwiaW5jb3JyZWN0X3RhZ2dlZF90ZW1wbGF0ZV9jYWxsXCIsXG4gICAgICBcIkl0IGxvb2tzIGxpa2UgeW91IHRyaWVkIHRvIGNhbGwgYHNxbGAgYXMgYSBmdW5jdGlvbi4gTWFrZSBzdXJlIHRvIHVzZSBpdCBhcyBhIHRhZ2dlZCB0ZW1wbGF0ZS5cXG5cdEV4YW1wbGU6IHNxbGBTRUxFQ1QgKiBGUk9NIHVzZXJzYCwgbm90IHNxbCgnU0VMRUNUICogRlJPTSB1c2VycycpXCJcbiAgICApO1xuICB9XG4gIGxldCByZXN1bHQgPSAoX2EgPSBzdHJpbmdzWzBdKSAhPSBudWxsID8gX2EgOiBcIlwiO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHQgKz0gYCQke2l9JHsoX2IgPSBzdHJpbmdzW2ldKSAhPSBudWxsID8gX2IgOiBcIlwifWA7XG4gIH1cbiAgcmV0dXJuIFtyZXN1bHQsIHZhbHVlc107XG59XG5mdW5jdGlvbiBpc1RlbXBsYXRlU3RyaW5nc0FycmF5KHN0cmluZ3MpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc3RyaW5ncykgJiYgXCJyYXdcIiBpbiBzdHJpbmdzICYmIEFycmF5LmlzQXJyYXkoc3RyaW5ncy5yYXcpO1xufVxuXG4vLyBzcmMvY3JlYXRlLWNsaWVudC50c1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIkBuZW9uZGF0YWJhc2Uvc2VydmVybGVzc1wiO1xudmFyIFZlcmNlbENsaWVudCA9IGNsYXNzIGV4dGVuZHMgQ2xpZW50IHtcbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgbGl0ZXJhbCB0YWcgcHJvdmlkaW5nIHNhZmUsIGVhc3kgdG8gdXNlIFNRTCBwYXJhbWV0ZXJpemF0aW9uLlxuICAgKiBQYXJhbWV0ZXJzIGFyZSBzdWJzdGl0dXRlZCB1c2luZyB0aGUgdW5kZXJseWluZyBQb3N0Z3JlcyBkYXRhYmFzZSwgYW5kIHNvIG11c3QgZm9sbG93XG4gICAqIHRoZSBydWxlcyBvZiBQb3N0Z3JlcyBwYXJhbWV0ZXJpemF0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0c1xuICAgKiBjb25zdCBwb29sID0gY3JlYXRlQ2xpZW50KCk7XG4gICAqIGNvbnN0IHVzZXJJZCA9IDEyMztcbiAgICogYXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcbiAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgcG9vbC5zcWxgU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBpZCA9ICR7dXNlcklkfWA7XG4gICAqIC8vIEVxdWl2YWxlbnQgdG86IGF3YWl0IHBvb2wucXVlcnkoJ1NFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgaWQgPSAkMScsIFtpZF0pO1xuICAgKiBhd2FpdCBjbGllbnQuZW5kKCk7XG4gICAqIGBgYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgcXVlcnkgcmVzdWx0LlxuICAgKi9cbiAgYXN5bmMgc3FsKHN0cmluZ3MsIC4uLnZhbHVlcykge1xuICAgIGNvbnN0IFtxdWVyeSwgcGFyYW1zXSA9IHNxbFRlbXBsYXRlKHN0cmluZ3MsIC4uLnZhbHVlcyk7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkocXVlcnksIHBhcmFtcyk7XG4gIH1cbn07XG5mdW5jdGlvbiBjcmVhdGVDbGllbnQoY29uZmlnKSB7XG4gIHZhciBfYTtcbiAgY29uc3QgY29ubmVjdGlvblN0cmluZyA9IChfYSA9IGNvbmZpZyA9PSBudWxsID8gdm9pZCAwIDogY29uZmlnLmNvbm5lY3Rpb25TdHJpbmcpICE9IG51bGwgPyBfYSA6IHBvc3RncmVzQ29ubmVjdGlvblN0cmluZyhcImRpcmVjdFwiKTtcbiAgaWYgKCFjb25uZWN0aW9uU3RyaW5nKVxuICAgIHRocm93IG5ldyBWZXJjZWxQb3N0Z3Jlc0Vycm9yKFxuICAgICAgXCJtaXNzaW5nX2Nvbm5lY3Rpb25fc3RyaW5nXCIsXG4gICAgICBcIllvdSBkaWQgbm90IHN1cHBseSBhICdjb25uZWN0aW9uU3RyaW5nJyBhbmQgbm8gJ1BPU1RHUkVTX1VSTF9OT05fUE9PTElORycgZW52IHZhciB3YXMgZm91bmQuXCJcbiAgICApO1xuICBpZiAoIWlzTG9jYWxob3N0Q29ubmVjdGlvblN0cmluZyhjb25uZWN0aW9uU3RyaW5nKSAmJiAhaXNEaXJlY3RDb25uZWN0aW9uU3RyaW5nKGNvbm5lY3Rpb25TdHJpbmcpKVxuICAgIHRocm93IG5ldyBWZXJjZWxQb3N0Z3Jlc0Vycm9yKFxuICAgICAgXCJpbnZhbGlkX2Nvbm5lY3Rpb25fc3RyaW5nXCIsXG4gICAgICBcIlRoaXMgY29ubmVjdGlvbiBzdHJpbmcgaXMgbWVhbnQgdG8gYmUgdXNlZCB3aXRoIGEgcG9vbGVkIGNvbm5lY3Rpb24uIFRyeSBgY3JlYXRlUG9vbCgpYCBpbnN0ZWFkLlwiXG4gICAgKTtcbiAgcmV0dXJuIG5ldyBWZXJjZWxDbGllbnQoe1xuICAgIC4uLmNvbmZpZyxcbiAgICBjb25uZWN0aW9uU3RyaW5nXG4gIH0pO1xufVxuXG4vLyBzcmMvY3JlYXRlLXBvb2wudHNcbnZhciBWZXJjZWxQb29sID0gY2xhc3MgZXh0ZW5kcyBQb29sIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgdmFyIF9hO1xuICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgdGhpcy5DbGllbnQgPSBWZXJjZWxDbGllbnQ7XG4gICAgdGhpcy5jb25uZWN0aW9uU3RyaW5nID0gKF9hID0gY29uZmlnLmNvbm5lY3Rpb25TdHJpbmcpICE9IG51bGwgPyBfYSA6IFwiXCI7XG4gIH1cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgbGl0ZXJhbCB0YWcgcHJvdmlkaW5nIHNhZmUsIGVhc3kgdG8gdXNlIFNRTCBwYXJhbWV0ZXJpemF0aW9uLlxuICAgKiBQYXJhbWV0ZXJzIGFyZSBzdWJzdGl0dXRlZCB1c2luZyB0aGUgdW5kZXJseWluZyBQb3N0Z3JlcyBkYXRhYmFzZSwgYW5kIHNvIG11c3QgZm9sbG93XG4gICAqIHRoZSBydWxlcyBvZiBQb3N0Z3JlcyBwYXJhbWV0ZXJpemF0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0c1xuICAgKiBjb25zdCBwb29sID0gY3JlYXRlUG9vbCgpO1xuICAgKiBjb25zdCB1c2VySWQgPSAxMjM7XG4gICAqIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBvb2wuc3FsYFNFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgaWQgPSAke3VzZXJJZH1gO1xuICAgKiAvLyBFcXVpdmFsZW50IHRvOiBhd2FpdCBwb29sLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGlkID0gJDEnLCBbaWRdKTtcbiAgICogYGBgXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBxdWVyeSByZXN1bHQuXG4gICAqL1xuICBhc3luYyBzcWwoc3RyaW5ncywgLi4udmFsdWVzKSB7XG4gICAgY29uc3QgW3F1ZXJ5LCBwYXJhbXNdID0gc3FsVGVtcGxhdGUoc3RyaW5ncywgLi4udmFsdWVzKTtcbiAgICBjb25zdCBzcWwyID0gbmVvbih0aGlzLmNvbm5lY3Rpb25TdHJpbmcsIHtcbiAgICAgIGZ1bGxSZXN1bHRzOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIHNxbDIocXVlcnksIHBhcmFtcyk7XG4gIH1cbiAgY29ubmVjdChjYWxsYmFjaykge1xuICAgIHJldHVybiBzdXBlci5jb25uZWN0KFxuICAgICAgY2FsbGJhY2tcbiAgICApO1xuICB9XG59O1xuZnVuY3Rpb24gY3JlYXRlUG9vbChjb25maWcpIHtcbiAgdmFyIF9hO1xuICBjb25zdCBjb25uZWN0aW9uU3RyaW5nID0gKF9hID0gY29uZmlnID09IG51bGwgPyB2b2lkIDAgOiBjb25maWcuY29ubmVjdGlvblN0cmluZykgIT0gbnVsbCA/IF9hIDogcG9zdGdyZXNDb25uZWN0aW9uU3RyaW5nKFwicG9vbFwiKTtcbiAgaWYgKCFjb25uZWN0aW9uU3RyaW5nKVxuICAgIHRocm93IG5ldyBWZXJjZWxQb3N0Z3Jlc0Vycm9yKFxuICAgICAgXCJtaXNzaW5nX2Nvbm5lY3Rpb25fc3RyaW5nXCIsXG4gICAgICBcIllvdSBkaWQgbm90IHN1cHBseSBhICdjb25uZWN0aW9uU3RyaW5nJyBhbmQgbm8gJ1BPU1RHUkVTX1VSTCcgZW52IHZhciB3YXMgZm91bmQuXCJcbiAgICApO1xuICBpZiAoIWlzTG9jYWxob3N0Q29ubmVjdGlvblN0cmluZyhjb25uZWN0aW9uU3RyaW5nKSAmJiAhaXNQb29sZWRDb25uZWN0aW9uU3RyaW5nKGNvbm5lY3Rpb25TdHJpbmcpKVxuICAgIHRocm93IG5ldyBWZXJjZWxQb3N0Z3Jlc0Vycm9yKFxuICAgICAgXCJpbnZhbGlkX2Nvbm5lY3Rpb25fc3RyaW5nXCIsXG4gICAgICBcIlRoaXMgY29ubmVjdGlvbiBzdHJpbmcgaXMgbWVhbnQgdG8gYmUgdXNlZCB3aXRoIGEgZGlyZWN0IGNvbm5lY3Rpb24uIE1ha2Ugc3VyZSB0byB1c2UgYSBwb29sZWQgY29ubmVjdGlvbiBzdHJpbmcgb3IgdHJ5IGBjcmVhdGVDbGllbnQoKWAgaW5zdGVhZC5cIlxuICAgICk7XG4gIGxldCBtYXhVc2VzID0gY29uZmlnID09IG51bGwgPyB2b2lkIDAgOiBjb25maWcubWF4VXNlcztcbiAgbGV0IG1heCA9IGNvbmZpZyA9PSBudWxsID8gdm9pZCAwIDogY29uZmlnLm1heDtcbiAgaWYgKHR5cGVvZiBFZGdlUnVudGltZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGlmIChtYXhVc2VzICYmIG1heFVzZXMgIT09IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJAdmVyY2VsL3Bvc3RncmVzOiBPdmVycmlkaW5nIGBtYXhVc2VzYCB0byAxIGJlY2F1c2UgdGhlIEVkZ2VSdW50aW1lIGRvZXMgbm90IHN1cHBvcnQgY2xpZW50IHJldXNlLlwiXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobWF4ICYmIG1heCAhPT0gMWU0KSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiQHZlcmNlbC9wb3N0Z3JlczogT3ZlcnJpZGluZyBgbWF4YCB0byAxMCwwMDAgYmVjYXVzZSB0aGUgRWRnZVJ1bnRpbWUgZG9lcyBub3Qgc3VwcG9ydCBjbGllbnQgcmV1c2UuXCJcbiAgICAgICk7XG4gICAgfVxuICAgIG1heFVzZXMgPSAxO1xuICAgIG1heCA9IDFlNDtcbiAgfVxuICBjb25zdCBwb29sMiA9IG5ldyBWZXJjZWxQb29sKHtcbiAgICAuLi5jb25maWcsXG4gICAgY29ubmVjdGlvblN0cmluZyxcbiAgICBtYXhVc2VzLFxuICAgIG1heFxuICB9KTtcbiAgcmV0dXJuIHBvb2wyO1xufVxuXG4vLyBzcmMvaW5kZXgudHNcbnZhciBwb29sO1xudmFyIHNxbCA9IG5ldyBQcm94eShcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbiAtLSBbQHZlcmNlbC9zdHlsZS1ndWlkZUA1IG1pZ3JhdGlvbl1cbiAgKCkgPT4ge1xuICB9LFxuICB7XG4gICAgZ2V0KF8sIHByb3ApIHtcbiAgICAgIGlmICghcG9vbCkge1xuICAgICAgICBwb29sID0gY3JlYXRlUG9vbCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsID0gUmVmbGVjdC5nZXQocG9vbCwgcHJvcCk7XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiB2YWwuYmluZChwb29sKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSxcbiAgICBhcHBseShfLCBfXywgYXJndW1lbnRzTGlzdCkge1xuICAgICAgaWYgKCFwb29sKSB7XG4gICAgICAgIHBvb2wgPSBjcmVhdGVQb29sKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9vbC5zcWwoLi4uYXJndW1lbnRzTGlzdCk7XG4gICAgfVxuICB9XG4pO1xudmFyIGRiID0gc3FsO1xuXG5leHBvcnQge1xuICBwb3N0Z3Jlc0Nvbm5lY3Rpb25TdHJpbmcsXG4gIFZlcmNlbENsaWVudCxcbiAgY3JlYXRlQ2xpZW50LFxuICBWZXJjZWxQb29sLFxuICBjcmVhdGVQb29sLFxuICBzcWwsXG4gIGRiXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2h1bmstVkdVSE01V0cuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@vercel/postgres/dist/chunk-VGUHM5WG.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/@vercel/postgres/dist/index-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/@vercel/postgres/dist/index-node.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   VercelClient: () => (/* reexport safe */ _chunk_VGUHM5WG_js__WEBPACK_IMPORTED_MODULE_0__.VercelClient),\n/* harmony export */   VercelPool: () => (/* reexport safe */ _chunk_VGUHM5WG_js__WEBPACK_IMPORTED_MODULE_0__.VercelPool),\n/* harmony export */   createClient: () => (/* reexport safe */ _chunk_VGUHM5WG_js__WEBPACK_IMPORTED_MODULE_0__.createClient),\n/* harmony export */   createPool: () => (/* reexport safe */ _chunk_VGUHM5WG_js__WEBPACK_IMPORTED_MODULE_0__.createPool),\n/* harmony export */   db: () => (/* reexport safe */ _chunk_VGUHM5WG_js__WEBPACK_IMPORTED_MODULE_0__.db),\n/* harmony export */   postgresConnectionString: () => (/* reexport safe */ _chunk_VGUHM5WG_js__WEBPACK_IMPORTED_MODULE_0__.postgresConnectionString),\n/* harmony export */   sql: () => (/* reexport safe */ _chunk_VGUHM5WG_js__WEBPACK_IMPORTED_MODULE_0__.sql)\n/* harmony export */ });\n/* harmony import */ var _chunk_VGUHM5WG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-VGUHM5WG.js */ \"(rsc)/./node_modules/@vercel/postgres/dist/chunk-VGUHM5WG.js\");\n/* harmony import */ var _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/@neondatabase/serverless/index.mjs\");\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ws */ \"(rsc)/./node_modules/ws/wrapper.mjs\");\n\n\n// src/index-node.ts\n\n\nif (_neondatabase_serverless__WEBPACK_IMPORTED_MODULE_1__.neonConfig) {\n  _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_1__.neonConfig.webSocketConstructor = ws__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n}\n\n//# sourceMappingURL=index-node.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHZlcmNlbC9wb3N0Z3Jlcy9kaXN0L2luZGV4LW5vZGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVE2Qjs7QUFFN0I7QUFDc0Q7QUFDbEM7QUFDcEIsSUFBSSxnRUFBVTtBQUNkLEVBQUUsZ0VBQVUsd0JBQXdCLDBDQUFFO0FBQ3RDO0FBU0U7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1kcml6emxlLy4vbm9kZV9tb2R1bGVzL0B2ZXJjZWwvcG9zdGdyZXMvZGlzdC9pbmRleC1ub2RlLmpzP2ZhOGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVmVyY2VsQ2xpZW50LFxuICBWZXJjZWxQb29sLFxuICBjcmVhdGVDbGllbnQsXG4gIGNyZWF0ZVBvb2wsXG4gIGRiLFxuICBwb3N0Z3Jlc0Nvbm5lY3Rpb25TdHJpbmcsXG4gIHNxbFxufSBmcm9tIFwiLi9jaHVuay1WR1VITTVXRy5qc1wiO1xuXG4vLyBzcmMvaW5kZXgtbm9kZS50c1xuaW1wb3J0IHsgbmVvbkNvbmZpZyB9IGZyb20gXCJAbmVvbmRhdGFiYXNlL3NlcnZlcmxlc3NcIjtcbmltcG9ydCB3cyBmcm9tIFwid3NcIjtcbmlmIChuZW9uQ29uZmlnKSB7XG4gIG5lb25Db25maWcud2ViU29ja2V0Q29uc3RydWN0b3IgPSB3cztcbn1cbmV4cG9ydCB7XG4gIFZlcmNlbENsaWVudCxcbiAgVmVyY2VsUG9vbCxcbiAgY3JlYXRlQ2xpZW50LFxuICBjcmVhdGVQb29sLFxuICBkYixcbiAgcG9zdGdyZXNDb25uZWN0aW9uU3RyaW5nLFxuICBzcWxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC1ub2RlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@vercel/postgres/dist/index-node.js\n");

/***/ })

};
;