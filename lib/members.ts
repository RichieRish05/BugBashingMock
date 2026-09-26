import type { Member, MemberId } from "./types";

export const MEMBERS: Member[] = [
  { id: "ana", name: "Ana" },
  { id: "ben", name: "Ben" },
  { id: "chloe", name: "Chloe" },
  { id: "dev", name: "Dev" },
];

export const MEMBER_IDS: MemberId[] = MEMBERS.map((m) => m.id);

export function isMemberId(value: unknown): value is MemberId {
  return typeof value === "string" && (MEMBER_IDS as string[]).includes(value);
}

export function memberName(id: MemberId): string {
  return MEMBERS.find((m) => m.id === id)?.name ?? id;
}
