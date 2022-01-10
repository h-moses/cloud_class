import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 查找该子章节的父章节
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
        courseCatalogue: [],
        userInfo: null,
        isLogin: false,
        lazySrc: 'http://edu-image.nosdn.127.net/6e66dbdc55464a44889c6a25428b2b4b.png?imageView&quality=100'
    },
    mutations: {
        updateCatalogue(state, payload) {
            state.courseCatalogue = payload
        },
        updateUserInfo(state, payload) {
            state.userInfo = payload
            state.isLogin = true
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
        },
        async loginUser({commit}, payload) {
            const {data: res} = await Vue.prototype.$axios.post('user/login',payload)
            if (res.status === 200 && res.data !== {}) {
                commit('updateUserInfo', res.data)
            } else {
                commit('updateUserInfo', null)
            }
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
        },
        userName: state => {
            if (state.userInfo === null) {
                return '登录 | 注册'
            } else {
                return state.userInfo.nick_name === null ? '登录 | 注册' : state.userInfo.nick_name
            }
        },
        uid: state => {
            if (state.userInfo === null) {
                return ''
            } else {
                return state.userInfo.uid
            }
        },
        userAvatar: state => {
            if (state.userInfo === null) {
                return ''
            } else {
                return state.userInfo.avatar
            }
        }
    }
})

export default store