#!/bin/bash
sed -i '' 's/animation: throw-arc 0.4s forwards;/animation: throw-arc 1.2s forwards;/g' src/App.css
sed -i '' 's/animation: spin 0.4s linear forwards;/animation: spin 1.2s linear forwards;/g' src/App.css
sed -i '' 's/animation: shadow-arc 0.4s forwards;/animation: shadow-arc 1.2s forwards;/g' src/App.css
sed -i '' 's/animation: pokeball-trail-modern 0.4s forwards;/animation: pokeball-trail-modern 1.2s forwards;/g' src/App.css
