Bt901jlv#@@
vadikjelvix11

mpodesto7@gmal.com \ P333map!

# Instructions for basic deploying to server

Deploy settings
- to bluehost
 key password: 123Apple//
 host: root@108.179.218.140

## 1) Build project locally on your pc
  - open your terminal in project folder, and write command:
    npm run build
  - after that you need to copy 'cert' folder and paste to your build folder 'dist'

## 2) Open ssh connection with your server
  - Write following command in terminal :
    ssh -i ~/keys/id_rsa.pem root@108.179.218.140
    cd /home/jgaockmy/www/fmp_front
    rm -rf dist

## 3) send files to server
  - open terminal and write:
    scp -i ~/keys/id_rsa.pem -r <relative path dist folder> root@108.179.218.140:/home/jgaockmy/www/fmp_front

## 4) deploy process:
 - go to your server , where you have removed dist and write following:
   pm2 restart 0 or pm2 start dist/server.js


 calendly settings:

 endpoint: /calendly/create
 description: Need to create weebhook subscription in calendly integration.

 gettings hooks: https://calendly.com/api/v1/hooks
 create webhook:
 https://calendly.com/api/v1/hooks?
     events[]=invitee.created&
     events[]=invitee.canceled&
     url=${http://jga.ock.mybluehost.me || 'Domain name'}/calendly/create
     
# IMPORTANT
  Before starting the build project, you need to remove node_modules folder and run npm install. 
  Before building the project, check please versions of modules in package.json file. They need to be the same as listed