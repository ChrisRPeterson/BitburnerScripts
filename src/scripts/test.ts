import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  ns.printf(`${ns.getServerNumPortsRequired(ns.getHostname())}`);
}
