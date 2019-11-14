function newConnection(callback){
  var dorita980 = require('dorita980');

  var myUsernameBlid = process.env.DORITA980_MY_USERNAME_BLID
  var myPassword = process.env.DORITA980_MY_PASSWORD
  var myRobotIP = process.env.DORITA980_ROBOT_IP
  var myRobotViaLocal = new dorita980.Local(myUsernameBlid, myPassword, myRobotIP); // robot IP address

  myRobotViaLocal.on('connect', () => callback(myRobotViaLocal));
}

const express = require('express')
const app = express()
const port = 37444

app.get('/:command', (req, res) => {
  newConnection((myRobotViaLocal)=>{
    myRobotViaLocal[req.params.command]()
      .then(() => {
        myRobotViaLocal.end()
        res.status(200).send()
      }) // disconnect to leave free the channel for the mobile app.
      .catch(console.log);
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))