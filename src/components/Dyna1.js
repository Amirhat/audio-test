export default () => {
    // Set up audio context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    let currentBuffer = null;
    return  (
        <div>
            <p>
                this is a dyna 1
            </p>
        </div>
    )

}