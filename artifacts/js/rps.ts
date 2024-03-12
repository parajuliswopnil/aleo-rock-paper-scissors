import {
  play_game_record,
  game_metadata
} from "./types/rps";
import {
  getplay_game_recordLeo,
  getgame_metadataLeo
} from "./js2leo/rps";
import {
  getplay_game_record,
  getgame_metadata
} from "./leo2js/rps";
import {
  zkRun,
  ContractConfig,
  zkGetMapping,
  LeoAddress,
  LeoRecord,
  js2leo,
  leo2js
} from "@doko-js/core";
import {
  BaseContract
} from "../../contract/base-contract";
import {
  TransactionModel
} from "@aleohq/sdk";

export class RpsContract extends BaseContract {

  constructor(config: ContractConfig = {}) {
    super(config);
    this.config = {
      ...this.config,
      appName: 'rps',
      contractPath: 'artifacts/leo/rps',
      fee: '0.01'
    };
  }
  async create_game(r0: bigint, r1: number, r2: bigint): Promise < [LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.u128(r0);
    const r1Leo = js2leo.u8(r1);
    const r2Leo = js2leo.u128(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'create_game',
      params,
    });
    const out0 = result.data[0];
    return [out0, result.transaction];
  }

  async join_game(r0: bigint, r1: number, r2: number, r3: bigint): Promise < [LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.u128(r0);
    const r1Leo = js2leo.u8(r1);
    const r2Leo = js2leo.u32(r2);
    const r3Leo = js2leo.u128(r3);

    const params = [r0Leo, r1Leo, r2Leo, r3Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'join_game',
      params,
    });
    const out0 = result.data[0];
    return [out0, result.transaction];
  }

  async reveal(r0: play_game_record, r1: bigint, r2: number): Promise < [TransactionModel] > {
    const r0Leo = js2leo.json(getplay_game_recordLeo(r0));
    const r1Leo = js2leo.u128(r1);
    const r2Leo = js2leo.u8(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'reveal',
      params,
    });
    return [result.transaction];
  }

  async game_id(key: bigint, defaultValue ? : boolean): Promise < boolean > {
    const keyLeo = js2leo.u128(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'game_id',
      params,
    });

    if (result != null)
      return leo2js.boolean(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`game_id returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async total_games(key: number, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.u8(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'total_games',
      params,
    });

    if (result != null)
      return leo2js.u128(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`total_games returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async game_meta_data(key: bigint, defaultValue ? : game_metadata): Promise < game_metadata > {
    const keyLeo = js2leo.u128(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'game_meta_data',
      params,
    });

    if (result != null)
      return getgame_metadata(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`game_meta_data returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async second_move(key: bigint, defaultValue ? : number): Promise < number > {
    const keyLeo = js2leo.u128(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'second_move',
      params,
    });

    if (result != null)
      return leo2js.u8(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`second_move returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async finished(key: bigint, defaultValue ? : boolean): Promise < boolean > {
    const keyLeo = js2leo.u128(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'finished',
      params,
    });

    if (result != null)
      return leo2js.boolean(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`finished returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async game_drawn(key: bigint, defaultValue ? : boolean): Promise < boolean > {
    const keyLeo = js2leo.u128(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'game_drawn',
      params,
    });

    if (result != null)
      return leo2js.boolean(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`game_drawn returned invalid value[input: ${key}, output: ${result}`);
    }
  }


}