themes = [
    {
        name: "light",
        ctext: 'black',
        cback: '#c9c9c9',
        cbackh: '#dadbdb',
    },
    {
        name: "dark",
        ctext: 'white',
        cback: '#363636',
        cbackh: '#252424',
    },
    {
        name: "red",
        cac: 'red',
        csc: 'rgba(255, 0, 0, 0.3)',
    },
    {
        name: "green",
        cac: 'green',
        csc: 'rgba(0, 255, 0, 0.3)',
    },
    {
        name: "blue",
        cac: 'blue',
        csc: 'rgba(0, 0, 255, 0.3)',
    },
    {
        name: "purple",
        cac: 'purple',
        csc: 'rgba(128, 0, 128, 0.3)',
    },
    {
        name: "orange",
        cac: 'rgb(255, 174, 0)',
        csc: 'rgba(255, 174, 0, 0.3)',
    },
]



const root = document.documentElement.style;


ipcRenderer.on('set-theme', (event, theme) => {
    if (theme === 'light') {
      root.setProperty('--current-text-color', themes[0].ctext);
      root.setProperty('--current-bg-color', themes[0].cback);
      root.setProperty('--current-bg-history-color', themes[0].cbackh);
      ipcRenderer.invoke('mode:light')
    } else if (theme === 'dark') {
      root.setProperty('--current-text-color', themes[1].ctext);
      root.setProperty('--current-bg-color', themes[1].cback);
      root.setProperty('--current-bg-history-color', themes[1].cbackh);
      ipcRenderer.invoke('mode:dark')
    } else if (theme === 'red') {
      root.setProperty('--current-accent-color', themes[2].cac);
      root.setProperty('--current-selected-color', themes[2].csc);
    } else if (theme === 'green') { 
      root.setProperty('--current-accent-color', themes[3].cac);
      root.setProperty('--current-selected-color', themes[3].csc);
    } else if (theme === 'blue') {  
      root.setProperty('--current-accent-color', themes[4].cac);
      root.setProperty('--current-selected-color', themes[4].csc);
    } else if (theme === 'purple') {
      root.setProperty('--current-accent-color', themes[5].cac);
      root.setProperty('--current-selected-color', themes[5].csc);
    } else if (theme === 'orange') {
      root.setProperty('--current-accent-color', themes[6].cac);
      root.setProperty('--current-selected-color', themes[6].csc);
    }
    
  });