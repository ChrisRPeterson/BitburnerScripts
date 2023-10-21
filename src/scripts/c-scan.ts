import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  // All servers that are one hop from the current server.
  ns.tprint("Neighbors of current server.");
  let neighbor = ns.scan();
  for (let i = 0; i < neighbor.length; i++) {
    ns.tprint(neighbor[i]);
  }
  // All neighbors of n00dles.
  const target = "n00dles";
  neighbor = ns.scan(target);
  ns.tprintf("Neighbors of %s.", target);
  for (let i = 0; i < neighbor.length; i++) {
    ns.tprint(neighbor[i]);
  }
}
