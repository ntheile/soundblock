import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FactomProvider } from '../../providers/factom/factom';
import { HeaderComponent } from '../../components/header/header';
declare let $: any;
declare let window: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    chainInfo;
    did3Tag = {
        song: 'Super Mario',
        album: 'self title',
        artist: 'Nick Theile',
        artistDigitalSignature: '',
        artistPublicKey: '',
        musicPointer: 'https://raw.githubusercontent.com/ntheile/soundblock/master/src/assets/music/Super%20Mario.mp3',
        artUrl: 'https://supermariorun.com/assets/img/hero/hero_chara_mario_update_pc.png',
        genre: 'alternative',
        license: 'free',
        lyricsUrl: 'http://url-to-lyrics.html',
        rawMusicFileHash: '',
        year: '2018'
    };

    constructor(
        public navCtrl: NavController,
        public factom: FactomProvider,
    ) {
        this.getChainInfo();
        $(document).ready(() => {
            this.bootPlayer();
        });
    }

    async createChain() {
        this.factom.createChain('Nick Theile - Artist Chain', '');
    }

    async createEntry(){
        this.factom.sendTransaction(JSON.stringify(this.did3Tag, null, '\t'));
    }


    async getChainInfo() {
        this.chainInfo = await this.factom.getTransactionInfo('15948519a42dacda9c0e583ee61271231fc1c46335e77be38375915a751c76ee');
    }


    // https://codepen.io/kyicy/pen/eMpyRR
    bootPlayer() {
        function Song() {
            this.audio = document.createElement('audio');

            this.setTrack = function (src) {
                this.audio.src = src;;
            }

            this.play = function () {
                this.audio.play();
            }

            this.pause = function () {
                this.audio.pause()
            };

            this.toggleMute = function () {
                this.audio.muted = !this.audio.muted;
            };

            this.jumpTo = function (ratio) {
                var seekable = this.audio.seekable;
                var anchor = this.audio.duration * ratio;
                if (anchor > seekable.start(0) && anchor < seekable.end(0)) {
                    this.audio.currentTime = anchor;
                }
            };

            this.setVolume = function (volume) {
                volume = parseFloat(volume);
                if (volume >= 0 && volume <= 1) {
                    this.audio.volume = volume;
                }
            }
        }


        function Player(songs) {
            this.timer = new Timer();
            this.song = new Song();
            this.songArray = songs;
            this.length = songs.length;
            this.currentPlaying = 0;
            this.mode = "repeat";
            this.setUpEventListener();
            this.setSong(songs[0]);
        }

        Player.prototype.setUpEventListener = function () {
            var that = this;

            $("#player .controls.icon, #player .cover").on("mousedown touchstart mousemove touchmove", function (e) {
                e.preventDefault();
            });

            this.song.audio.addEventListener("timeupdate", function () {
                var progress = this.currentTime / this.duration * 100;
                $("#player .progress").css("width", `${progress}%`);
            });

            this.song.audio.addEventListener("ended", () => {
                this.playNext();
            })

            this.song.audio.addEventListener("playing", () => {
                $("#player .icon.play").hide();
                $("#player .icon.pause").show();
            })

            this.song.audio.addEventListener("pause", () => {
                $("#player .icon.play").show();
                $("#player .icon.pause").hide();
            })

            $(this.song.audio).on("canplaythrough", () => {
                this.song.canPlayThrough = true;
            })

            $(this.song.audio).on("durationchange loadedmetadata loadeddata progress canplay canplaythrough", function () {
                if (this.readyState == 4) {
                    var loaded = this.buffered.end(0)
                    $("#player .buffer").css("width", `${loaded / this.duration * 100}%`)
                }
            })

            $("#player .icon.repeat").click(function () {
                that.mode = "repeat-one";
                $(this).hide();
                $("#player .icon.repeat-one").show();
            })

            $("#player .icon.repeat-one").click(function () {
                that.mode = "shuffle";
                $(this).hide();
                $("#player .icon.shuffle").show();
            })

            $("#player .icon.shuffle").click(function () {
                that.mode = "repeat";
                $(this).hide();
                $("#player .icon.repeat").show();
            })


            $("#player .icon.prev").on("click", () => {
                this.playPrev();
            });

            $("#player .icon.next").on("click", () => {
                this.playNext();
            });

            $("#player .icon.play").on("click", () => {
                this.song.play();
                this.timer.start(this.syncLrc.bind(this));
            });

            $("#player .icon.pause").on("click", () => {
                this.timer.stop();
                this.song.pause();
            });

            $("#player .icon.volume").on("click", function () {
                $(this).hide();
                $("#player input.volume").show();
            })

            $("#player input.volume").on("mouseout", function () {
                $(this).hide();
                $("#player .icon.volume").show();
            }).on("input", function () {
                that.song.setVolume(parseInt(this.value) / 100);
            })

            $("#player .cover").on("click", function () {
                $("#player .lrc").toggle();
            });

            $("#player .line").on("click", function (e) {
                e.stopPropagation()
            });

            (function (that) {
                var progress_mousedown = false;
                $("#player .progressContainer").mousedown(function () {
                    progress_mousedown = true;
                }).on("mousemove mouseup", function (e) {
                    if (progress_mousedown && that.song.canPlayThrough) {
                        var progress = e.offsetX / $(this).width();
                        that.song.jumpTo(progress);
                    }
                });
                $("body").mouseup(function () {
                    progress_mousedown = false;
                });

            })(this);
        }

        Player.prototype.play = function (index) {
            this.currentPlaying = ((index >> 0) + this.length) % this.length;
            this.song.pause();
            this.timer.stop();
            this.setSong(this.songArray[this.currentPlaying], (hasLrc) => {
                this.song.play();
                if (hasLrc) {
                    this.timer.start(this.syncLrc.bind(this));
                }
            });

        }

        function whichToPlay(current, mode, direction, total) {
            console.log(mode)
            var index;
            if (mode == "repeat") {
                index = direction == "next" ? current + 1 : current - 1
            } else if (mode == "repeat-one") {
                index = current;
            } else {
                index = Math.round(Math.random() * total);
            }
            return index;
        }

        Player.prototype.playNext = function () {
            this.play(whichToPlay(this.currentPlaying, this.mode, "next", this.length));
        }

        Player.prototype.playPrev = function () {
            this.play(whichToPlay(this.currentPlaying, this.mode, "previous", this.length));
        }

        Player.prototype.setSong = function (songData, next) {
            this.song.lrc = null;
            this.song.setTrack(songData.track);
            this.song.canPlayThrough = false;
            // update cover 
            $("#player .cover").css("background-image", `url(${songData.cover})`);

            // update detail
            $("#player .detail .title").text(`${songData.title} - ${songData.artist}`);

            // set default text for lyrics
            $("#player .lrc .line").text(songData.title);

            // get lyrics
            $.get(songData.lrc, (data) => {
                this.song.lrc = Lrc(data);
            }).fail(() => { })
                .always(() => {
                    if (typeof next == 'function') {
                        next(!!this.song.lrc);
                    }
                })
        }

        Player.prototype.syncLrc = function () {

            var lines = this.song.lrc;

            var anchor = Math.round(this.song.audio.currentTime * 10) * 100;

            while (true) {
                if (anchor < 0) {
                    break;
                } else if (lines[anchor]) {
                    $("#player .lrc .line").text(lines[anchor].text);
                    break;
                } else {
                    anchor -= 100;
                }
            }

        }

        function Timer() {
            this.interval;

            this.start = function (cb) {
                this.interval = setInterval(cb, 100);
            };

            this.stop = function () {
                clearInterval(this.interval);
            }
        }

        function Lrc(text) {
            var lines = text.split('\n');
            var result = {};
            lines.forEach(function (line) {
                var timeAnchors = line.match(/\d+:\d+\.\d+/g)
                if (!timeAnchors) {
                    return
                }

                var _t = line.split("]");
                var text = _t[_t.length - 1];

                timeAnchors.forEach(function (anchor) {
                    var _r = anchor.split(":").map(parseFloat)
                    var time = (_r[0] * 60 + (Math.round(_r[1] * 10)) / 10) * 1000;
                    result[time] = {
                        text
                    }
                })

            })
            return result;
        }

        var songs = [
            {
                track: "https://raw.githubusercontent.com/ntheile/soundblock/master/src/assets/music/Super%20Mario.mp3",
                cover: "assets/music/albumart.jpg",
                artist: "Nick Theile",
                title: "Super Mario",
                lrc: "https://bitbucket.org/kyicy/staticfile/raw/e999a5f0477542c51591e64e03942a1d45fe77eb/codepen/eMpyRR/Taylor%20Swift-We%20Are%20Never%20Ever%20Getting%20Back%20Together.lrc"
            },
            {
                track: "https://bitbucket.org/kyicy/staticfile/raw/e999a5f0477542c51591e64e03942a1d45fe77eb/codepen/eMpyRR/Adam%20Lambert-Sleepwalker.mp3",
                cover: "https://bytebucket.org/kyicy/staticfile/raw/e999a5f0477542c51591e64e03942a1d45fe77eb/codepen/eMpyRR/Adam%20Lambert-Sleepwalker.jpg",
                artist: "Adam Lambert",
                title: "Sleepwalker",
                lrc: "https://bitbucket.org/kyicy/staticfile/raw/e999a5f0477542c51591e64e03942a1d45fe77eb/codepen/eMpyRR/Adam%20Lambert-Sleepwalker.lrc"
            },
            {
                track: "https://raw.githubusercontent.com/ntheile/soundblock/master/src/assets/music/Super%20Mario.mp3",
                cover: "https://bytebucket.org/kyicy/staticfile/raw/e999a5f0477542c51591e64e03942a1d45fe77eb/codepen/eMpyRR/Adam%20Lambert-Sleepwalker.jpg",
                artist: "Nick Theile",
                title: "Super Mario",
                lrc: "https://bitbucket.org/kyicy/staticfile/raw/e999a5f0477542c51591e64e03942a1d45fe77eb/codepen/eMpyRR/Adam%20Lambert-Sleepwalker.lrc"
            }

        ]

        var player = new Player(songs);
    }


}
