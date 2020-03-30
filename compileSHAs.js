const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

const files = walkSync("./public");

const getSecond = (i) => i[1];
const genSha = (t) => crypto.createHash("sha256").update(t).digest("base64");
const sha256 = (text) => "'sha256-" + genSha(text) + "'";
// const integrety = text => 'sha256-' + genSha(text);
const hasText = (i) => !!i;

const proms = files
  .filter((file) => file.slice(-5) === ".html")
  .map(
    (file) =>
      new Promise((res, rej) =>
        fs.readFile(file, "utf8", function (err, contents) {
          if (err) {
            console.log(err);
            return rej(err);
          }
          const x = contents.match(/<script(.*?)>([^]*?)<\/script>/g);
          const y = contents.match(/<style(.*?)>([^]*?)<\/style>/g);
          const scriptSHAs1 = !x
            ? []
            : x.map((i) => i.match(/<script.*?>([^]*?)<\/script>/));
          const styleSHAs1 = !y
            ? []
            : y.map((i) => i.match(/<style.*?>([^]*?)<\/style>/));

          const scriptSHAs2 = scriptSHAs1
            .map((i) => i[0].match(/integrity="(.+?)"/))
            .filter((i) => i && i[1])
            .map((i) => i[1]);
          const styleSHAs2 = styleSHAs1
            .map((i) => i[0].match(/integrity="(.+?)"/))
            .filter((i) => i && i[1])
            .map((i) => i[1]);

          const scriptSHAs = scriptSHAs1
            .map(getSecond)
            .filter(hasText)
            .map(sha256)
            .concat(scriptSHAs2.map((i) => `'${i}'`));
          const styleSHAs = styleSHAs1
            .map(getSecond)
            .filter(hasText)
            .map(sha256)
            .concat(styleSHAs2.map((i) => `'${i}'`));

          console.log(
            `${file}: ${scriptSHAs.length} scripts, ${styleSHAs.length} styles \n`
          );
          return res({ scriptSHAs: scriptSHAs, styleSHAs: styleSHAs });
        })
      )
  );

Promise.all(proms).then((i) => {
  const scriptSHAs = new Set(i.reduce((p, i) => p.concat(i.scriptSHAs), []));
  const styleSHAs = new Set(i.reduce((p, i) => p.concat(i.styleSHAs), []));
  return new Promise((res, rej) =>
    fs.writeFile(
      "./public/SHAs.json",
      JSON.stringify({
        scriptSHAs: [...scriptSHAs],
        styleSHAs: [...styleSHAs],
      }),
      function (err) {
        if (err) {
          console.log(err);
          return rej(err);
        }
        console.log("The file was saved!");
        res("The file was saved!");
      }
    )
  );
});
