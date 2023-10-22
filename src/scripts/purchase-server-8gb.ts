import { NS } from "@ns";
import { HOME_HOST } from "/lib/constants";
import { copyScripts, startOmniHack } from "/lib/helpers";

const RAM = 8;
const SLEEP_MS = 60000;
let i = 0;

export async function main(ns: NS): Promise<void> {
  while (i < ns.getPurchasedServerLimit()) {
    if (
      ns.getServerMoneyAvailable(HOME_HOST) > ns.getPurchasedServerCost(RAM)
    ) {
      const hostname = ns.purchaseServer(`pserv`, RAM);
      copyScripts(ns, hostname);
      startOmniHack(ns, hostname);
      i++;
    }
    await ns.sleep(SLEEP_MS);
  }
}
