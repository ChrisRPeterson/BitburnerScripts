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
  initAllNeighborHosts(ns, ns.getHostname());
  startPservs(ns);
}

function initAllNeighborHosts(ns: NS, initialHost: string) {
  const neighbors = ns.scan(initialHost);
  neighbors.forEach((host) => {
    if (initializedHosts.includes(host)) {
      return;
    }

    initializedHosts.push(host);
    initAllNeighborHosts(ns, host);
    copyScripts(ns, host);

    if (ns.scriptRunning(OMNI_HACK_PATH, host)) {
      ns.print(
        `WARN: ${host} could not initialize because the script was already running.`
      );
      return;
    }

    if (ns.getServerNumPortsRequired(host) > MAX_PORTS_REQUIRED) {
      ns.print(
        `WARN: ${host} could not initialize because we cannot open enough ports.`
      );
      return;
    }

    if (ns.fileExists(BRUTESSH_PATH)) {
      ns.brutessh(host);
    }

    if (ns.fileExists(FTPCRACK_PATH)) {
      ns.ftpcrack(host);
    }

    ns.nuke(host);
    copyScripts(ns, host);
    startOmniHack(ns, host);
    ns.printf(`SUCCESS: ${host} is running the script.`);
  });
}

function startPservs(ns: NS) {
  const pservs = ns.getPurchasedServers();
  pservs.forEach((host) => {
    if (ns.scriptRunning(OMNI_HACK_PATH, host)) {
      return;
    }

    ns.nuke(host);
    copyScripts(ns, host);
    startOmniHack(ns, host);
  });
}
