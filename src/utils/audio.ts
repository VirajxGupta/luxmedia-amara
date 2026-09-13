class OceanAudioSynth {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isPlaying: boolean = false;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    // Create 5-second buffer of pink noise for ocean sound
    const bufferSize = this.ctx.sampleRate * 5;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // Keep volume soft & comfortable
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Filter to simulate muffled sea water depth
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Master Gain for smooth fade in/out
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    // LFO for wave swelling rhythm (every ~7 seconds)
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.14, this.ctx.currentTime); // ~7.1s wave cycle

    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(220, this.ctx.currentTime); // Modulate filter cutoff between 100Hz and 340Hz

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filter.frequency);

    this.noiseNode.connect(this.filter);
    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    if (!this.isPlaying) {
      this.start();
      return true;
    } else {
      this.stop();
      return false;
    }
  }

  public start() {
    this.init();
    if (!this.ctx || !this.gainNode || !this.noiseNode || !this.lfo) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      try {
        this.noiseNode.start(0);
        this.lfo.start(0);
      } catch {
        // Node already started
      }
      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2.5); // Slow 2.5s fade in
      this.isPlaying = true;
    }
  }

  public stop() {
    if (this.ctx && this.gainNode && this.isPlaying) {
      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 2.0); // Smooth 2s fade out
      setTimeout(() => {
        this.isPlaying = false;
      }, 2000);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const oceanAudio = typeof window !== 'undefined' ? new OceanAudioSynth() : null;
