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
            let new_audio = new Howl({
                src: [url],
                loop: true,
                preload: true,
                rate: 1.0
            })
            this.tracks.push(new_audio);
        })

    }

    calculate_playback_speed()
    {
        this.playback_speed = (80 / 100 * current_bpm) / 100;
    }

    set_playback_speed()
    {
        this.tracks.forEach((elem) => {
            elem.rate(this.playback_speed)
        })
    }
}

