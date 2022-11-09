import { BrowserWindow, BrowserWindowConstructorOptions, Menu, MenuItemConstructorOptions, Tray } from "electron";
import { resolve } from 'path';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


class MainWindow {

    private _instance: BrowserWindow;
    private _menu: Menu;
    private _tray: Tray;
    private _icon = resolve(__dirname, "main_window", "icon.ico");
    private _smallIcon = resolve(__dirname, "main_window", "small-icon.png");

    private _createMenu() {

        this._tray = new Tray(this._icon);

        const template: (Electron.MenuItem | MenuItemConstructorOptions)[] = [
            {
                icon: this._smallIcon,
                label: 'logo here',
                enabled: true
            },
            { type: 'separator' },
            {
                label: 'Show / Hide',
                click: () => {
                    if (this._instance.isVisible()) {
                        this.hide();
                    } else {
                        this.show();
                    }
                }
            },
            {
                label: 'Open debugger',
                click: () => this.openDebugger(),
            },
            { type: 'separator' },
            { role: 'quit' }
        ];
        this._menu = Menu.buildFromTemplate(template);
        this._tray.setContextMenu(this._menu);
    }

    open() {

        const options: BrowserWindowConstructorOptions = {
            height: 720,
            width: 1024,
            webPreferences: {
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
            icon: this._icon
        };

        this._instance = new BrowserWindow(options);

        this._instance.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        this._createMenu();
    }

    openDebugger() {
        this._instance.webContents.openDevTools();
    }

    hide() {
        this._instance.hide();
    }

    show() {
        this._instance.show();
    }

}

export const mainWindow = new MainWindow();