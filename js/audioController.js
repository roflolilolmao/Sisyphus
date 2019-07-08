const tracksURLs = [
    "1.Drum base.wav",
    '2.Basse nappe.wav',
    '3.Voice.wav',
    '4.Violons arpèges.wav',
    '5.Cor.wav',
    '6.Basse calme.wav',
    'drum_vnr.wav',
    '7.Guitare Palmut.wav',
    '9.Guitare solo.wav',
    '10.Basse VNR (remplace basse calme).wav',
    '11.Violons disto (remplace violons arpèges).wav',
    '12. Drum MEGAVNR (remplace drum VNR).wav',
    '13.Voice VNR (remplace voice).wav'
].map(n => assets_path(`tracks/${n}`))

let loaded_sounds = 0;

function sound_loaded()
{
    loaded_sounds++;
    if (loaded_sounds >= tracksURLs.length)
        document.getElementById("play_btn").style.display = 'block'
}


class AudioTracks
{
    constructor()
    {
        this.tracks = tracksURLs.map(url => new Howl({
                    src: [url],
                    volume: 0.0,
                    loop: true,
                    preload: true,
                    rate: 1.0,
                    onload: sound_loaded
                })
        )
    }

    stop()
    {
        this.tracks.forEach((track) => {
            track.mute(true)
            track.volume(0.0)
        })
    }

    fade_to_stop()
    {
        this.tracks.forEach(function(track) {
            track.fade(track.volume(), 0, 5000)
            track.onfade = function(track) {
                track.stop()
            }
        })
    }

    calculate_playback_speed()
    {
        this.playback_speed = (100 / 82 * current_bpm) / 100;
    }

    set_playback_speed()
    {
        this.tracks.forEach((elem) => {
            elem.rate(this.playback_speed)
        })
    }
}

