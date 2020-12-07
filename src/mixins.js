export const oss = {
    data() {
        return {
            oss_url: process.env.VUE_APP_ALI_OSS_URL,
            oss_cdn: process.env.VUE_APP_ALI_OSS_CDN,
        }
    }
}

export const scroll = {
    data() {
        return {
            scroll_config: {
                always: false,
                smooth: true,
                notSmoothOnInit: true,
                scrollonremoved: true,
                smoothonremoved: false
            },
        }
    }
}
