#!/bin/bash
# TKJerseys — dagelijkse inventory update
# Cron: 0 7 * * * /Users/ragatoyan/.openclaw/workspace/tkjerseys/scripts/run-daily.sh

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

LOG_DIR="/Users/ragatoyan/.openclaw/workspace/tkjerseys/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/scrape-$(date +%Y-%m-%d).log"

echo "=== TKJerseys scrape gestart: $(date) ===" >> "$LOG_FILE"

cd /Users/ragatoyan/.openclaw/workspace/tkjerseys

node scripts/scrape-yupoo.mjs >> "$LOG_FILE" 2>&1
EXIT_CODE=$?

echo "=== Klaar: $(date) | exit code: $EXIT_CODE ===" >> "$LOG_FILE"

if [ $EXIT_CODE -eq 0 ]; then
  echo "📦 Pushen naar GitHub..." >> "$LOG_FILE"

  # Token stored in .github-token (not in git)
  TOKEN_FILE="/Users/ragatoyan/.openclaw/workspace/tkjerseys/.github-token"
  if [ -f "$TOKEN_FILE" ]; then
    GH_TOKEN=$(cat "$TOKEN_FILE" | tr -d '[:space:]')
    PUSH_URL="https://${GH_TOKEN}@github.com/ragatoyan/tkjerseys.git"
  else
    PUSH_URL="origin"
  fi

  git add data/inventory.json >> "$LOG_FILE" 2>&1
  git commit -m "chore: inventory update $(date +%Y-%m-%d)" >> "$LOG_FILE" 2>&1
  git push "$PUSH_URL" main >> "$LOG_FILE" 2>&1

  if [ $? -eq 0 ]; then
    echo "✅ GitHub push geslaagd — Vercel deploy gestart" >> "$LOG_FILE"
  else
    echo "⚠️ GitHub push mislukt" >> "$LOG_FILE"
  fi
fi

# Bewaar alleen laatste 14 dagen logs
find "$LOG_DIR" -name "scrape-*.log" -mtime +14 -delete

exit $EXIT_CODE
