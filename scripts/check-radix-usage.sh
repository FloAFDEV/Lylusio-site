#!/bin/bash

echo "Checking Radix UI package usage..."
echo ""

packages="accordion alert-dialog aspect-ratio avatar checkbox collapsible context-menu dialog dropdown-menu hover-card label menubar navigation-menu popover progress radio-group scroll-area select separator slider switch tabs toast toggle toggle-group tooltip"

for pkg in $packages; do
  count=$(find components app src -name "*.tsx" -o -name "*.ts" 2>/dev/null | xargs grep -l "@radix-ui/react-$pkg" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$count" -eq 0 ]; then
    echo "❌ $pkg: UNUSED"
  else
    echo "✓ $pkg: $count files"
  fi
done
