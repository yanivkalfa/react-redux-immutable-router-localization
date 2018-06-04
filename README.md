# react-redux-immutable-router-localization.
Is a small, simple, and production ready react-js boilerplate with localization built in.  
This boilerplate utilize: 

-	redux - for state container.
-	reselect - to easily create selectors.
-	redux-actions - to easily create actions.
-	redux-thunk - to deal with promises actions.
-	immutable js - to make sure we are not mutating states.
-	react-hot-loader - to make development easier and faster.
-	react-router - to have routes.
-	react-bootstrap - basic styling and responsiveness.
-	react-fontawesome - for nice icons.
	
Most of the packages above can be replaced or removed.

## Getting Started

### Requirments
 - Node v6.0.0 or later

## Developing on windows 
If you're developing on windows you'll probably miss several dependencies/tools that `node-sass` requires.  
An easy solution is to get windows-build-tools. Follow the steps bellow to do that.

```
1. Open powershell as administrator and run:
2. npm install -g windows-build-tools
3. wait until its done and then run:
4. npm config set msvs_version 2015 -g
```

### Install node modules at root of app
```bash
npm install
```

### Before building or running locally:
```bash
npm run extract-loc
```
Will extract all localization to a .po file that is needed for translation, that file will be found in `/languages/selected-language`   
You will need to edit that file and fill in the translation if you want to present the translated text.

### Run app locally
```bash
npm run dev
```
Will run a dev server with HMR

### Build app
```bash
npm run prod
```
Will build the project and create dist folder

### Building or Running for a specific languages
You'll have to add `cross-env LANGU=<languageKey>` to all of the commends.
e.g:

```
npm run cross-env LANGU=aust extract-loc - this will extract all the localization to a /languages/aust/aust.po file 
npm run cross-env LANGU=aust dev - will run dev server with aust localization.
npm run cross-env LANGU=aust prod - will build the project with aust localization.
```

## note
Config folder holds `languagesLocalMap` file. `languagesLocalMap` contains a map of locals to their languages and is 
required for each new language you add.  
More localization country codes can be [found here](http://www.andiamo.co.uk/resources/iso-language-codes)  
For Example for `LANGU=aust` You'll add: `{ aust: 'en-au' }`.  


## Localizing text
To localize text you can use one of the localization methods `gettext, dgettext, ngettext, dngettext, pgettext, dpgettext, npgettext, dnpgettext`  
More information about gettext api methods can be found at: [gettext api](https://github.com/alexanderwallin/node-gettext#api)

Example: 
```javascript
render() {
	const placeholder = gettext('Please enter your phone number');
	return (
		<div>
			<span>{ gettext('some text') }</span>
			<input placeholder={ placeholder } />
			<button>{ gettext('click') }</button>
		</div>
	);
}
```

You can also use the `__gtf` to replace variables
```javascript
render() {
	const placeholder = gettext('Please enter your phone number');
	return (
		<div>
			<span>{ __gtf(gettext('jeffrey has %s Groups'), user.groupCount) }</span>
		</div>
	);
}
```

almost all of the localization is done at compilation and will not result in a performance hit whatsoever,
apart from `__gtf` which does a simple replace operation on the text. 