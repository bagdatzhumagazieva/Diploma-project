// According design we have four statuses of battle:
// 1) Incoming - battles to which the user was called by other players
// 2) Outgoing - battles to which the user called other players
// 3) Success - battles that ended and user won this battle
// 4) Loss - battles that ended and user lost this battle

export enum BattleStatuses {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
  SUCCESS = 'success',
  LOSS = 'loss',
}
