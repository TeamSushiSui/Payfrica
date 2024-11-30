module sui_saving_cirlce::sui_saving_challenge{
    use std::string::String;
    use sui::table::{Table, new};
    use sui::coin::Coin;
    use std::ascii::String as AsciiString;
    use sui::balance::{Self,Balance};
    use sui::clock::{Clock};
    use std::type_name::{Self,};

    const ChallengeNotPublic: u64 = 0;
    const ChallengeNotActive: u64 = 1;
    const ChallengeNotStarted: u64 = 2;
    const ChallengeNotJoined: u64 = 3;
    // const ChallengeJoined: u64 = 4;
    const NotChallengeCoin: u64 = 5;

    public struct Challenge<phantom T> has key, store{
        id: UID,
        name: String,
        description: String,
        leaderboard: Table<address, Balance<T>>,
        target: u64,
        frequency: u64,
        deadline:  u64,
        start_date: u64,
        is_public: bool,
        coin_type: AsciiString,
        active: bool
    }

    public struct TotalChallenges has key, store {
        id: UID,
        challenges: vector<address>,
    }

    fun init(ctx: &mut TxContext){
        let total_challenges : TotalChallenges = TotalChallenges{
            id: object::new(ctx),
            challenges: vector::empty<address>()
        };
        transfer::public_share_object(total_challenges);
    }

    public fun create_challenge<T>(challenges : &mut TotalChallenges, name: String, description: String, target: u64, frequency: u64, deadline: u64, is_public: bool, coin_type: AsciiString, clock: &Clock, ctx: &mut TxContext){
        let challenge : Challenge<T> = Challenge{
            id : object::new(ctx),
            name: name,
            description: description,
            leaderboard: new<address, Balance<T>>(ctx),
            target: target,
            frequency: frequency,
            deadline: deadline,
            start_date: clock.timestamp_ms(),
            is_public: is_public,
            coin_type: coin_type,
            active: true
        };

        vector::push_back(&mut challenges.challenges, object::id_address(&challenge));
        transfer::public_share_object(challenge);
    }

    public fun join_challenge<T>(challenge : &mut Challenge<T>, ctx: &mut TxContext){
        assert!(challenge.is_public == true, ChallengeNotPublic);
        assert!(challenge.active == true, ChallengeNotActive);
        assert!(challenge.leaderboard.contains(ctx.sender()), ChallengeNotStarted);

        challenge.leaderboard.add(ctx.sender(), balance::zero());
    }

    public fun add_saving<T>(challenge : &mut Challenge<T>, challenge_coin: Coin<T>, ctx: &mut TxContext){
        assert!(challenge.is_public == true, ChallengeNotPublic);
        assert!(challenge.active == true, ChallengeNotActive);
        assert!(challenge.leaderboard.contains(ctx.sender()), ChallengeNotJoined);
        let coin_type = type_name::get<T>();
        assert!(challenge.coin_type == &coin_type.into_string(), NotChallengeCoin);
        let coin_balance : Balance<T> = challenge_coin.into_balance();

        let challenger_balance = challenge.leaderboard.borrow_mut(ctx.sender());
        balance::join(challenger_balance, coin_balance);
    }
}