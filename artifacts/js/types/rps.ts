import {
  z
} from "zod";
import {
  leoAddressSchema,
  leoPrivateKeySchema,
  leoViewKeySchema,
  leoTxIdSchema,
  leoScalarSchema,
  leoFieldSchema,
  leoBooleanSchema,
  leoU8Schema,
  leoU16Schema,
  leoU32Schema,
  leoU64Schema,
  leoU128Schema,
  leoGroupSchema,
  leoRecordSchema,
  leoTxSchema,
  leoSignatureSchema,
  LeoArray,
  LeoAddress
} from "@doko-js/core";

export interface game_metadata {
  game_id: bigint;
  valid_until: number;
  wager: bigint;
}

export const leoGame_metadataSchema = z.object({
  game_id: leoU128Schema,
  valid_until: leoU32Schema,
  wager: leoU128Schema,
});
export type game_metadataLeo = z.infer < typeof leoGame_metadataSchema > ;

export interface token {
  owner: LeoAddress;
  amount: bigint;
  _nonce: bigint;
}

export const leoTokenSchema = z.object({
  owner: leoAddressSchema,
  amount: leoU64Schema,
  _nonce: leoGroupSchema,
});
export type tokenLeo = z.infer < typeof leoTokenSchema > ;

export interface play_game_record {
  owner: LeoAddress;
  game_id: bigint;
  move: number;
  turn: number;
  wager: bigint;
  _nonce: bigint;
}

export const leoPlay_game_recordSchema = z.object({
  owner: leoAddressSchema,
  game_id: leoU128Schema,
  move: leoU8Schema,
  turn: leoU8Schema,
  wager: leoU128Schema,
  _nonce: leoGroupSchema,
});
export type play_game_recordLeo = z.infer < typeof leoPlay_game_recordSchema > ;