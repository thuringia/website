const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
return filelist;
}

const files = walkSync('./public');


const getSecond = i => i[1];
const sha256 = text => '\'sha256-' + crypto.createHash('sha256').update(text).digest('base64') + '\'';
const hasText = i => !!i;

const proms = files.filter(file => file.slice(-5) === '.html').map(file => new Promise((res, rej) => fs.readFile(file, 'utf8', function(err, contents) {
    if(err) {
        console.log(err);
        return rej(err);
    }
    const x = contents.match(/<script(.*?)>(.*?)<\/script>/g);
    const y = contents.match(/<style(.*?)>(.*?)<\/style>/g);
    const scriptSHAs = !x ? [] : x.map(i => i.match(/<script.*?>(.*?)<\/script>/)).map(getSecond).filter(hasText).map(sha256);
    const styleSHAs = !y ? [] : y.map(i => i.match(/<style.*?>(.*?)<\/style>/)).map(getSecond).filter(hasText).map(sha256);
    return res({ scriptSHAs: scriptSHAs, styleSHAs: styleSHAs });
})));

Promise.all(proms).then(i => {
    const scriptSHAs = new Set(i.reduce((p, i) => p.concat(i.scriptSHAs), []));
    const styleSHAs = new Set(i.reduce((p, i) => p.concat(i.styleSHAs), []));
    return new Promise((res, rej) => fs.writeFile("./public/SHAs.json", JSON.stringify({ scriptSHAs: [...scriptSHAs], styleSHAs: [...styleSHAs] }), function(err) {
        if(err) {
            console.log(err);
            return rej(err);
        }
        console.log("The file was saved!");
        res("The file was saved!");
    })); 
});
