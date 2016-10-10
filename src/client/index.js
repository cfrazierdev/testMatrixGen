const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 700,
    minHeight: 543,
    webPreferences: { webSecurity: false }
  });

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
