import { NS } from "@ns";
import {
  BRUTESSH_PATH,
  FTPCRACK_PATH,
  HOME_HOST,
  HTTPWORM_PATH,
  OMNI_HACK_PATH,
  RELAYSMTP_PATH,
  TARGET,
} from "lib/constants";

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
  const maxRam = ns.getServerMaxRam(host);
  const availableRam = maxRam - ns.getServerUsedRam(host);
  const scriptRam = ns.getScriptRam(OMNI_HACK_PATH);
  const threads = Math.floor(availableRam / scriptRam);
  if (threads <= 0) {
    ns.tprint(
      `WARNING: ${host} could not start due to insufficient RAM. Max: ${maxRam}, Available: ${availableRam}, Required: ${scriptRam}.`
    );
    return;
  }
  ns.exec(OMNI_HACK_PATH, host, { threads }, TARGET);
}

export function getRootAccess(ns: NS, host: string) {
  if (ns.fileExists(BRUTESSH_PATH)) {
    ns.brutessh(host);
  }

  if (ns.fileExists(FTPCRACK_PATH)) {
    ns.ftpcrack(host);
  }

  if (ns.fileExists(RELAYSMTP_PATH)) {
    ns.relaysmtp(host);
  }

  if (ns.fileExists(HTTPWORM_PATH)) {
    ns.httpworm(host);
  }

  ns.nuke(host);
}
