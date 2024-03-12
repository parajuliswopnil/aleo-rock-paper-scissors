import {
  game_metadata,
  game_metadataLeo,
  token,
  tokenLeo,
  play_game_record,
  play_game_recordLeo
} from "../types/rps";
import {
  leo2js
} from "@doko-js/core";


export function getgame_metadata(game_metadata: game_metadataLeo): game_metadata {
  const result: game_metadata = {
    game_id: leo2js.u128(game_metadata.game_id),
    valid_until: leo2js.u32(game_metadata.valid_until),
    wager: leo2js.u128(game_metadata.wager),
  }
  return result;
}

export function gettoken(token: tokenLeo): token {
  const result: token = {
    owner: leo2js.address(token.owner),
    amount: leo2js.u64(token.amount),
    _nonce: leo2js.group(token._nonce),
  }
  return result;
}

export function getplay_game_record(play_game_record: play_game_recordLeo): play_game_record {
  const result: play_game_record = {
    owner: leo2js.address(play_game_record.owner),
    game_id: leo2js.u128(play_game_record.game_id),
    move: leo2js.u8(play_game_record.move),
    turn: leo2js.u8(play_game_record.turn),
    wager: leo2js.u128(play_game_record.wager),
    _nonce: leo2js.group(play_game_record._nonce),
  }
  return result;
}