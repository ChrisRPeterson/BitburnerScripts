import { NS } from "@ns";
import { TARGET } from "/lib/constants";

export async function main(ns: NS): Promise<void> {
  const target = ns.args[0] || TARGET;
  if (typeof target !== "string") {
    throw new Error("Target must be type of string.");
  }

  const MONEY_THRESH = ns.getServerMaxMoney(target) * 0.75;
  const SECURITY_THRESH = ns.getServerMinSecurityLevel(target) + 5;

  for (;;) {
    if (ns.getServerSecurityLevel(target) > SECURITY_THRESH) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < MONEY_THRESH) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
