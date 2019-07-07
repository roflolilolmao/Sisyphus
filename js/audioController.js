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
        this.current_track = 0;
        this.tracks = [[],[]];
        tracksURLs.forEach((url) => {
            let new_audio = new Audio(url);
            this.tracks[0].push(new_audio);
            let new_audio2 = new Audio(url);
            this.tracks[1].push(new_audio2);
        })

        this.tracks.forEach((arr) => {
            arr.forEach((elem) =>
            {
                elem.loop = false;
                elem.autoload = true;
                elem.addEventListener('timeupdate', this.start_next_batch)
            })
        })
    }

    start_next_batch(event)
    {
        if (event.target.currentTime && event.target.currentTime >= 23.4)
        {
            console.log(event.target.currentTime)
            this.current_track += 1 % 2
            this.tracks[0].forEach((elem) => {
                elem.currentTime = 0;
            })
            //play_all_tracks()
        }
    }

    calculate_playback_speed()
    {
        this.playback_speed = (80 / 100 * current_bpm) / 100;
    }

    set_playback_speed()
    {
        this.tracks[this.current_track].forEach((elem) => {
            elem.playbackRate = this.playback_speed;
        })
    }
}

