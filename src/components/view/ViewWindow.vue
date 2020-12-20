<template>
<div :class="['user-select-none', live ? settings.liveView.viewTheme : settings.liveView.defaulTheme]" :style="[ live ? {cursor: smallCursor} : '' ]">
    <transition name="fade" :duration="duration">
        <div key="{{element.title}}" v-if="element.type == 'song'" :class="['song', live ? 'px-' + settings.liveView.padding : '']" :style="[ live ? {fontSize: settings.liveView.fontSize+'em'} : '' ]">
            <div class="title mb-1" v-show="!live || settings.song.showTitle">{{ element.title }}</div>
            <div class="secli" v-show="haveSecliToShow()">{{ getSecliString() }}</div>

            <div v-for="(lyrics, index) in element.lyrics"
            :key="index"
            :class="[lyrics.type, {show : lyrics.show, sticky : lyrics.sticky}, update]"
            :style="[lyrics.type == 'chorus' || lyrics.show ? '' : {opacity: settings.song.verseOpacity}]"
            @click="toggleLyrics(lyrics)">{{ lyrics.text }}</div>
        </div>

        <div key="text" v-else-if="element.type == 'text'" :class="['custom-text', live ?  'px-' + settings.liveView.padding : '']" :style="[ live ? {fontSize: settings.liveView.fontSize+'em'} : '' ]">
            <div class="title" v-if="element.isTitleDisplayed">{{ element.title }}</div>
            <div class="custom-text-body">{{ element.text }}</div>
        </div>

        <div key="file" v-else-if="element.type == 'file'" class="file">
            <img :src="element.file" :style="{width: element.width + '%'}">
        </div>

        <table v-else-if="element.type == 'grid'" id="screenTable">
            <tbody>
                <tr v-for="(line, index) in 10" :key="index">
                    <td v-for="(column, index) in 10" :key="index">&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </transition>

    <div class="empty"></div>
</div>
</template>

<script>
export default {
    name: 'ViewWindow',
    props: {
        element: Object,
        settings: Object,
        live: Boolean,
        duration: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            update: 0,
            smallCursor: `url("data:image/svg+xml, %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='32px' height='32px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E  %3Ctext stroke='%23ffffff' transform='matrix(12.617019653320312,0,0,12.617019653320312,-2852.15984082222,-2618.911868095398) ' xml:space='preserve' text-anchor='start' font-family='Helvetica, Arial, sans-serif' font-size='40' y='247.63125' x='229.70045' stroke-width='2' fill='%23000000'%3E•%3C/text%3EE %3C/svg%3E") 8 20, pointer`
        }
    },
    components: {
    },
    methods: {
        toggleLyrics: function(lyrics) {
            switch (lyrics.type) {
                case "chorus":
                    lyrics.sticky = !lyrics.sticky
                    break;
                case "verse":
                case "translation":
                    lyrics.show = !lyrics.show
                    break;
                default:
                    break;
            }
            this.update++ //pour forcer la mise à jour
        },
        getSecliArray: function() {
            let array = []
            if ((!this.live || this.settings.song.showRating) && this.element.rating) {
                array.push(this.element.rating)
            }
            if (this.settings.song.showRating && this.element.newrating) {
                if (array.length > 0) {
                    array.push("/")
                }
                array.push(this.element.newrating)
            }

            if ((!this.live || this.settings.song.showWriter) && this.element.writer) {
                if (array.length > 0) {
                    array.push(" | ")
                }
                array.push(" Paroles : " + this.element.writer)
            }

            if ((!this.live || this.settings.song.showComposer) && this.element.composer) {
                if (array.length > 0) {
                    array.push(" | ")
                }
                array.push(" Musique : " + this.element.composer)
            }

            if ((!this.live || this.settings.song.showPublisher) && this.element.publisher) {
                if (array.length > 0) {
                    array.push(" | ")
                }
                array.push(" Éditeur : " + this.element.publisher)
            }
            console.info(array)
            return array
        },
        haveSecliToShow: function() {
            return this.getSecliArray().length > 0
        },
        getSecliString: function() {
            return this.getSecliArray().join('')
        }
    }
}
</script>

<style scoped src="./ViewWindow.css">

</style>