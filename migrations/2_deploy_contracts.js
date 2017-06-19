var Ticket = artifacts.require("./Ticket.sol");
var TicketSale = artifacts.require("./TicketSale.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Ticket, 'An example ticket sale', 'TICKET1', 100)
  .then(() => {
    Ticket.deployed().then(t => {
      deployer.deploy(TicketSale, 1, t.address).then(() => {
        TicketSale.deployed().then(s => {
          console.log('Ticket: '+ t.address)
          console.log('Ticket sale: '+ s.address)
        })
      })
    })
  })
}
