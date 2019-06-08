async function main(audioBytes) {
  // Imports the Google Cloud client library
  const speech = require("@google-cloud/speech");
  //AIzaSyBPnWjwIamNvovQbJln35yF3r34PjlVldk
  try {
    var serviceAccount = {
      type: "service_account",
      project_id: "speech-to-text-07062019",
      private_key_id: "5834ff7e2c71f90863fae18877e918fbea8a9803",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC4fZCGNzQRcvcx\nm57ZbdgaNMO4cGuZmBaOOsoMxymZuR1NBvg8dsOWTzaNVW6mPDppDHD7epmE+EZY\nKXmVNXfq+qcpo5Es4eASx2uznWHZRcprSGpRMokERzcJxyXBAjIkK6SpuqIiksqu\nFLYR94DGzAMZn2cOQWCtG2bDsNjbHIYKJH2K53kPc3jb4eF4L16WOvwyma5AGUj8\nNUBXVrv4Vm6wN4PVjL/u8fbW9i00KG8zOs6PsVKMBEI031Xs+S1DjVBJomuBfjNw\nDoqvx+zAzdjYW0bRRnh7Katw8nP/0dbaTVxUuW07JlVifX1xCsb1i9oIp980/osc\nxmd0yvjZAgMBAAECggEADFMHBpBFgCzn6n503B2EZCvGL1oDNh181D+FI9liJAzD\nslOW3aMpaa8c+9ALNjurwzy7h3EnNETJnjYXEyqhOidIZ3WvywnDyD1eKn+G+9a3\nsPcDcy0nDgwb1yFgmkYlR1lLBLOdBSY9N+fWSdj4107lnh6R6dfgN3AvKz9zHR/r\nR2Yfpvxtn4GvhRB6aCSH5EnM5GXuQ1CDNTqRIj2MC2JwVJuDeSSYJqufBFIxsSEB\nnkt0tnh5lnt5i6t6B/nwtWv7R2+PW5FpNRH+y3EJDdzMPipoVdqVfD67+jbj7l7X\nagwaQA6vt2KHOQUh27K4XDZTTB9DULf5o1C/iJq8SQKBgQD+RdG9yXS+4JT73un5\n6WHGYk7YTR4+ti9dBx+JCjea7oPc5fU4TPnASIdO1JLFTUDvOUukd66ft3s6sir9\nyfoXO5mmNjTPwwocMShkG6T0u8UCrJOuzBWShW2Y7gC0uWEBzCuXpjAmh40Vvzkk\nCdFsei6H4akHGRSQGbHnTiCS5wKBgQC5vmTQiAWULb1y4wGGdFFksphz/pP0yX0D\nINYxHT/5koHGWwzYTQslWbY5JUj5itM5YV7ofXPIwrJtbDDLetOKjIfp9roL1NzU\nyncOwQ4BjpMQPO7b87ZCERZ13LW+f+8mKlg/s76APGn3ReviiP0BMh1g+oW38wYG\n+3SzD7pePwKBgFUkmfP8FlyoJRsl7KEjdfsRBifFwv/qz3dOIFAqHK6DeaIpWnCM\nzgCGCNDru23XzYuNWvfqn42ZyejAqkarMFRBP9T5R7veKm+AQm8rFpRgn7qigR1B\n92NFzIouAAyEGqiYbmxsWKk+MI78piycIQU68IPNm2TmEA2knP7AGYY3AoGAB1rN\nnSA1sFdbUAhDEDLc4jLcLIOhEilERPJw6MLyvIwbjWIfkRUD4ve5amvaht8DXBtJ\n6cTF5+YlsIV/LR9w7uR/oTj+xucn01ks+62TQ2aE1jjDcHwm9Fi+3e3eWGuyaX11\nvxf77BH4VC01mOO5uOlmFmf1EYKS84XTah+uTnsCgYBvsJ+dESMAELmLG7PedzfU\n/HIq8eFWSGE2Izuwi2dP9cUlha7uBBjwe4zLOSabwz2FFNplzmCM++MLjPYjcrLB\n3U+Xn1yN86YLUcnPqr6HMfsgK0Nc5+RmE3NcdLagHC75g60Wpr1WnsDi22u8RxBr\nkp6GjMm2EXx03dOFbW/UnA==\n-----END PRIVATE KEY-----\n",
      client_email: "test-151@speech-to-text-07062019.iam.gserviceaccount.com",
      client_id: "105079402125054257052",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/test-151%40speech-to-text-07062019.iam.gserviceaccount.com"
    };
  } catch (e) {
    var serviceAccount = JSON.parse(process.env.noti);
  }
  try {
    // Creates a client
    const client = new speech.SpeechClient(
      "speech-to-text-07062019",
      "./public/speach-to-text-5834ff7e2c71.json"
    );
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
    //console.log(request);
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    console.log(response);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join("\n");
    console.log(`Transcription: ${transcription}`);
    return transcription;
  } catch (e) {
    throw e;
  }
}
module.exports = main;
