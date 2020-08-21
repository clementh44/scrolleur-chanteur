<template>
<div :class="[parameters.viewTheme]">
    <template v-if="element.type == 'song'">
        <div :class="['song', parameters.padding]" :style="{ fontSize: parameters.fontSize+'em' }">
            <div class="title mb-1">{{ element.title }}</div>

            <div :key="index" v-for="(lyrics, index) in element.lyrics" :class="[lyrics.type, {sticky: lyrics.sticky, show: lyrics.show}]" @click="toggleLyrics(lyrics, index)">{{ lyrics.text }}</div>
        </div>
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
        parameters: Object
    },
    data() {
        return {
        }
    },
    components: {
    },
    methods: {
        toggleLyrics: function(lyrics, index) {
            // Mise à jour du style non automatique
            switch (lyrics.type) {
                case "chorus":
                    this.$set(this.element.lyrics[index], "sticky", !lyrics.sticky)
                    break;
                case "verse":
                    this.$set(this.element.lyrics[index], "show", !lyrics.show)
                    break;
                case "translation":
                    break;
                default:
                    break;
            }
        },
        lyricsClass: function(lyrics) {
            var tab = [lyrics.type]
            switch (lyrics.type) {
                case "chorus":
                    tab.push(lyrics.sticky ? "sticky": "")
                    break;
                case "verse":
                    tab.push(lyrics.show ? "show": "")
                    break;
                case "translation":
                    break;
                default:
                    break;
            }
            return tab
        }
    }
}
</script>

<style scoped src="./ViewWindow.css">

</style>