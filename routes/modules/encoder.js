var FlacFactory = require("libflacjs");
var Flac = FlacFactory();
var flac_encoder,
  BUFSIZE = 4096,
  CHANNELS = 1,
  SAMPLERATE = 16000,
  COMPRESSION = 5,
  BPS = 16,
  VERIFY = false,
  BLOCK_SIZE = 0,
  flac_ok = 1;

Flac.on("ready", function(flac) {
  //console.log(flac);
  flac_encoder = Flac.create_libflac_encoder(
    SAMPLERATE,
    CHANNELS,
    BPS,
    COMPRESSION,
    0,
    VERIFY,
    BLOCK_SIZE
  );

  if (flac_encoder == 0) {
    return;
  }
  var encBuffer = [];
  var status_encoder = Flac.init_encoder_stream(flac_encoder, function(
    encodedData /*Uint8Array*/,
    bytes,
    samples,
    current_frame
  ) {
    //store all encoded data "pieces" into a buffer
    encBuffer.push(encodedData);
  });
  flac_ok &= status_encoder == 0;

  var buf_length = buffer.length;
  var buffer_i32 = new Uint32Array(buf_length);
  var view = new DataView(buffer_i32.buffer);
  var volume = 1;
  var index = 0;
  for (var i = 0; i < buf_length; i++) {
    view.setInt32(index, buffer[i] * (0x7fff * volume), true);
    index += 4;
  }

  var flac_return = Flac.FLAC__stream_encoder_process_interleaved(
    flac_encoder,
    buffer_i32,
    buf_length
  );
  if (flac_return != true) {
    console.log(
      "Error: FLAC__stream_encoder_process_interleaved returned false. " +
        flac_return
    );
  }

  flac_ok &= Flac.FLAC__stream_encoder_finish(flac_encoder);
  console.log("flac finish: " + flac_ok);
  Flac.FLAC__stream_encoder_delete(flac_encoder);
});

////////
// [2] ENCODE -> IN: PCM Float32 audio data (this example: mono stream)
// ... repeat encoding step [2] as often as necessary

////////
// [3] FINISH ENCODING

//after usage: free up all resources for the encoder

////////
// [4] ... do something with the encoded data, e.g.
//     merge "encoded pieces" in encBuffer into one single Uint8Array...

module.exports = {};
