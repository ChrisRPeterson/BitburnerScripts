import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  const host = ns.args[0];
  const newName = ns.args[1];
  if (typeof host !== "string") {
    throw new Error("Host must be a string.");
  }
  if (typeof newName !== "string") {
    throw new Error("Host must be a string.");
  }
  ns.renamePurchasedServer(host, newName);
}
