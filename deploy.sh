#!/bin/bash
cd /home/ubuntu/git/slid-todo
git pull origin main
sudo npm install
sudo npm run build
pm2 restart slid-todo