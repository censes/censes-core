pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ticket.sol";

contract TicketTest {
  string defaultTicketName = "Ticket";
  string defaultTicketSymbol = "TICK";
  uint defaultTicketSupply = 80000;

  function initializeDefaultTicket() constant returns (Ticket) {
    return new Ticket(defaultTicketName, defaultTicketSymbol, defaultTicketSupply);
  }

  function testInitialization() {
    Ticket ticket = initializeDefaultTicket();
    Assert.equal(ticket.totalSupply(), 0, "Ticket totalSupply should be 0");
    Assert.equal(ticket.supplyCeiling(), 80000, "Ticket supplyCeiling should be 80000");
  }

  function testAddSupply() {
    Ticket ticket = initializeDefaultTicket();
    ticket.changeSupplyCeiling(100000);
    Assert.equal(ticket.totalSupply(), 0, "Ticket totalSupply should be 0");
    Assert.equal(ticket.supplyCeiling(), 100000, "Ticket supplyCeiling should be 10");
  }

  function testAddDecreaseOwnerSupply() {
    Ticket ticket = initializeDefaultTicket();
    ticket.changeSupplyCeiling(10);
    Assert.equal(ticket.totalSupply(), 0, "Ticket totalSupply should be 0");
    Assert.equal(ticket.supplyCeiling(), 10, "Ticket supplyCeiling should be 10");
  }
}
