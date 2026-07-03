# Security Specification & Threat Model

This document outlines the security architecture and threat landscape for the Digicare Growth Hub application.

## 1. Data Invariants

- **Leads Collection (`/leads/{leadId}`)**:
  - Anyone can submit a lead (unauthenticated creation).
  - Validation: Leads must contain exactly 7 keys: `id`, `name`, `email`, `service`, `message`, `timestamp`, and `status`.
  - Immutable fields: All fields except `status` are immutable after creation.
  - Access Control: Reads, deletions, and updates are restricted strictly to authorized Administrators (verified email: `krishnan989756@gmail.com`).

- **Audits Collection (`/audits/{auditId}`)**:
  - Anyone can submit an audit request.
  - Validation: Audits must contain exactly 6 keys: `id`, `objective`, `budget`, `email`, `timestamp`, and `status`.
  - Immutable fields: All fields except `status` are immutable after creation.
  - Access Control: Reads, deletions, and updates are restricted strictly to authorized Administrators.

---

## 2. The "Dirty Dozen" Payloads (Threat Vectors)

1. **Leads Bypass (ID Poisoning)**: Document ID containing non-alphanumeric/malicious characters.
2. **Leads Attribute Pollution (Shadow Field Injection)**: Creating a lead with an injected administrative field `isAdmin: true` or `role: "admin"`.
3. **Leads Truncation/Incomplete Payload**: Creating a lead without `status` or other required fields.
4. **Leads Malformed Status**: Creating a lead with `status: "super-admin"`.
5. **Leads Unauthorized Read**: An anonymous or unauthorized user attempting to read/list leads.
6. **Leads Unauthorized Update**: An unauthorized user trying to change the status of a lead.
7. **Leads Unauthorized Delete**: An unauthorized user trying to delete a lead.
8. **Audits Bypass (ID Poisoning)**: Document ID with path injection sequences.
9. **Audits Attribute Pollution (Shadow Field Injection)**: Creating an audit request with `isVerified: true`.
10. **Audits Malformed Status**: Creating an audit request with `status: "approved"`.
11. **Audits Unauthorized Read**: An unauthorized user attempting to list audits.
12. **Audits Unauthorized Delete**: An unauthorized user trying to delete an audit request.

---

## 3. The Security Test Runner

Below is the verification plan matching the above vectors:

```ts
// firestore.rules.test.ts (Conceptual Blueprint)
describe("Firestore Security Rules", () => {
  it("allows anonymous creation of valid leads & audit requests", () => {
    // PASS: Valid lead payload
  });

  it("blocks ID Poisoning on leads", () => {
    // FAIL: PERMISSION_DENIED
  });

  it("blocks shadow field injection on leads", () => {
    // FAIL: PERMISSION_DENIED
  });

  it("denies unauthenticated read/delete operations", () => {
    // FAIL: PERMISSION_DENIED
  });

  it("allows admin (krishnan989756@gmail.com) full read/write management", () => {
    // PASS
  });
});
```
