const padNode = document.querySelector('#pad');
const dnld_btn = document.getElementById('download-png');

// style control btn
const headingStyleBtn = document.querySelector('#heading');
// const invertColorBtn = document.querySelector('#invert-color');

dnld_btn.addEventListener('click', (e) => {
  // create attribution text
  const attribNode = document.createElement('small');
  attribNode.setAttribute('id', 'attribute');
  attribNode.innerText = 'created with scrpad.yellowfire.co';
  padNode.appendChild(attribNode);

  padNode.style.minHeight = '10px';

  html2canvas(padNode, { proxy: true, logging: true })
    .then(function (canvas) {
      padNode.style.minHeight = '80vh';
      padNode.style.display = 'block';
      canvas.style.display = 'none';

      const dnld_btn_created = document.createElement('a');
      dnld_btn_created.href = canvas.toDataURL();
      dnld_btn_created.download = btoa(Math.random() + ' ') + '.png';
      dnld_btn_created.click();
    })
    .catch((e) => console.log(e.message));
});

headingStyleBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.execCommand('formatBlock', false, 'h3');
});

// invertColorBtn.addEventListener('click', (e) => {
//   padNode.classList.toggle('dark');
// });

// change color of texts
const fgColorNode = document.querySelector('#fg-color');
const fgColorInputNode = document.querySelector('#fg-color > input');

fgColorInputNode.addEventListener('change', (e) => {
  fgColorNode.style.color = e.target.value;
  document.execCommand('foreColor', false, e.target.value);
});

// Change color of background
const bgColorNode = document.querySelector('#bg-color');
const bgColorInputNode = document.querySelector('#bg-color > input');

bgColorInputNode.addEventListener('change', (e) => {
  bgColorNode.style.backgroundColor = e.target.value;
  bgColorNode.style.borderColor = e.target.value;
  document.execCommand('backColor', false, e.target.value);
});

// handle file upload
const fileNode = document.querySelector('#bg-image');
const fileReader = new FileReader();

fileNode.addEventListener('change', (e) => {
  console.log('File Changed!');
  fileReader.onloadend = () => {
    console.log('File Loaded!');
    padNode.style.backgroundImage = `url(${fileReader.result})`;
    padNode.style.backgroundPosition = 'center';
    padNode.style.backgroundSize = 'cover';
  };

  if (fileNode.files[0]) {
    console.log('Loading File!');
    fileReader.readAsDataURL(fileNode.files[0]);
  }
});

// Font Handler
(() => {
  const defaultFontSize = 3;
  let fontSize = 3;
  const increaseFontNode = document.querySelector('#increase-font-size');
  const decreaseFontNode = document.querySelector('#decrease-font-size');

  increaseFontNode.addEventListener('click', (e) => {
    const newFontSize = fontSize + 1;
    fontSize = newFontSize <= 7 ? newFontSize : 7;
    document.execCommand('fontSize', false, fontSize);
  });

  decreaseFontNode.addEventListener('click', (e) => {
    const newFontSize = fontSize - 1;
    fontSize = newFontSize >= 1 ? newFontSize : 1;
    document.execCommand('fontSize', false, fontSize);
  });
})();
