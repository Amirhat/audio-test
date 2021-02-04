export default () => {
    // Set up audio context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    let currentBuffer = null;

}