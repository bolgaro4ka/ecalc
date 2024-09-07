const { app,  Menu, BrowserWindow, ipcMain, nativeTheme} = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    resizable: false,
    
    
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Важно для использования require в renderer
      enableRemoteModule: true,  // Важно для использования require в renderer
    },
  })

  win.loadFile('views/index.html')

  if (nativeTheme.themeSource === 'dark') {
    win.webContents.send('set-theme', 'dark')
  } else {
    win.webContents.send('set-theme', 'light')
  }
  const menuTemplate = [
    {
      label: 'ECalc',
      submenu: [
        { role: 'quit', label: 'Выход' },
      ],
    },
    {
      label: 'Правка',
      submenu: [
        { role: 'undo', label: 'Отменить' },
        { type: 'separator' },
        { role: 'cut', label: 'Вырезать' },
        { role: 'copy', label: 'Копировать' },
        { role: 'paste', label: 'Вставить' },
      ],
    },
    
    {
      label: 'Тема',
      submenu: [
        {
          label: 'Светлая',
          click: () => {
            win.webContents.send('set-theme', 'light')
          },
        },
        {
          label: 'Темная',
          click: () => {
            win.webContents.send('set-theme', 'dark')
          },
        },
        { type: 'separator' },
        {
          label: 'Красная',
          click: () => {
            win.webContents.send('set-theme', 'red')
          },
        },
        {
          label: 'Зеленая',
          click: () => {
            win.webContents.send('set-theme', 'green')
          },
        },
        {
          label: 'Синяя',
          click: () => {
            win.webContents.send('set-theme', 'blue')
          },
        },
        {
          label: 'Фиолетовая',
          click: () => {
            win.webContents.send('set-theme', 'purple')
          },
        },
        {
          label: 'Оранжевая (по умолчанию)',
          click: () => {
            win.webContents.send('set-theme', 'orange')
          },
        },
      ],
    },
    {
      label: 'Горячие клавиши',
      click: () => {
        createShortcutsWindow();
      },
    },
    {
      label: 'О программе',
      click: () => {
        createAboutWindow();
      }
    },
    {
      label: 'Для разработчиков',
      submenu: [
        { role: 'toggleDevTools', label: 'Открыть/Закрыть отладчик' },
      ],
    },
  ];

  // Создание меню из шаблона
  const menu = Menu.buildFromTemplate(menuTemplate);

  // Установка меню для приложения
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle('mode:light', () => {
  nativeTheme.themeSource = 'light'
})

ipcMain.handle('mode:dark', () => {
  nativeTheme.themeSource = 'dark'
})



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });





  function createShortcutsWindow() {
    const shortcutsWin = new BrowserWindow({
      width: 400,
      height: 800,
      resizable: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    });
  
    shortcutsWin.loadFile('views/shortcuts.html');
  }

  function createAboutWindow() {
    const aboutWin = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    });
  
    aboutWin.loadFile('views/dev.html');
  }