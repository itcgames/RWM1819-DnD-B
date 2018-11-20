/**
 * This implementation is taken in part from http://www.html5rocks.com/en/tutorials/webaudio/intro/
 */

class SoundManager
{
    /**
    * constructor that creates class variables for storing audio buffers and creates the overall audio context
    */
    constructor()
    {
        // entity to hold a name for each sound and its buffer ("name", buffer)
        this.audioBuffers = {};

	    //required for managing and for playing any sound.  Best practise is one per page, setup in initialize.
        this.audioContext = null;
        this.gainNode = {};
    }

    /**
    * init the audio context, throw an alert if browser does not support the API
    */
    initialize()
    {
        try
        {
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.audioContext = new AudioContext();
        }
        catch(e)
        {
            alert('Audio API not supported');
        }
    }

    /**
    * Load in audio and store it to the audio buffer array using XMLHttpRequest
    * @argument name - name of the sound that will be stored in the buffers
    * @argument path - the src url of the sound we are loading
    */
    loadSound(name, path)
    {
        var that = this;
        var xhr = new XMLHttpRequest();

        xhr.open('GET', path, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function(e)
        {
            that.audioContext.decodeAudioData(xhr.response, function(buffer)
            {
                // associate the audio buffer with the sound name so can use the decoded audio later.
                that.audioBuffers[name] = buffer;
            },
            function(e)
            {
                console.log('Error decoding file', e);
            });
        }

        // send request to acquire the sound file
        xhr.send();
    }

    /**
    * Play the audio from the array of audioBuffers
    * @argument sound - name of the sound thats stored in the audioBuffer
    * @argument loop - boolean to control wether the sound loops or not
    */
    playSound(sound, loop)
    {
        if(this.audioBuffers[sound] == undefined)
        {
            console.log("Sound " + sound + " does not exist or has not been loaded.");
            return;
        }

        var audio = this.audioBuffers[sound];

        var source = this.audioContext.createBufferSource();
        this.source = source;

        /**this.source.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination); */
        console.log("Sound " + sound + " playing.");

        this.source.buffer = audio; // tell the source which sound to play
        this.source.loop = loop;
        this.source.connect(this.audioContext.destination); // connect the source to the context's destination (the speakers)
        this.source.start(0);
    }

    setVolume(volume)
    {   
        if(volume >= 0 && volume <= 1)
        {
            this.gainNode.gain.value = volume;
        }
    }

    volumeUp()
    {
        if(this.gainNode.gain.value < 1)
        {
            this.gainNode.gain.value += .1;
        }
    }

    volumeDown()
    {
        if(this.gainNode.gain.value > 0 )
        {
         this.gainNode.gain.value -= volume;
        }
    }

    end()
    {
       this.source.disconnect(); 
    }
}