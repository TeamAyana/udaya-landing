const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Load language rules
const rulesPath = path.join(__dirname, '../content/policies/language.json');
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

// Find all source files
const files = glob.sync('src/**/*.{tsx,ts}', {
  cwd: path.join(__dirname, '../'),
  ignore: ['**/node_modules/**', '**/*.test.*']
});

let hasErrors = false;
let hasWarnings = false;
const results = [];

files.forEach(filePath => {
  const fullPath = path.join(__dirname, '../', filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip import statements and comments
    if (line.trim().startsWith('import') ||
        line.trim().startsWith('//') ||
        line.trim().startsWith('/*')) {
      return;
    }

    // Check for disallowed terms
    rules.disallowed.forEach(rule => {
      const regex = new RegExp(`\\b${rule.term}\\b`, 'gi');
      if (regex.test(line)) {
        const message = `${filePath}:${index + 1} - Found "${rule.term}"${rule.suggest ? ` - suggest: "${rule.suggest}"` : ''}`;

        if (rule.severity === 'error') {
          console.error(`❌ ${message}`);
          hasErrors = true;
        } else {
          console.warn(`⚠️  ${message}`);
          hasWarnings = true;
        }

        results.push({ file: filePath, line: index + 1, term: rule.term, severity: rule.severity });
      }
    });

    // Check for terms that should be replaced
    Object.entries(rules.required_replacements).forEach(([oldTerm, newTerm]) => {
      // Skip if it's an exception context
      const isException = rules.exceptions.some(exception =>
        line.toLowerCase().includes(exception.toLowerCase())
      );

      if (!isException) {
        // Look for standalone "cannabis" not preceded by "medical"
        const regex = new RegExp(`(?<!medical\\s)\\b${oldTerm}\\b`, 'gi');
        if (regex.test(line)) {
          console.warn(`⚠️  ${filePath}:${index + 1} - "${oldTerm}" should be "${newTerm}"`);
          hasWarnings = true;
        }
      }
    });
  });
});

// Summary
console.log('\n📊 Content Lint Summary:');
console.log(`Files checked: ${files.length}`);
console.log(`Errors: ${results.filter(r => r.severity === 'error').length}`);
console.log(`Warnings: ${results.filter(r => r.severity === 'warning').length}`);

if (hasErrors) {
  console.error('\n❌ Content lint failed with errors');
  process.exit(1);
} else if (hasWarnings) {
  console.warn('\n⚠️  Content lint passed with warnings');
} else {
  console.log('\n✅ Content lint passed');
}