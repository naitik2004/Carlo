import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import auth from "./auth.js";

process.env.JWT_SECRET = "test-secret";

test("auth middleware accepts a valid bearer token", () => {
  const token = jwt.sign({ id: "user-123" }, process.env.JWT_SECRET);
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = {};
  let nextCalled = false;

  auth(req, res, () => {
    nextCalled = true;
  });

  assert.equal(req.user, "user-123");
  assert.equal(nextCalled, true);
});

test("auth middleware rejects a missing token", () => {
  const req = { headers: {} };
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  auth(req, res, () => {
    throw new Error("next should not be called");
  });

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { message: "Unauthorized" });
});
