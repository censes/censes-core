const assertJump = require('./helpers/assertJump');
const assertOpcode = require('./helpers/assertOpcode');

var Ticket = artifacts.require('./Ticket.sol')

contract('Ticket', function(accounts) {
  beforeEach(async () => {
    ticket = await Ticket.new('Ticket', 'TICK', 80000);
    now = web3.eth.getBlock(web3.eth.blockNumber).timestamp;
  })

  describe('.supplyCeiling()', function () {
    it('should not change supply ceiling being owner', async () => {
      try {
        await ticket.changeSupplyCeiling(1000, {from: accounts[1]})
      } catch(e) {
        assertOpcode(e, 'should throw error when changing supply')
      }

      assert.equal(await ticket.totalSupply(), 0, 'ticket totalSupply should be 0')
      assert.equal(await ticket.supplyCeiling(), 80000, 'ticket supplyCeiling should be 80000')
    })
  })
})
