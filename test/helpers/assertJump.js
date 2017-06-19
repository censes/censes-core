module.exports = function(error, message = 'Invalid JUMP error must be returned') {
  assert.isAbove(error.message.search('invalid JUMP'), -1, message);
}
