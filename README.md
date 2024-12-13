1. Download the project from GitHub:<br> https://github.com/marysia-tanska/p5-local-deploy <br><br>
2. Install VSCode and open the project:<br>https://code.visualstudio.com/ <br><br>
3. Install nvm: <br>
https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/<br><br>
4. Go to the terminal and use nvm to install Node.js:<br><br>
https://www.linode.com/docs/guides/how-to-install-use-node-version-manager-nvm/#use-nvm-to-install-node<br><br>
5. In the terminal, go to {YOUR_PROJECT_PATH}, for example:<br>
```cd C:\coding_projects\personal_website```<br><br>
6. Install Browser Sync (a package that watches changes in your file and ```npm install -g browser-sync ```<br><br>
7. Copy the ```watcher.js``` file to ```{YOUR_PROJECT_PATH}/dev_files```<br><br>

8. From the terminal, run:<br>
```node ./dev-files/watcher.js```<br><br>

9. Now, replace the ```star_sketch.js``` and ```star.js``` files with your JS files, and adapt paths in ```index.htm```. Upload any additional files if needed. Adapt ```index.js``` and ```styles.css``` as you like. Use relative paths. For example for ```{YOUR_PROJECT_PATH}\images\image01.jpg```, a relative path would be ```.\images\image01.jpg```.<br><br>
10. 

10. If you want to, you can connect your project to GitHub, and/or deploy it using Netlify. Netlify provides clear instructions for GitHub integration.<br>https://www.netlify.com/<br><br>
**NOTE: To publish on Netlify from GitHub, your project should be on GitHub.com, NOT git.arts.ac.uk!**