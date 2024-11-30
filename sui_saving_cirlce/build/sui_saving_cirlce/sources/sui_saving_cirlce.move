/// Module: sui_saving_cirlce
module sui_saving_cirlce::sui_saving_cirlce{
    use std::string::String;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self,Balance};
    use std::ascii::String as AsciiString;
    
    
    use std::type_name::{Self,};
    use sui::table::{Self,Table, new};
    use sui::clock::{Clock};

    const NOT_CREATOR: u64 = 0;
    const NOT_MEMBER: u64 = 1;
    const CIRCLE_ACTIVE: u64 = 2;
    const MAX_MEMBERS_REACHED: u64 = 3;
    const MEMBER_EXISTS: u64 = 4;
    const MEMBER_NOT_EXISTS: u64 = 5;
    const NotContributionCoin: u64 = 6;
    const NotContributionAmount: u64 = 7;
    // const CircleNotStarted: u64 = 8;
    const AlreadyPaid : u64 = 9;
    const NotPayOutTime : u64 = 10;

    public struct SavingCircle<phantom T> has key, store{
        id: UID,
        circle_name: String,
        creator: address,
        coin_type: AsciiString,
        total_funds: Balance<T>,
        members: Table<address, Member>,
        max_members: u16,
        start_date: u64,
        end_date: u64,
        contribution_amount: u64,
        cycle_duration: u64,
        current_round: u64,
        active: bool,
    }

    public struct Member has store, drop, copy{
        // payment_history: 
        total_contributions: u64,
        is_paid: bool,
        payout_round: u64,
    }

    public struct ContributionProof has key, store{
        id: UID,
        circle_address: address,
        contribution_amount: u64,
        contribution_date: u64
    }

    public struct PayoutProof has key, store{
        id: UID,
        circle_address: address,
        payout_amount: u64,
        payout_date: u64
    }

    public struct User has store, drop, copy{
        created_circles: vector<address>,
        joined_circles: vector<address>,
        credit_score: u64,
        total_contributions: u64,
        num_of_successful_contributions: u64,
        num_of_failed_contributions: u64,   
    }

    public struct SavingCircleUsers has key, store{
        id: UID,
        users : Table<address, User>
    } 

    fun init(ctx: &mut TxContext){
        let saving_circle_users : SavingCircleUsers = SavingCircleUsers{
            id: object::new(ctx),
            users: new<address, User>(ctx)
        };
        transfer::public_share_object(saving_circle_users);
    }

    public fun create_saving_circle<T>(circle_users : &mut SavingCircleUsers, circle_name: String, max_members: u16, coin_type: AsciiString, contribution_amount: u64, duration: u64, ctx: &mut TxContext){
        let circle : SavingCircle<T> = SavingCircle{
            id : object::new(ctx),
            circle_name: circle_name,
            creator: tx_context::sender(ctx),
            coin_type: coin_type,
            total_funds: balance::zero(),
            members: new<address, Member>(ctx),
            max_members: max_members,
            start_date: 0,
            end_date: 0,
            contribution_amount: contribution_amount,
            cycle_duration: duration,
            current_round: 0,
            active: false,
        };

        if (!circle_users.users.contains(ctx.sender())){
            let user : User = User{
                created_circles : vector::empty<address>(),
                joined_circles : vector::empty<address>(),
                credit_score: 0,
                total_contributions: 0,
                num_of_successful_contributions: 0,
                num_of_failed_contributions: 0,
            };
            circle_users.users.add(ctx.sender(), user);
        };
        let circle_id : address = object::id_address(&circle);
        let existing_user = circle_users.users.borrow_mut(ctx.sender());
        vector::push_back(&mut existing_user.created_circles, circle_id);
        transfer::public_share_object(circle);       
    }

    public fun add_member<T>(circle_users : &mut SavingCircleUsers, circle : &mut SavingCircle<T>, member_address: address, ctx: &mut TxContext){
        assert!(circle.creator == tx_context::sender(ctx), NOT_CREATOR);
        let circle_size = table::length(&circle.members);
        assert!(circle_size as u16 < circle.max_members, MAX_MEMBERS_REACHED);
        assert!(circle.active == false, CIRCLE_ACTIVE);
        assert!(!circle.members.contains(member_address), MEMBER_EXISTS);

        let member : Member = Member{
            total_contributions: 0,
            is_paid: false,
            payout_round: table::length(&circle.members)
        };
        circle.members.add(ctx.sender(), member);

        if (!circle_users.users.contains(member_address)){
            let user : User = User{
                created_circles : vector::empty<address>(),
                joined_circles : vector::empty<address>(),
                credit_score: 0,
                total_contributions: 0,
                num_of_successful_contributions: 0,
                num_of_failed_contributions: 0,
            };
            circle_users.users.add(member_address, user);
        };

        let existing_user = circle_users.users.borrow_mut(member_address);
        vector::push_back(&mut existing_user.joined_circles, object::id_address(circle));        
    }

    public fun remove_member<T>(circle : &mut SavingCircle<T>, member_address: address, ctx: &mut TxContext){
        assert!(circle.creator == tx_context::sender(ctx), NOT_CREATOR);
        assert!(circle.active == false, CIRCLE_ACTIVE);
        assert!(circle.members.contains(member_address), MEMBER_NOT_EXISTS);

        circle.members.remove(member_address);
    }

    public fun make_contribution<T>(circle_users : &mut SavingCircleUsers,circle : &mut SavingCircle<T>, contribution_coin: Coin<T>, clock: &Clock, ctx: &mut TxContext){
        assert!(circle.members.contains(ctx.sender()), NOT_MEMBER);
        let coin_type = type_name::get<T>();
        assert!(circle.coin_type == &coin_type.into_string(), NotContributionCoin);
        let amount = contribution_coin.value();
        assert!(amount == circle.contribution_amount, NotContributionAmount);
        let coin_balance : Balance<T> = contribution_coin.into_balance();
        balance::join(& mut circle.total_funds, coin_balance);
        let member = circle.members.borrow_mut(ctx.sender());
        member.total_contributions = member.total_contributions + amount;

        let contribution_proof : ContributionProof = ContributionProof{
            id: object::new(ctx),
            circle_address: object::id_address(circle),
            contribution_amount: amount,
            contribution_date: clock.timestamp_ms()
        };
        transfer::public_share_object(contribution_proof);

        let existing_user = circle_users.users.borrow_mut(ctx.sender());
        existing_user.total_contributions = existing_user.total_contributions + amount;
        existing_user.num_of_successful_contributions = existing_user.num_of_successful_contributions + 1;
        existing_user.credit_score = existing_user.credit_score + 1;
    }

    public fun start_circle<T>(circle : &mut SavingCircle<T>, end_date: u64, clock: &Clock, ctx: &mut TxContext){
        assert!(circle.creator == tx_context::sender(ctx), NOT_CREATOR);
        assert!(!circle.active, CIRCLE_ACTIVE);

        circle.active = true;
        circle.start_date = clock.timestamp_ms();
        circle.end_date = end_date;
    }

    #[allow(lint(self_transfer))]
    public fun withdraw_funds<T>(circle : &mut SavingCircle<T>, clock: &Clock, ctx: &mut TxContext){
        assert!(circle.active, CIRCLE_ACTIVE);
        assert!(circle.members.contains(ctx.sender()), NOT_MEMBER);
        let num_members = table::length(&circle.members);
        let member = circle.members.borrow_mut(ctx.sender());
        assert!(member.is_paid == false, AlreadyPaid);
        assert!(member.payout_round == circle.current_round, NotPayOutTime);
        // assert!()

        let value = circle.contribution_amount * (num_members as u64);        
        let circle_balance = balance::split(&mut circle.total_funds, value);

        let payout_coin : Coin<T> = coin::from_balance(circle_balance, ctx);
        let amount = payout_coin.value();
        assert!(amount >= circle.contribution_amount * (num_members -1), NotContributionAmount);

        member.is_paid = true;
        circle.current_round = circle.current_round + 1;

        let payout_proof : PayoutProof = PayoutProof{
            id: object::new(ctx),
            circle_address: object::id_address(circle),
            payout_amount: amount,
            payout_date: clock.timestamp_ms()
        };

        
        transfer::public_transfer(payout_coin, ctx.sender());
        transfer::public_transfer(payout_proof, ctx.sender());
    }

    public fun getSavingCircle<T>(circle : SavingCircle<T>) : SavingCircle<T>{
        return circle
    }

    public fun getUser(user : User) : User{
        return user
    }


}