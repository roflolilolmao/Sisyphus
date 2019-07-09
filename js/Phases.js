const P0_TOTAL_KEYS = 10

class Phases
{
  constructor()
  {
    this.current_phase = 0
    this.tracks_in_phase = [[],[],[],[]]
    this.keys_per_phase = 50

    this.tracks_in_phase[0] = audio.tracks[0]

    for (let i = 0; i < 6; i++)
      this.tracks_in_phase[1].push(audio.tracks[i + 1])
    for (let i = 0; i < 3; i++)
      this.tracks_in_phase[2].push(audio.tracks[i + 7])
    for (let i = 0; i < 3; i++)
      this.tracks_in_phase[3].push(audio.tracks[i + 10])
    this.tracks_in_phase[2].forEach((track) =>
    {
      this.tracks_in_phase[3].push(track)
    })
  }

  set_according_to_correct_keys()
  {
    if (correct_keys < P0_TOTAL_KEYS)
    {
      this.current_phase = 0
      return
    }
    this.current_phase = Math.floor((correct_keys - P0_TOTAL_KEYS) / (this.keys_per_phase * (1 - 0.05 * relics[TARDNESS_ID].level))) + 1
    if (this.current_phase > 3)
      this.current_phase = 3
  }

  modify_random_track_volume(modifier)
  {
    let random = Math.floor(Math.random() * this.tracks_in_phase[this.current_phase].length)
    let target_track = null
    while (target_track == null || target_track == undefined)
      target_track = this.tracks_in_phase[this.current_phase][random]

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
