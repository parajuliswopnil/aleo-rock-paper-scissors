import {
  game_metadata,
  game_metadataLeo,
  token,
  tokenLeo,
  play_game_record,
  play_game_recordLeo
} from "../types/rps";
import {
  js2leo
} from "@doko-js/core";


export function getgame_metadataLeo(game_metadata: game_metadata): game_metadataLeo {
  const result: game_metadataLeo = {
    game_id: js2leo.u128(game_metadata.game_id),
    valid_until: js2leo.u32(game_metadata.valid_until),
    wager: js2leo.u128(game_metadata.wager),
  }
  return result;
}

export function gettokenLeo(token: token): tokenLeo {
  const result: tokenLeo = {
    owner: js2leo.privateField(js2leo.address(token.owner)),
    amount: js2leo.privateField(js2leo.u64(token.amount)),
    _nonce: js2leo.publicField(js2leo.group(token._nonce)),
  }
  return result;
}

export function getplay_game_recordLeo(play_game_record: play_game_record): play_game_recordLeo {
  const result: play_game_recordLeo = {
    owner: js2leo.privateField(js2leo.address(play_game_record.owner)),
    game_id: js2leo.privateField(js2leo.u128(play_game_record.game_id)),
    move: js2leo.privateField(js2leo.u8(play_game_record.move)),
    turn: js2leo.privateField(js2leo.u8(play_game_record.turn)),
    wager: js2leo.privateField(js2leo.u128(play_game_record.wager)),
    _nonce: js2leo.publicField(js2leo.group(play_game_record._nonce)),
  }
  return result;
}