set -Eeuo pipefail

trap 'printf "\nERROR: Setup failed at line %s.\n" "$LINENO" >&2' ERR

NVM_VERSION="v0.40.3"
NODE_VERSION="24"
PNPM_VERSION="10.28.0"
NVM_DIR="$HOME/.nvm"
BASHRC_LOCAL="$HOME/.bashrc.local"

printf "\n[1/5] Installing NVM %s...\n" "$NVM_VERSION"

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    PROFILE=/dev/null curl -fsSL \
        "https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh" |
        PROFILE=/dev/null bash
else
    printf "NVM is already installed at %s.\n" "$NVM_DIR"
fi

printf "\n[2/5] Loading NVM...\n"

unset NPM_CONFIG_PREFIX
export NVM_DIR
. "$NVM_DIR/nvm.sh"

printf "\n[3/5] Installing Node.js %s...\n" "$NODE_VERSION"

nvm install "$NODE_VERSION"
nvm use "$NODE_VERSION"
nvm alias default "$NODE_VERSION"

printf "\n[4/5] Installing pnpm %s...\n" "$PNPM_VERSION"

npm install --global "pnpm@$PNPM_VERSION"

printf "\n[5/5] Configuring future terminal sessions...\n"

touch "$BASHRC_LOCAL"

if ! grep -q '# storefront-next-nvm:start' "$BASHRC_LOCAL"; then
    cat >> "$BASHRC_LOCAL" <<'PROFILE'

# storefront-next-nvm:start
export NVM_DIR="$HOME/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
    unset NPM_CONFIG_PREFIX
    . "$NVM_DIR/nvm.sh"
    nvm use --silent default
fi

if [ -s "$NVM_DIR/bash_completion" ]; then
    . "$NVM_DIR/bash_completion"
fi
# storefront-next-nvm:end
PROFILE
    printf "Added NVM initialization to %s.\n" "$BASHRC_LOCAL"
else
    printf "NVM initialization already exists in %s.\n" "$BASHRC_LOCAL"
fi

# Confirm that the saved profile can be loaded.
. "$BASHRC_LOCAL"

printf "\nSetup complete.\n"
printf "Node:  %s\n" "$(node --version)"
printf "npm:   %s\n" "$(npm --version)"
printf "pnpm:  %s\n" "$(pnpm --version)"
printf "node:  %s\n" "$(command -v node)"
printf "pnpm:  %s\n" "$(command -v pnpm)"