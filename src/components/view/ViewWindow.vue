<template>
<div :class="[parameters.viewTheme]">
    <template v-if="element.type == 'song'">
        <div :class="['song', parameters.padding]" :style="{ fontSize: parameters.fontSize+'em' }">
            <div class="title mb-1" v-show="parameters.viewTitle">{{ element.title }}</div>

            <div v-for="(lyrics, index) in element.lyrics"
            :key="index"
            :class="['user-select-none', lyrics.type, {show : lyrics.show, sticky : lyrics.sticky}, update]"
            @click="toggleLyrics(lyrics)">{{ lyrics.text }}</div>
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
            update: 0
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