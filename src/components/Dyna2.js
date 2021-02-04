export default () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  let currentBuffer = null;
  const visualizeAudio = url => {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => visualize(audioBuffer));
  };
  return (
    <div>
      <p>this is a dyna 2</p>
    </div>
  );
};
