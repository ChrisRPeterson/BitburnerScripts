import { NS } from "@ns";
import { HOME_HOST, OMNI_HACK_PATH, TARGET } from "lib/constants";

// An adaptation of this script:
// https://bitburner.readthedocs.io/en/latest/guidesandtips/gettingstartedguideforbeginnerprogrammers.html#creating-our-first-script
export function omniHack(ns: NS, target: string) {
  const MONEY_THRESH = ns.getServerMaxMoney(target) * 0.75;
  const SECURITY_THRESH = ns.getServerMinSecurityLevel(target) + 5;

  for (;;) {
    if (ns.getServerSecurityLevel(target) > SECURITY_THRESH) {
      ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < MONEY_THRESH) {
      ns.grow(target);
    } else {
      ns.hack(target);
    }
  }
}

const filesToCopy = [
  "scripts/start-up.js",
  "scripts/omni-hack.js",
  "lib/constants.js",
  "lib/helpers.js",
];

export async function copyScripts(
  ns: NS,
  destinations: string | string[]
): Promise<void> {
  if (!Array.isArray(destinations)) {
    destinations = [destinations];
  }

  destinations.forEach((destination) => {
    if (typeof destination !== "string") {
      throw new Error("Destination must be type of string.");
    }
    ns.scp(filesToCopy, destination, HOME_HOST);
  });
}

export function startOmniHack(ns: NS, host: string) {
  const threads = Math.floor(
    ns.getServerMaxRam(host) / ns.getScriptRam(OMNI_HACK_PATH)
  );
  if (threads <= 0) {
    ns.print(`ERROR: ${host} could not start due to insufficient RAM.`);
    return;
  }
  ns.exec(OMNI_HACK_PATH, host, { threads }, TARGET);
}
