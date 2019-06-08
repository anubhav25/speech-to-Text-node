async function main(audioBytes) {
  const speech = require("@google-cloud/speech");
  try {
    // Creates a client
    const client = new speech.SpeechClient();
    console.log();

    const request = {
      audio: {
        content: audioBytes
      },
      config: {
        encoding: "FLAC",
        sampleRateHertz: 44100,
        languageCode: "en-IN"
      }
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    console.log(response);
    const results = response.results
      .map(result => result.alternatives[0].transcript)
      .join("\n");
    console.log(results);
    return results;
  } catch (e) {
    throw e;
  }
}
module.exports = main;
