const electron=require('electron');
const url=require('url');
const path=require('path');

const{app,BrowserWindow,Menu,ipcMain,dialog}=electron;

let mainWindow;

app.on('ready',function(){
	const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
	mainWindow=new BrowserWindow({width, height}),
	mainWindow.loadURL(url.format({
	pathname:path.join(__dirname,'index.html'),
	protocol:'file:',
	slashes:true
	}));
	const mainMenu=Menu.buildFromTemplate(mainMenuTemplate); //Build Menu from Template
	Menu.setApplicationMenu(mainMenu);  //Insert Menu
});

const mainMenuTemplate=[
	//1st menuitem
	{
		label : 'File',
		submenu : [
			{
				label: 'New File',
				submenu : [
					{
						label : 'Coding Area',
						submenu : [
							{
								label : 'HTML',
								click(){
									mainWindow.webContents.send('newFile', 'html');
								}
							},
							{
								label : 'C++',
								click(){
									mainWindow.webContents.send('newFile', 'cpp');
								}
							},
							{
								label : 'Java',
								click(){
									mainWindow.webContents.send('newFile', 'java');
								}
							},
						]
					},
					{
						label : 'Normal Text Area',
					},
				]
			},
			{
				label : 'Open File',
				click(){
					dialog.showOpenDialog("Open",{properties:[
						'openFile','openDirectory','multiSelections'
					]})
				}
			},
			{
				label : 'Save',
				click(){
					 mainWindow.webContents.send('saveFile', '');
				}
			},
			{
				label : 'Quit',
				accelerator : 'ctrl+Q',
				click(){
					app.quit();
				}
			}
		]
	},
	//2nd menuitem
	{
		label : 'Edit',
		submenu : [
			{role: 'undo'},
			{role: 'redo'},
			{type: 'separator'},
			{role: 'cut'},
			{role: 'copy'},
			{role: 'paste'},
			{role: 'delete'},
			{role: 'selectall'},
		]
	},
	//3rd menuitem
	{
		label: 'View',
		submenu: [
			{role: 'reload'},
			{role: 'forcereload'},
			{role: 'toggledevtools'},
			{type: 'separator'},
			{role: 'resetzoom'},
			{role: 'zoomin'},
			{role: 'zoomout'},
			{type: 'separator'},
			{role: 'togglefullscreen'},
		]
	},
	//4th menuitem
	{
		label : 'Search',
	},
	//5th menuitem
	{
		label : 'Setting',
	},
	//6th menuitem
	{
		label : 'Window',
		submenu : [
			{role : 'minimize',},
			{role : 'close',},
		]
	},
	//7th menuitem
	{
		role: 'help',
		submenu: [
		  {
			label: 'Learn More',
			click () {electron.shell.openExternal('www.techworkweb.wordpress.com')}
		  }
		]
	}
]

if(process.platform=="darwin"){
	mainMenuTemplate.unshift({
		label: app.getName(),
		submenu: [
		  {role: 'about'},
		  {type: 'separator'},
		  {role: 'services', submenu: []},
		  {type: 'separator'},
		  {role: 'hide'},
		  {role: 'hideothers'},
		  {role: 'unhide'},
		  {type: 'separator'},
		  {role: 'quit'}
		]
	}); //if its mac than add a empty menu item because in mac 1st menuitem is electron
}
