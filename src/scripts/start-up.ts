import { NS } from "@ns";
import {
  BRUTESSH_PATH,
  FTPCRACK_PATH,
  MAX_PORTS_REQUIRED,
  OMNI_HACK_PATH,
} from "/lib/constants";
import { copyScripts, startOmniHack } from "/lib/helpers";

const initializedHosts: string[] = [];

export async function main(ns: NS): Promise<void> {
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

  if (ns.getServerNumPortsRequired(initialHost) > MAX_PORTS_REQUIRED) {
    ns.tprint(
      `WARN: ${initialHost} could not initialize because we cannot open enough ports. Required: ${ns.getServerNumPortsRequired(
        initialHost
      )}, Actual: ${MAX_PORTS_REQUIRED}`
    );
  } else {
    if (ns.fileExists(BRUTESSH_PATH)) {
      ns.brutessh(initialHost);
    }

    if (ns.fileExists(FTPCRACK_PATH)) {
      ns.ftpcrack(initialHost);
    }

    ns.nuke(initialHost);
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
