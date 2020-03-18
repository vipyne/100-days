
;(function(){
/////////////////////////////
  // TODO: something cool with wasm
  // https://dassur.ma/things/c-to-webassembly/ | https://dassur.ma/things/raw-wasm/
  async function runWASM(inputGif, encode) {
    console.log("_____inputGif ", inputGif)
    // when "function import requires a callable", put func in `env` obj
    const config = {
      module: {},
      env: {
        consoleLog: console.log,
        wasi_snapshot_preview1: function(){},
        puts: function(){},
        memory_base: 0,
        heap_base: 2000,
        __memory_base: 0,
        __heap_base: 2000,
        table_base: 0,
        memory : new WebAssembly.Memory({ initial: 1 }),
        table: new WebAssembly.Table({
          initial: 0,
          element: 'anyfunc',
        }),
        abort: function(){}
      },
      imports: {
      }
    };

    //// you can't stop trying to make it happen
    fetch('./gify.wasm').then(response =>
      response.arrayBuffer()
    ).then(bytes =>
      // WebAssembly.instantiate(bytes)
      WebAssembly.instantiate(bytes, config)
      //// resolves to obj
      // {
      // https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#calling-compiled-c-functions-from-javascript-using-ccall-cwrap
      //   module: WebAssembly.Module, // ccall & cwrap
      //   instance: WebAssembly.Instance
      // }
    ).then(( {instance, module} ) => {
      // https://v8.dev/blog/emscripten-standalone-wasm
      // https://namekdev.net/2019/09/webassembly-cpp-and-webgl-for-js13k-game-jam/
      // https://agniva.me/wasm/2018/05/17/wasm-hard-way.html
      // https://dev.to/azure/passing-structured-data-from-c-to-javascript-in-web-assembly-1i0p
      // https://ariya.io/2019/05/basics-of-memory-access-in-webassembly
      // TODO: look at https://github.com/zeux/meshoptimizer/blob/bdc3006532dd29b03d83dc819e5fa7683815b88e/js/meshopt_decoder.js

      // when compiled STANDALONE_WASM with `emcc`,
      // instance.exports ===
      // memory: Memory {}
      // gif: ƒ 1() <---------- this is the function in the .c file (with EMSCRIPTEN_KEEPALIVE)
      // _start: ƒ 0()
      // module ===

      // when compiled with `clang | llc | wasm-ld`,
      // instance.exports ===
      // memory: Memory {}
      // gif: ƒ 1() <---------- this is the function in the .c file
      // __wasm_call_ctors: ƒ 0()
      // __dso_handle: Global {}
      // __data_end: Global {}
      // __global_base: Global {}
      // __heap_base: Global {}
      // module ===
      // module: Module {} // imports, exports, customSections

      // mem.length // 2 ^15 w clang - 2 ^22 w emcc

      // gif file
      const gif = inputGif;
      const gifPointer = instance.exports.malloc(inputGif.byteLength * 4);
      const gArr = new Int8Array(instance.exports.memory.buffer,
                                 gifPointer,
                                 inputGif.byteLength);
      gArr.set(new Int8Array(gif));
      console.log("_____gArr.byteOffset ", gArr.byteOffset)
      console.log("_____gArr.length ", gArr.length)
      console.log("_____gArr.byteLength ", gArr.byteLength)

      const mem = new Int8Array(instance.exports.memory.buffer);
      const memBase = 1024; // todo get this __global_base from emcc | instance.exports.__global_base.value;

      if (encode) {
        // secret message
        let string = [];
        if (secretMessage) {
          for (let i = 0; i < secretMessage.length; i++) {
            string.push(secretMessage[i].charCodeAt());
          }
          string.push(' '.charCodeAt());
        } else {
          string = [
            's'.charCodeAt(),
            'e'.charCodeAt(),
            'c'.charCodeAt(),
            'r'.charCodeAt(),
            'e'.charCodeAt(),
            't'.charCodeAt(),
            ' '.charCodeAt(),
            'm'.charCodeAt(),
            'e'.charCodeAt(),
            's'.charCodeAt(),
            's'.charCodeAt(),
            'a'.charCodeAt(),
            'g'.charCodeAt(),
            'e'.charCodeAt()
          ];
        }
        const strPointer = instance.exports.malloc(string.length * 4);
        const cArr = new Int8Array(instance.exports.memory.buffer,
                                   strPointer,
                                   string.length);
        cArr.set(string);

        let fromGif = instance.exports.gif(gifPointer, inputGif.byteLength, strPointer, string.length);
        console.log("__1___fromGif ", fromGif)

        const blob = new Blob([
          mem.slice(fromGif, fromGif + inputGif.byteLength + string.length + 3)
        ]
        , { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = gifFilename + '-gify-' + Date.now() + '.gif';
        document.body.appendChild(a);
        a.click();
        instance.exports.free(strPointer);
      } else {
        let msgSize = instance.exports.getMessageSize(gifPointer, inputGif.byteLength);
        console.log("_____msgSize ", msgSize)
        let msgStart = inputGif.byteLength - msgSize - 2;
        console.log("_____msgStart ", msgStart)

        let fromDecodeGif = instance.exports.decodeGif(gifPointer, msgSize + 1, msgStart);
        let msg = mem.slice(fromDecodeGif, fromDecodeGif + msgSize + 2); // +2 for 'oops' padding
        let message = '';
        for (let i = 0; i < msg.length; i++) {
          console.log("_____mmsg[i] ", String.fromCodePoint(msg[i]))
          try {
            message += String.fromCodePoint(msg[i]);
          } catch(e) {
            message += ';'
          }
        }
        decoded.innerText = message;
      }

      instance.exports.free(gifPointer);
    });
  }

  // https://stackoverflow.com/a/13240395 // nice slice
  function toHex(d) {
    return ("0"+(Number(d).toString(16))).slice(-2);
  }

  /*
  1. file select gif
  2. copy file into wasm memory
  3. write file back (unchanged)
  4. download file
  5. add comment to file
  6. write original gif (record from video/canvas??) & add comment // getUserMedia_play
  */

  const inputGifSelector = document.getElementById('input-gif');
  const decodeGifSelector = document.getElementById('decode-gif');
  const decoded = document.getElementById('decoded');

  const inputName = document.getElementById('input-name');
  const livideo = document.getElementById('li-video');
  const button = document.getElementById('click');
  const canvas = document.querySelector('canvas');
  const video = document.querySelector('video');
  const vid1 = document.getElementById('your-video');
  const form = document.getElementById('your-name');
  const vid3 = document.getElementById('my-border');
  const name = document.getElementById('name');
  let interval = 0;
  let secretMessage = '';
  let gifFilename = '';

  inputGifSelector.addEventListener('change', (event) => {
    const inputGif = event.target.files[0];
    gifFilename = inputGif.name.slice(0, -4);
    secretMessage = inputName.value;
    if ('image/gif' !== inputGif.type ||
      3000000 < inputGif.size) {
      return alert('Please upload a .gif smaller than 3mb');
    }
    inputGif.arrayBuffer().then((blob) => {
      runWASM(blob, true);
    })
  }, false);

  decodeGifSelector.addEventListener('change', (event) => {
    const inputGif = event.target.files[0];
    if ('image/gif' !== inputGif.type ||
      3000000 < inputGif.size) {
      return alert('Please upload a .gif smaller than 3mb');
    }
    inputGif.arrayBuffer().then((blob) => {
      runWASM(blob, false);
    })
  }, false);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    secretMessage = inputName.value;
  })

  form.focus();

  // TODO: use webworker for this?
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas
  function videoToCanvas(video, canvas) {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 640, 480);
    let frame = ctx.getImageData(0, 0, 640, 480);
    let l = frame.data.length;

    for (let i = 0; i < l; i+=4) {
      let r = frame.data[i + 0];
      let g = frame.data[i + 1];
      let b = frame.data[i + 2];
      let a = frame.data[i + 3];
      frame.data[i + 3] = 255/2; // semi transparent
      if (r < 100 || g > 200) {
        frame.data[i + 2] = 255;
      }
      if (g < 100 || b > 200) {
        frame.data[i + 0] = 255;
      }
      if (b < 100 || r > 200) {
        frame.data[i + 1] = 255;
      }
    }
    ctx.putImageData(frame, 0, 0);
  }

  async function getMediaStream() {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      })
      playStream(stream);
    } catch(e) {
      console.log("_____getMediaStream error:", e);
    }
  }

  function playStream(stream) {
    video.srcObject = stream;
    video.onloadedmetadata = function(event) {
      video.play();
    }
  }

/////////////////////////////
})(window, document);
