program rps.aleo;

struct game_metadata:
    game_id as u128;
    valid_until as u32;
    wager as u128;

record token:
    owner as address.private;
    amount as u64.private;

record play_game_record:
    owner as address.private;
    game_id as u128.private;
    move as u8.private;
    turn as u8.private;
    wager as u128.private;


mapping game_id:
	key as u128.public;
	value as boolean.public;


mapping total_games:
	key as u8.public;
	value as u128.public;


mapping game_meta_data:
	key as u128.public;
	value as game_metadata.public;


mapping second_move:
	key as u128.public;
	value as u8.public;


mapping finished:
	key as u128.public;
	value as boolean.public;


mapping game_drawn:
	key as u128.public;
	value as boolean.public;

function create_game:
    input r0 as u128.private;
    input r1 as u8.private;
    input r2 as u128.private;
    cast self.caller r0 r1 0u8 r2 into r3 as play_game_record.record;
    async create_game r0 r2 into r4;
    output r3 as play_game_record.record;
    output r4 as rps.aleo/create_game.future;

finalize create_game:
    input r0 as u128.public;
    input r1 as u128.public;
    add block.height 20u32 into r2;
    get.or_use total_games[0u8] 0u128 into r3;
    add r3 1u128 into r4;
    assert.eq r0 r4;
    cast r0 r2 r1 into r5 as game_metadata;
    get.or_use total_games[0u8] 0u128 into r6;
    add r6 1u128 into r7;
    set r7 into total_games[0u8];
    set true into game_id[r0];
    set r5 into game_meta_data[r0];
    set false into finished[r0];


function join_game:
    input r0 as u128.private;
    input r1 as u8.private;
    input r2 as u32.private;
    input r3 as u128.private;
    cast self.caller r0 r1 1u8 r3 into r4 as play_game_record.record;
    async join_game r0 r1 r2 r3 into r5;
    output r4 as play_game_record.record;
    output r5 as rps.aleo/join_game.future;

finalize join_game:
    input r0 as u128.public;
    input r1 as u8.public;
    input r2 as u32.public;
    input r3 as u128.public;
    get.or_use game_id[r0] false into r4;
    assert.eq r4 true;
    get game_meta_data[r0] into r5;
    assert.eq r2 r5.valid_until;
    assert.eq r3 r5.wager;
    gt r5.valid_until block.height into r6;
    assert.eq r6 true;
    set false into game_id[r0];
    set r1 into second_move[r0];


function reveal:
    input r0 as play_game_record.record;
    input r1 as u128.private;
    input r2 as u8.private;
    is.eq r0.turn 0u8 into r3;
    is.eq r0.move r2 into r4;
    is.eq r0.move 0u8 into r5;
    is.eq r2 1u8 into r6;
    and r5 r6 into r7;
    is.eq r0.move 0u8 into r8;
    is.eq r2 2u8 into r9;
    and r8 r9 into r10;
    is.eq r0.move 1u8 into r11;
    is.eq r2 0u8 into r12;
    and r11 r12 into r13;
    is.eq r0.move 1u8 into r14;
    is.eq r2 2u8 into r15;
    and r14 r15 into r16;
    is.eq r0.move 2u8 into r17;
    is.eq r2 0u8 into r18;
    and r17 r18 into r19;
    is.eq r0.move 2u8 into r20;
    is.eq r2 1u8 into r21;
    and r20 r21 into r22;
    ternary r19 0u128 r1 into r23;
    ternary r16 0u128 r23 into r24;
    ternary r13 r1 r24 into r25;
    ternary r10 r1 r25 into r26;
    ternary r7 0u128 r26 into r27;
    ternary r4 true false into r28;
    ternary r4 r1 r27 into r29;
    not r3 into r30;
    not r30 into r31;
    is.eq r0.turn 1u8 into r32;
    or r31 r32 into r33;
    assert.eq r33 true;
    ternary r3 r28 false into r34;
    ternary r3 r29 r1 into r35;
    async reveal r0.game_id r35 r34 r0.turn r2 into r36;
    output r36 as rps.aleo/reveal.future;

finalize reveal:
    input r0 as u128.public;
    input r1 as u128.public;
    input r2 as boolean.public;
    input r3 as u8.public;
    input r4 as u8.public;
    get second_move[r0] into r5;
    assert.eq r5 r4;
    set r2 into game_drawn[r0];
    get game_meta_data[r0] into r6;
    is.eq r3 0u8 into r7;
    gt r6.valid_until block.height into r8;
    not r7 into r9;
    or r9 r8 into r10;
    assert.eq r10 true;
    is.eq r3 1u8 into r11;
    lt r6.valid_until block.height into r12;
    not r7 into r13;
    and r13 r11 into r14;
    not r14 into r15;
    or r15 r12 into r16;
    assert.eq r16 true;
    get finished[r0] into r17;
    not r17 into r18;
    assert.eq r18 true;
    get game_id[r0] into r19;
    not r19 into r20;
    assert.eq r20 true;
    set true into finished[r0];
    is.neq r1 0u128 into r21;
    mul r6.wager 2u128 into r22;
    not r21 into r23;
    is.eq r22 r1 into r24;
    or r23 r24 into r25;
    assert.eq r25 true;
