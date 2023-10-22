// import { NS } from "@ns";

// const initializedHosts: string[] = [];

// export async function main(ns: NS): Promise<void> {
//   const target = findTarget(ns, ns.getHostname());
//   ns.print(target);
// }

// function findTarget(ns: NS, initialHost: string): string {
//   const neighbors = ns.scan(initialHost);
//   for (let i = 0; i < neighbors.length; i++) {
//     const host = neighbors[i];
//     // Quickly avoid shenangians with home.

//     if (initializedHosts.includes(host)) {
//       continue;
//     }

//     initializedHosts.push(host);
//     let bestTarget = findTarget(ns, host);

//     if (!isHackable(ns, host)) {
//       continue;
//     }

//     if (!bestTarget && ns.getHostname() === "home") {
//       continue;
//     } else if (!bestTarget) {
//       bestTarget = ns.getHostname();
//     } else if (
//       ns.getServerMoneyAvailable(bestTarget) >
//       ns.getServerMoneyAvailable(ns.getHostname())
//     ) {
//       bestTarget = ns.getHostname();
//     }
//     return bestTarget;
//   }
// }
