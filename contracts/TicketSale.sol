pragma solidity ^0.4.11;

import "./Ticket.sol";

contract TicketSale is Ownable {

  uint public price = 0;
  Ticket public ticketToken;

  function TicketSale(uint _price, address _ticketToken) {
    ticketToken = Ticket(_ticketToken);
    price = _price;
  }

  function () payable only_exact_amount {
    createTickets(msg.sender, ticketsFor(msg.value));
  }

  function ticketsFor(uint _value) returns (uint) {
    return _value / price;
  }

  function priceFor(uint _tickets) returns (uint) {
    return _tickets * price;
  }

  function changePrice(uint _newPrice) onlyOwner {
    price = _newPrice;
  }

  function giveTickets(address _to, uint _tickets) onlyOwner {
    createTickets(_to, _tickets);
  }

  function createTickets(address _to, uint _tickets) internal {
    ticketToken.generateTickets(address(this), _tickets);
    ticketToken.transfer(_to, _tickets);
  }

  modifier only_exact_amount() {
    require(priceFor(ticketsFor(msg.value)) == msg.value);
    _;
  }

}
