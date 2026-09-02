#!/usr/bin/env bash
# Step-by-step commits for the portfolio redesign.
# Run from repo root: bash scripts/commit-step-by-step.sh

set -euo pipefail

if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git status --porcelain)" ]; then
  :
else
  echo "Nothing to commit."
  exit 0
fi

commit_if_staged() {
  local message="$1"
  if git diff --cached --quiet; then
    echo "Skipping empty commit: $message"
    return 0
  fi
  git commit -m "$message"
  echo "✓ $message"
}

echo "Creating step-by-step commits..."

# 1) Tooling
git add \
  package.json \
  package-lock.json \
  vite.config.ts \
  tsconfig.json \
  tsconfig.node.json \
  tailwind.config.js \
  postcss.config.js \
  components.json \
  src/ \
  components/ \
  lib/

commit_if_staged "$(cat <<'EOF'
chore: add Vite, React, Tailwind, and shadcn UI toolchain.

Set up the build tooling and React island used for hero social icons.
EOF
)"

# 2) Hero role text
git add public/js/typewriter.js

commit_if_staged "$(cat <<'EOF'
feat: update hero role rotator titles.

Rotate Full Stack Developer, Software Developer, and Aspiring SDE.
EOF
)"

# 3) Navbar behavior
git add public/js/nav.js

commit_if_staged "$(cat <<'EOF'
feat: add sliding navbar indicator and improved mobile menu.

Highlight active sections on scroll and move the hover pill between links.
EOF
)"

# 4) Project screenshots
git add \
  assets/projects/learning-tracker.png \
  assets/projects/food-app.png \
  assets/projects/portfolio.png

commit_if_staged "$(cat <<'EOF'
feat: add real project preview screenshots.

Replace placeholder SVG previews with actual project screenshots.
EOF
)"

# 5) Project skill icons script
git add public/js/project-skills.js

commit_if_staged "$(cat <<'EOF'
feat: add tech icons for project skill tags.

Inject small branded icons into each Built with tag on project cards.
EOF
)"

# 6) Main layout + styles + markup
git add index.html css/style.css

commit_if_staged "$(cat <<'EOF'
feat: redesign portfolio layout, hero, skills, and projects sections.

Rebuild the page with a new hero layout, ordered skill icons, project cards,
tech stack tags, and updated section spacing and styling.
EOF
)"

# 7) Anything left (optional SVG placeholders, etc.)
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  commit_if_staged "$(cat <<'EOF'
chore: add remaining portfolio asset and config files.
EOF
)"
fi

echo ""
echo "Done. Recent commits:"
git log --oneline -7
