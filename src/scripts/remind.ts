import { NS } from "@ns";

const target = "NiteSec";
const hackingSkillRequired = 215;

export async function main(ns: NS): Promise<void> {
  for (;;) {
    const hackingLevel = ns.getHackingLevel();
    if (hackingLevel >= hackingSkillRequired) {
      ns.tprint(`*******REMINDER: CAN BACKDOOR ${target}*********`);
    }
    await ns.sleep(60000);
  }
}
