const { app, Menu, Tray } = require('electron');
const { menubar } = require('menubar');

const path = require('path');
const iconPath = path.join(__dirname, './', 'donut.png');


const axios = require('axios')

function apiCall(endpoint, item) {
  axios.get('http://localhost:37444/' + endpoint)
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
    })
    .catch((error) => {
      console.error(error)
    })
}


const { exec } = require('child_process');

app.on('ready', () => {
  const expressServer = exec('node vacuumBar.js')
  const tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'VacuumBar v1.0', type: 'normal' },
    { type:'separator'},
    { label: 'Start', type: 'normal', click: ()=> apiCall('start', 4, tray) },
    { label: 'Dock', type: 'normal', click: ()=> apiCall('dock', 1, tray) },
    { label: 'Resume', type: 'normal', click: ()=> apiCall('resume', 2, tray) },
    { label: 'Stop', type: 'normal', click: ()=> apiCall('stop', 3, tray) },
    { type:'separator'},
    { label: 'Quit App', type: 'normal', click: ()=> app.quit() }
  ])

  tray.setContextMenu(contextMenu);

  const mb = menubar({
    tray
  });

});