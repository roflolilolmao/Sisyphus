const tracksURLs = [
    "assets/tracks/drums_base.wav",
    "assets/tracks/guitar_palm_muted.wav",
    "assets/tracks/basse_nappe.wav",
    "assets/tracks/violins_arpeggios.wav"
];

class AudioTracks
{
    constructor()
    {
        this.tracks = [];
        tracksURLs.forEach((url) => {
            let new_audio = new Audio(url);
            this.tracks.push(new_audio);
        })
        this.tracks.forEach((elem) => {
            elem.loop = true;
        })
    }

    calculate_playback_speed()
    {
        this.playback_speed = (80 / 100 * current_bpm) / 100;
    }

    set_playback_speed()
    {
        this.tracks.forEach((elem) => {
            elem.playbackRate = this.playback_speed;
        })
    }
}

