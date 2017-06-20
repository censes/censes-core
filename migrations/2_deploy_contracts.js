var Ticket = artifacts.require("./Ticket.sol");
var TicketSale = artifacts.require("./TicketSale.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Ticket, 'An example ticket sale', 'TICKET1', 100)
  .then(() => {
    return Ticket.deployed().then(t => {
      return deployer.deploy(TicketSale, 1, t.address).then(() => {
        return TicketSale.deployed().then(s => {
          console.log('Ticket: '+ t.address)
          console.log('Ticket sale: '+ s.address)
          t.transferOwnership(s.address)
        })
      })
    })
  })
}
