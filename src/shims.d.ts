declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}

declare module '*.gif' {
  export const gif: any
}

// TODO: remove this part after vue-count-to has its typescript file
declare module 'vue-count-to'

// TODO: remove this part after vuedraggable has its typescript file
declare module 'vuedraggable'

// TODO: remove this part after vue2-dropzone has its typescript file
declare module 'vue2-dropzone'

declare module 'vue-apollo'
