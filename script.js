
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const speakButton = document.getElementById('speakButton');
let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

speakButton.addEventListener('click', () => {
    const text = textInput.value;
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        utterance.voice = voices.find(voice => voice.name === selectedVoice);
        speechSynthesis.speak(utterance);
    }
});
