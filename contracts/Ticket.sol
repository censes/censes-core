pragma solidity ^0.4.11;

import "zeppelin/ownership/Ownable.sol";
import "zeppelin/token/StandardToken.sol";
import "zeppelin/SafeMath.sol";

contract Ticket is Ownable, StandardToken {
    using SafeMath for uint;

    string public version = 'dev-0.1';

    string public name;
    string public symbol;
    uint public supplyCeiling;

    uint public totalSupply = 0;
    uint public decimals = 0;

    function Ticket(
      string _tokenName,
      string _tokenSymbol,
      uint _supplyCeiling
    )  {
        supplyCeiling = _supplyCeiling;
        name = _tokenName;
        symbol = _tokenSymbol;
    }

    function changeSupplyCeiling(uint _newCeiling) onlyOwner {
      if (_newCeiling < totalSupply) throw;
      supplyCeiling = _newCeiling;
    }

    function generateTickets(address _receiver, uint _value) onlyOwner {
      balances[_receiver] = balances[_receiver].add(_value);
    }
}
