const fs = require('fs');
const path = require('path');

function rename(folderName = path.join(__dirname, './build')) {
  fs.readdir(folderName, (err, files) => {
    files.forEach((file) => {
      const fullPath = path.join(folderName, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        rename(path.join(folderName, file));
      } else {
        fs.renameSync(fullPath, path.join(folderName, file.replace(/-/g, '_')));
      }
    })
  });
}

rename();