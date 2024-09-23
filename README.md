# Go Play Syntax
Golang Play with Syntax highlighting

[When people require add color syntax for Go Playground](https://groups.google.com/g/golang-nuts/c/hJHCAaiL0so/m/WLKD3zcVvfoJ)

Rob Pike (Golang Author) [say](https://groups.google.com/g/golang-nuts/c/hJHCAaiL0so/m/kG3BHV6QFfIJ) 
> Syntax highlighting is juvenile. When I was a child, I was taught arithmetic using colored rods.
> I grew up and today I use monochromatic numerals.

Rob Pike is a respectable guy, i Love him, don't yell at him. I think what he means is that not using syntax highlighting will make it easier to remember the syntax when learning Go

But some people still like Syntax highlighting. So i make this code for you. 

This UserScript add Syntax Color to go.dev/play and go.dev/tour

## Useage
- Install [TamperMoney extension](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) for add custom js to website you want
- Copy my script in UserScript.js and add to TamperMoney

When you access go.dev/play and go.dev/tour my script will run, it will replace default editor of Golang to ace editor with syntax highlight

Go site have set Content Security Policy so it can't load external script , but my script need load ace editor from cdn
You need disable Content Security Policy in Go site, in chrome you can install [Disable Content-Security-Policy extension](https://chromewebstore.google.com/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden)

