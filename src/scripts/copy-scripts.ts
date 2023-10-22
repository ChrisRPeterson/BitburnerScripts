import { NS } from "@ns";
import { HOME_HOST } from "/lib/constants";

const filesToCopy = ["scripts/omni-hack.js", "lib/constants.js"];

const defaultDestinations = [
  "n00dles",
  "foodnstuff",
  "sigma-cosmetics",
  "joesguns",
  "hong-fang-tea",
  "harakiri-sushi",
];

export async function main(ns: NS): Promise<void> {
  const destinations = [...ns.args] || defaultDestinations;
  destinations.forEach((destination) => {
    if (typeof destination !== "string") {
      throw new Error("Destination must be type of string.");
    }
    ns.scp(filesToCopy, destination, HOME_HOST);
  });
}
