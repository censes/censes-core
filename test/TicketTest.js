const assertJump = require('./helpers/assertJump');
const assertOpcode = require('./helpers/assertOpcode');

var Ticket = artifacts.require('./Ticket.sol')

contract('Ticket', function(accounts) {
  beforeEach(async () => {
    ticket = await Ticket.new('Ticket', 'TICK', 80000);
  })

  describe('.supplyCeiling()', function () {
    it('should have supply ceiling and no total supply', async () => {
      assert.equal(await ticket.totalSupply(), 0, 'ticket totalSupply should be 0')
      assert.equal(await ticket.supplyCeiling(), 80000, 'ticket supplyCeiling should be 80000')
    })

    it('should increase supply ceiling', async () => {
      currentCeiling = await ticket.supplyCeiling()
      assert.equal(currentCeiling, 80000, 'supplyCeiling should be 80000')
      await ticket.changeSupplyCeiling(currentCeiling + 5000)
      assert.equal(await ticket.supplyCeiling(), currentCeiling + 5000, 'supplyCeiling should be 85000')
    })

    it('should decrease supply ceiling if not used', async () => {
      currentCeiling = await ticket.supplyCeiling()
      await ticket.generateTickets(accounts[1], currentCeiling)

      try {
        await ticket.changeSupplyCeiling(1000, {from: accounts[1]})
      } catch(e) {
        assertOpcode(e, 'should throw error when changing supply')
      }
    })

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
