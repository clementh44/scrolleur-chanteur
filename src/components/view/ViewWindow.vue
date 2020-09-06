<template>
<div :class="['user-select-none', live ? settings.viewTheme : settings.defaulTheme]" :style="[ live ? {cursor: smallCursor} : '' ]">
    <template v-if="element.type == 'song'">
        <div :class="['song', live ? settings.padding : '']" :style="[ live ? {fontSize: settings.fontSize+'em'} : '' ]">
            <div class="title mb-1" v-show="!live || settings.viewTitle">{{ element.title }}</div>

            <div v-for="(lyrics, index) in element.lyrics"
            :key="index"
            :class="[lyrics.type, {show : lyrics.show, sticky : lyrics.sticky}, update]"
            @click="toggleLyrics(lyrics)">{{ lyrics.text }}</div>
        </div>
        <div class="empty"></div>
    </template>

    <template v-else-if="element.type == 'text'">
        <div :class="['custom-text', settings.padding]" :style="{ fontSize: settings.fontSize+'em' }">
            <div class="title" v-if="element.isTitleDisplayed">{{ element.title }}</div>
            <div class="custom-text-body">{{ element.text }}</div>
        </div>
        <div class="empty"></div>
    </template>

    <template v-else-if="element.type == 'file'">
        <img :src="element.file" class="img-fluid">
        <div class="empty"></div>
    </template>

    <table v-else-if="element.type == 'grid'" id="screenTable">
		<tbody>
			<tr v-for="(line, index) in 10" :key="index">
				<td v-for="(column, index) in 10" :key="index">&nbsp;</td>
			</tr>
		</tbody>
	</table>

    <div v-else-if="element.type == 'empty'" class="empty"></div>
</div>
</template>

<script>
export default {
    name: 'ViewWindow',
    props: {
        element: Object,
        settings: Object,
        live: Boolean
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
                    lyrics.show = !lyrics.show
                    break;
                case "translation":
                    break;
                default:
                    break;
            }
            this.update++ //pour forcer la mise à jour
        }
    }
}
</script>

<style scoped src="./ViewWindow.css">

</style>