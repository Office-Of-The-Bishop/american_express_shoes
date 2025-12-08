#!/bin/bash

# ==== COLORS ====
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
BLUE="\e[34m"
RESET="\46m"
# RESET="\e[0m"

# ==== CONFIG ====
REMOTE_HOST="boxbreakerglobal"   # SSH alias from ~/.ssh/config
REMOTE_PATH="/home/q37nr4szx78z/public_html/americanshoeexpress.com/app/public/"  # full path to your Node.js project

echo -e "${BLUE}🚀 Starting Node.js Deployment...${RESET}"

ssh -T $REMOTE_HOST "TERM=xterm bash -s" << 'EOF'
set -e  # Exit immediately if any command fails

# Remote colors
GREEN="\e[32m"
YELLOW="\e[33m"
BLUE="\e[34m"
RED="\e[31m"
RESET="\e[0m"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node 22

nvm use 22

cd /home/q37nr4szx78z/public_html/americanshoeexpress.com/app/public/ || exit 1

echo -e "${BLUE}📤 Pulling latest code from Git...${RESET}"
git fetch origin main || { echo -e "${RED}❌ git fetch failed ${RESET}"; exit 1; }
git reset --hard origin/main || { echo -e "${RED}❌ git reset failed ${RESET}"; exit 1; }

# Restore server-specific files/directories that should not be overwritten
git checkout HEAD -- api .htaccess 2>/dev/null || true
echo -e "${YELLOW}⚡ Preserved api/ directory and .htaccess ${RESET}"

# Install dependencies
echo -e "${BLUE}📦 Installing npm packages..."
npm install --silent

# Build project
echo -e "${BLUE}🏗 Running build... ${RESET}"
npm run build

# Copy dist content to parent directory
if [ -d dist ]; then
    echo -e "${BLUE}📂 Copying dist/ to ../ ${RESET}"
    cp -r ./dist/* ../
else
    echo -e "${YELLOW}⚠️ dist/ directory not found, skipping copy ${RESET}"
fi

echo -e "${GREEN}✅ Deployment steps completed successfully.${RESET}"
EOF

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ ERROR: Deployment failed.${RESET}"
  exit 1
fi

echo -e "${GREEN}✔ Deployment finished successfully!${RESET}"
