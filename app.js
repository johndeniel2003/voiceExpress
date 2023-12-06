
const voiceSelect = document.querySelector('select');
const speakBtn = document.querySelector('#speak');
const speech = new SpeechSynthesisUtterance();
const input =  document.querySelector('textarea');
const loader = document.querySelector('#loader');
const textCounter = document.querySelector('#counter')
const limit = 300;

let voicesOptions = [];   



input.addEventListener('input',(e)=>{
   if(e.target.value.length <= limit){
        textCounter.textContent = e.target.value.length;
        textCounter.style.color = '#212121';
        speakBtn.classList.remove('disable');

   }else{
        speakBtn.classList.add('disable');
        textCounter.style.color = '#FF3339';
   }
})


speakBtn.addEventListener('click',()=>{
    try{
        
        speech.text = input.value

        if(input.value === ''){
            return alert('Please input some text');
        }else {
            loader.style.display = 'block';
            speech.onend = () => {
                console.log('Speech synthesis ended');
                loader.style.display = 'none';
            };

            window.speechSynthesis.speak(speech);
        }

       
        

    }catch(err){
        console.error(err);
    }finally{
        
    }
})


voiceSelect.addEventListener('change',()=>{
    speech.voice = voicesOptions[voiceSelect.value];
})


window.speechSynthesis.onvoiceschanged = ()=>{
    voicesOptions = window.speechSynthesis.getVoices();
    speech.voice = voicesOptions[0];

    voicesOptions.forEach((v,i)=>(voiceSelect.options[i] = new Option(v.name, i)));
}