import { app, BrowserWindow } from "electron";
// import Context from './my-react-app/src/contexts/Context'

const createWindow = () => {

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },

    });

    
    win.loadURL('http://localhost:5173/')

}

app.whenReady().then( () => {
    createWindow()
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
  
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });