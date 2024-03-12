// The `program` scope defines the data types, functions, and state associated with the `token` program.
// The program is a sudo program that enables users to play rock, paper, scissors game on chain without revealing 
// the information of the players. The player information is completely private. 
program rps.aleo {
    struct game_metadata {
        game_id: u128, 
        valid_until: u32,
        wager: u128
    }

    mapping game_id: u128 => bool;
    mapping total_games: u8 => u128;
    mapping game_meta_data: u128 => game_metadata;
    mapping second_move: u128 => u8;
    mapping finished: u128 => bool;
    mapping game_drawn: u128 => bool; 

    record token {
        // The token owner.
        owner: address,
        // The token amount.
        amount: u64,
    }

    record play_game_record {
        owner: address,
        game_id: u128,
        move: u8,
        turn: u8,
        wager: u128,
    }

    // 0 -> rock, 1 -> paper, 2 -> scissors

    transition create_game(id: u128, first_move: u8, amount: u128) -> play_game_record {
        let game_record: play_game_record = play_game_record {
            owner: self.caller,
            game_id: id,
            move: first_move,
            turn: 0u8,
            wager: amount
        };
        // transfer wager amount to contract address
        return game_record then finalize(id, amount);
    }

    finalize create_game(id : u128, amount: u128) {
        let validity: u32 = block.height + 20u32;
        let latest_game_id: u128 = Mapping::get_or_use(total_games, 0u8, 0u128);
        assert_eq(id, latest_game_id + 1u128);
        let game_data: game_metadata = game_metadata {
            game_id: id,
            valid_until: validity, 
            wager: amount
        };
        Mapping::set(total_games, 0u8,Mapping::get_or_use(total_games, 0u8, 0u128) + 1u128);
        Mapping::set(game_id, id, true);
        Mapping::set(game_meta_data, id, game_data);
        Mapping::set(finished, id, false);
    }

    transition join_game(id: u128, second_mv: u8, validity: u32,amount: u128)-> play_game_record {
        let join_game_record: play_game_record = play_game_record {
            owner: self.caller,
            game_id: id,
            move: second_mv,
            turn: 1u8,
            wager: amount,
        };
        return join_game_record then finalize(id, second_mv, validity, amount);
    }

    finalize join_game(id: u128, second_mv: u8, validity: u32, wager: u128) {
        assert(Mapping::get_or_use(game_id, id, false));
        let game_data: game_metadata = Mapping::get(game_meta_data, id);
        assert_eq(validity, game_data.valid_until);
        assert_eq(wager, game_data.wager);
        assert(game_data.valid_until > block.height);
        Mapping::set(game_id, id, false);
        Mapping::set(second_move,id, second_mv);
    }

    transition reveal(game_record: play_game_record, winnings: u128, second_mv: u8) {
        let drawn: bool = false;
        if (game_record.turn == 0u8) {
            let move: u8 = game_record.move;
            if (move == second_mv) {
                drawn = true;
            } else if (move == 0u8 && second_mv == 1u8) {
                winnings = 0u128;
            } else if (move == 0u8 && second_mv == 2u8) {
                // first won 
                // send aleo credits
            } else if (move == 1u8 && second_mv == 0u8) {
                // first won 
                // send aleo credits
            } else if (move == 1u8 && second_mv == 2u8) {
                winnings = 0u128;
            } else if (move == 2u8 && second_mv == 0u8) {
                winnings = 0u128;
            } else if (move == 2u8 && second_mv == 1u8) {
                // first won 
                // send aleo credits
            }
        } else {
            assert_eq(game_record.turn, 1u8);
            // send aleo credits to the second user
        }
        // return aleo.credits/transfer_public_to_private() then finalize()
        return then finalize(game_record.game_id, winnings, drawn, game_record.turn, second_mv);
    }

    finalize reveal(id: u128, winnings: u128, drawn: bool, turn: u8, second_mv: u8) {
        assert_eq(Mapping::get(second_move, id), second_mv);
        Mapping::set(game_drawn, id, drawn);
        let game_data: game_metadata = Mapping::get(game_meta_data, id);
       
        if (turn == 0u8) {
            assert(game_data.valid_until > block.height);
        } else if (turn == 1u8) {
            assert(game_data.valid_until < block.height);
        }
        assert(!Mapping::get(finished, id));
        assert(!Mapping::get(game_id, id));     
        Mapping::set(finished, id, true); 
        if (winnings != 0u128) {
            assert_eq(game_data.wager * 2u128, winnings);
        }
    }
}