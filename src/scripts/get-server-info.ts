import { NS, Server } from "@ns";

export async function main(ns: NS): Promise<void> {
  const host = ns.args[0];
  if (typeof host !== "string") {
    throw new Error("Host must be of type string.");
  }
  const server = ns.getServer(host);
  for (const prop in server) {
    let value = server[prop as keyof Server];
    if (typeof value === "number") {
      value = ns.formatNumber(value);
    }
    ns.tprint(`${prop}: ${value}`);
  }
}
