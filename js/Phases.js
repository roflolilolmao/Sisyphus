class Phases
{
  constructor()
  {
    this.current_phase = 0
    this.tracks_in_phase = [[],[],[],[]]

    this.tracks_in_phase[0] = audio.tracks[0]

    for (let i = 0; i < 6; i++)
      this.tracks_in_phase[1].push(audio.tracks[i + 1])
    for (let i = 0; i < 3; i++)
      this.tracks_in_phase[2].push(audio.tracks[i + 7])
    for (let i = 0; i < 10; i++)
      this.tracks_in_phase[3].push(audio.tracks[i + 10])
    this.tracks_in_phase[2].forEach((track) =>
    {
      this.tracks_in_phase[3].push(track)
    })
  }

  set_according_to_bpm()
  {
    if (current_bpm < 85)
    {
      this.current_phase = 0
      return
    }
    this.current_phase = Math.floor(current_bpm / 60)
    if (this.current_phase > 4)
      this.current_phase = 4
  }

  modify_random_track_volume(modifier)
  {
    let random = Math.floor(Math.random() * this.tracks_in_phase[this.current_phase].length)
    let target_track = this.tracks_in_phase[this.current_phase][random]

    target_track.mute(false)
    target_track.volume(target_track.volume() + modifier)
    if (this.current_phase === 2 && random === 0 || this.current_phase === 3 && random === 3)
      audio.tracks[0].volume(audio.tracks[0].volume() - modifier)
    else if (this.current_phase === 2 && random === 2 || this.current_phase === 3 && random === 5)
      audio.tracks[1].volume(audio.tracks[1].volume() - modifier)
    else if (this.current_phase === 3 && random === 0)
      audio.tracks[3].volume(audio.tracks[3].volume() - modifier)
    else if (this.current_phase === 3 && random === 1)
      audio.tracks[7].volume(audio.tracks[7].volume() - modifier)
    else if (this.current_phase === 3 && random === 2)
      audio.tracks[2].volume(audio.tracks[2].volume() - modifier)
  }
}