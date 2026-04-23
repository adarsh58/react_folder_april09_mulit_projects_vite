const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Replace \` with `
    if (content.includes('\\`')) {
      content = content.replace(/\\`/g, '`');
      changed = true;
    }
    
    // Replace \$ with $
    if (content.includes('\\$')) {
      content = content.replace(/\\\$/g, '$');
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed:', filePath);
    }
  }
});
