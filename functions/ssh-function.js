require('dotenv').config();
//
const Client = require('ssh2').Client;
const ssh = new Client();
const sshSettings = {
  host: process.env.HOST,
  port: process.env.CONNPORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};
const sshConnection = (cmd) => {
  return new Promise((resolve, reject) => {
    ssh.on('ready', () => {
      // console.log('Client :: ready');
      ssh.exec(cmd, (err, stream) => {
        if (err) reject (err);
        stream.on('close', (code, signal) => {
          // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          ssh.end();
        }).on('data', (data) => {
          // console.log('STDOUT: ' + data);
          resolve (data);
        }).stderr.on('data', (data) => {
          // console.log('STDERR: ' + data);
          reject (data);
        });
      });
    }).connect(sshSettings);
  });
};
//
module.exports = sshConnection;