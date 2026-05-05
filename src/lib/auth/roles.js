/** Roles that may access the merchant dashboard (aligned with DB helpers / staff tooling). */
const DASHBOARD_ROLES = new Set(["admin", "owner", "staff"]);

/**
 * @param {string | null | undefined} role - `profiles.role`
 */
export function canAccessDashboard(role) {
  const r = String(role ?? "user").toLowerCase();
  return DASHBOARD_ROLES.has(r);
}

export function postAuthPathForRole(role) {
  return canAccessDashboard(role) ? "/dashboard" : "/account/orders";
}
