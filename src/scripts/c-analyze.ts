import { NS } from "@ns";
import { ServerInfo } from "../lib/CustomTypes";

export async function main(ns: NS): Promise<void> {
  const host = ns.args[0];
  if (typeof host !== "string") {
    throw new Error("Host must be type of string");
  }

  const serverInfo: ServerInfo = {
    host,
    moneyAvailable: ns.formatNumber(ns.getServerMoneyAvailable(host)),
    moneyMax: ns.formatNumber(ns.getServerMaxMoney(host)),
    hackDifficulty: ns.getServerSecurityLevel(host),
    minDifficulty: ns.getServerMinSecurityLevel(host),
  };

  for (const property in serverInfo) {
    ns.tprint(`${property}: ${serverInfo[property as keyof ServerInfo]}`);
  }
}
