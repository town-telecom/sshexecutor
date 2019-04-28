const express = require('express');
const router = express.Router();
const sshConnection = require('../functions/ssh-function');
const execRemoteCommand = async (cmd, res) => {
  await sshConnection(cmd)
  .then(output => {
    let result = output;
    res.send(result.toString('utf-8'));
  })
  .catch(err => {
    console.log(err);
  })
};

/* GET API Command Page. */
router.get('/:command', (req, res, next) => {
  let cmd = req.params.command;
  console.log(cmd);
  execRemoteCommand(cmd, res);
});

module.exports = router;