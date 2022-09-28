import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

    let owner: Principal = Principal.fromText("2njwh-ipkxq-3zj74-iyo47-q2b5f-dfe55-6mxwt-kda5g-vg7zw-nzv4l-vae");
    let totalSupply: Nat = 1000000000;
    let symbol: Text = " TNK870";

    stable var balanceEntries: [(Principal, Nat)] = [];
    
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal): async Nat {

        let balance: Nat = switch(balances.get(who)){
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol(): async Text{
        return symbol;
    };

    public shared(msg) func payOut(): async Text{
        Debug.print(debug_show(msg.caller));

        if(balances.get(msg.caller) == null){
            var amount = 10000;
            // balances.put(msg.caller, amount);
            let result = await transfer(msg.caller, amount);
            return result;
        }else{
            return "Already Claimed";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text{
        var fromBalance = await balanceOf(msg.caller);

        if(fromBalance > amount){
            let newfromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller, newfromBalance);

            let toBalance = await balanceOf(to);
            let newtoBalance = toBalance + amount;
            balances.put(to, newtoBalance);

            return "Success";
        }else{
            return "Insufficient Funds";
        };
    };

    system func preupgrade(){

    };

    system func postupgrade(){

    };

}