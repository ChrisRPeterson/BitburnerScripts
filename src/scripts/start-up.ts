import { NS } from "@ns";
import { OMNI_HACK_PATH } from "/lib/constants";
import {
  copyScripts,
  getCurrentHackLevel,
  getRootAccess,
  startOmniHack,
} from "/lib/helpers";

const initializedHosts: string[] = [];

export async function main(ns: NS): Promise<void> {
  const disableLogFunctions = [
    "scp",
    "getServerNumPortsRequired",
    "getServerMaxRam",
    "scan",
  ];
  disableLogFunctions.forEach((func) => {
    ns.disableLog(func);
  });
  startPservs(ns);
  initAllNeighborHosts(ns, ns.getHostname());
}

function initAllNeighborHosts(ns: NS, initialHost: string) {
  if (initializedHosts.includes(initialHost) || initialHost.includes("pserv")) {
    return;
  }
  initializedHosts.push(initialHost);

  if (ns.scriptRunning(OMNI_HACK_PATH, initialHost)) {
    ns.tprint(
      `WARN: ${initialHost} could not initialize because the script was already running.`
    );
    return;
  }

  if (
    ns.getServerNumPortsRequired(initialHost) > getCurrentHackLevel(ns) &&
    initialHost !== "home"
  ) {
    ns.tprint(
      `WARN: ${initialHost} could not initialize because we cannot open enough ports. Required: ${ns.getServerNumPortsRequired(
        initialHost
      )}, Actual: ${getCurrentHackLevel(ns)}`
    );
  } else {
    if (!ns.hasRootAccess(initialHost)) {
      getRootAccess(ns, initialHost);
    }
    copyScripts(ns, initialHost);
    startOmniHack(ns, initialHost);
    ns.tprint(`SUCCESS: ${initialHost} is running the script.`);
  }

  const neighbors = ns.scan(initialHost);
  neighbors.forEach((host) => {
    initAllNeighborHosts(ns, host);
  });
}

function startPservs(ns: NS) {
  const pservs = ns.getPurchasedServers();
  pservs.forEach((host) => {
    copyScripts(ns, host);

    if (ns.scriptRunning(OMNI_HACK_PATH, host)) {
      ns.tprint(
        `WARN: ${host} could not initialize because the script was already running.`
      );
      return;
    }

    ns.tprint(`SUCCESS: ${host} is running the script.`);
    startOmniHack(ns, host);
  });
}
