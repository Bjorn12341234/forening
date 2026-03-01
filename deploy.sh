#!/bin/bash
#
# Deploy naturhansyn.se (Grav CMS) to production server
# Usage:
#   ./deploy.sh          — deploy to production
#   ./deploy.sh --dry    — dry run (shows what would change, no actual upload)
#   ./deploy.sh --revert — revert to original Sitejet site
#

set -euo pipefail

SERVER="sxesv@185.113.11.31"
REMOTE_PATH="public_html/"
LOCAL_SITE="site/"
LOCAL_SITEJET="live-site/"
SSH_CMD="ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Common rsync excludes for deploy
EXCLUDES=(
    --exclude='.git'
    --exclude='/cache/*'
    --exclude='/tmp/*'
    --exclude='/logs/*'
    --exclude='/backup/*'
    --exclude='.DS_Store'
    --exclude='*.log'
)

deploy() {
    local DRY_RUN="$1"
    local RSYNC_FLAGS="-avz --delete"

    if [ "$DRY_RUN" = "true" ]; then
        RSYNC_FLAGS="$RSYNC_FLAGS --dry-run"
        echo -e "${YELLOW}=== DRY RUN — nothing will be uploaded ===${NC}"
    fi

    echo ""
    echo -e "${GREEN}Deploying Grav site to ${SERVER}:${REMOTE_PATH}${NC}"
    echo "Source: ${LOCAL_SITE}"
    echo ""

    if [ "$DRY_RUN" = "false" ]; then
        echo -e "${YELLOW}WARNING: This will REPLACE everything in ${REMOTE_PATH} on the server.${NC}"
        echo ""
        read -p "Are you sure? (yes/no): " CONFIRM
        if [ "$CONFIRM" != "yes" ]; then
            echo "Aborted."
            exit 0
        fi
        echo ""

        # Clean public_html before deploy to remove old Sitejet files
        echo "Cleaning remote ${REMOTE_PATH}..."
        $SSH_CMD "$SERVER" "rm -rf ${REMOTE_PATH}* ${REMOTE_PATH}.htaccess"
        echo "Clean done."
        echo ""
    fi

    rsync $RSYNC_FLAGS -e "$SSH_CMD" "${EXCLUDES[@]}" "$LOCAL_SITE" "${SERVER}:${REMOTE_PATH}"

    if [ "$DRY_RUN" = "true" ]; then
        echo ""
        echo -e "${YELLOW}Dry run complete. No files were changed on the server.${NC}"
        echo "Run without --dry to actually deploy."
    else
        echo ""
        echo -e "${GREEN}Deploy complete!${NC}"
        echo ""
        echo "Post-deploy checklist:"
        echo "  1. Visit https://naturhansyn.se — does it load?"
        echo "  2. Visit https://naturhansyn.se/admin — can you log in?"
        echo "  3. Test the contact form"
        echo "  4. Check Three.js aurora on the homepage"
        echo "  5. Test on mobile"
        echo ""
        echo -e "If something is wrong, run: ${YELLOW}./deploy.sh --revert${NC}"
    fi
}

revert() {
    echo -e "${RED}=== REVERT TO ORIGINAL SITEJET SITE ===${NC}"
    echo ""
    echo "This will restore the site to the original Sitejet version"
    echo "from the live-site/ directory."
    echo ""
    echo -e "${YELLOW}WARNING: This will REPLACE the current server content with the Sitejet snapshot.${NC}"
    echo ""
    read -p "Are you sure you want to revert? (yes/no): " CONFIRM
    if [ "$CONFIRM" != "yes" ]; then
        echo "Aborted."
        exit 0
    fi

    echo ""
    echo "Reverting..."
    rsync -avz --delete -e "$SSH_CMD" "$LOCAL_SITEJET" "${SERVER}:${REMOTE_PATH}"

    echo ""
    echo -e "${GREEN}Revert complete. The Sitejet site is restored.${NC}"
    echo "Visit https://naturhansyn.se to verify."
}

# Pre-flight checks
if [ ! -d "$LOCAL_SITE" ]; then
    echo -e "${RED}Error: ${LOCAL_SITE} directory not found.${NC}"
    echo "Run this script from the project root (forening/)."
    exit 1
fi

if [ ! -d "$LOCAL_SITEJET" ]; then
    echo -e "${RED}Error: ${LOCAL_SITEJET} directory not found.${NC}"
    echo "The Sitejet backup is missing. DO NOT deploy without a revert option."
    exit 1
fi

# Parse arguments
case "${1:-}" in
    --dry)
        deploy "true"
        ;;
    --revert)
        revert
        ;;
    "")
        deploy "false"
        ;;
    *)
        echo "Usage: ./deploy.sh [--dry|--revert]"
        echo ""
        echo "  (no args)  Deploy Grav site to production"
        echo "  --dry      Dry run (preview changes, upload nothing)"
        echo "  --revert   Revert to original Sitejet site"
        exit 1
        ;;
esac
