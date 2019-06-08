const fs = require("fs");
const flac = require("emflac");

const cmd = flac({
  TOTAL_MEMORY: 8 * 1024 * 1024, // 8 MiB
  TOTAL_STACK: 64 * 1024 // 64 kiB
});
let data = fs.readFileSync("./a.wav");
cmd.FS_createDataFile(".", "in.wav", data, true, false);
cmd.callMain([
  "--endian=big",
  "--sign=unsigned",
  "--channels=1",
  "--bps=16",
  "--sample-rate=10",
  "-o=out.flac",
  "in.wav"
]);
if (cmd.getExitStatus() === 0) {
  data = cmd.FS_readFile("out.flac");
  data = Buffer.from(data);
  fs.writeFileSync("./o.flac", data);
}
