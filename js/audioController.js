const tracksURLs = [
    'drums_base.wav',
    'guitar_palm_muted.wav',
    'basse_nappe.wav',
    'violins_arpeggios.wav'
].map(n => assets_path(`tracks/${n}`))

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
        this.playback_speed = (100 / 82 * current_bpm) / 100;
        console.log(this.playback_speed)
    }

    set_playback_speed()
    {
        this.tracks.forEach((elem) => {
            elem.rate(this.playback_speed)
        })
    }
}

