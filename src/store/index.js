import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function isParentChapter(catalogue, s_name) {
    let result = null;
    for (let i = 0; i < catalogue.length; i++) {
        let item = catalogue[i]
        let r = item.children.find(element => element.name === s_name)
        if (r !== undefined) {
            result = item
        }
    }
    return result.name
}

const store = new Vuex.Store({
    state: {
        courseCatalogue: []
    },
    mutations: {
        updateCatalogue(state, payload) {
            state.courseCatalogue = payload
        }
    },
    actions: {
        async getCatalogue({commit}, payload) {
            let cataLogue = []
            //这里不能使用this.$axios，this为Store
            const {data: res} = await Vue.prototype.$axios.post('course/getCourseCatalogue?',{'id':payload.cid})
            if (res.status === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    let chapter = res.data[i]
                    let resultChapter = {}
                    resultChapter.id = chapter.id
                    resultChapter.name = `第${chapter.id}周 ` + chapter.title
                    resultChapter.children = []
                    for (let j = 0; j < chapter.videoList.length; j++) {
                        let section = chapter.videoList[j]
                        let resultSection = {}
                        resultSection.id = parseFloat(resultChapter.id + "." + section.order_id)
                        resultSection.name = `${chapter.id}.${section.order_id} ` + section.title
                        resultSection.orderId = section.order_id
                        resultSection.videoUrl = section.video_url
                        resultChapter.children.push(resultSection)
                    }
                    cataLogue.push(resultChapter)
                }
            }
            commit('updateCatalogue',cataLogue)
        }
    },
    getters: {
        chapterItems: state => {
            return state.courseCatalogue.map(value => value.name)
        },
        sectionItems: (state) => (c_name) => {
            return state.courseCatalogue.find(value => value.name === c_name).children.map(item => item.name)
        },
        selectedChapter: (state) => (s_name) => {
            return isParentChapter(state.courseCatalogue,s_name)
        }
    }
})

export default store