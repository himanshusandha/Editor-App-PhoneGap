const electron=require('electron');
const url=require('url');
const path=require('path');

const{app,BrowserWindow,Menu}=electron;

let mainWindow;

app.on('ready',function(){
	mainWindow=new BrowserWindow({}),
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
			},
			{
				label : 'Open File',

			},
			{
				label : 'Save',
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
			{
				role : 'cut',
			},
			{
				role : 'copy',
			},
			{
				role : 'paste',
			},
		]
	},
	{
		label : 'Search',
	},
	{
		label : 'Setting',
	},
	{
		label : 'Developer tools',
		submenu : [
			{
				role : 'reload',
			},
		]
	},
]

if(process.platform=="darwin"){
	mainMenuTemplate.unshift({}); //if its mac than add a empty menu item because in mac 1st menuitem is electron
}
