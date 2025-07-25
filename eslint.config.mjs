// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      // 代码风格
      '@stylistic/quote-props': ['error', 'as-needed'], // 属性名引号|as-needed只有在必要时才使用引号always所有对象属性都加引号never不使用引号
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      'no-debugger': 'error', // debugger 直接报错
      // 'no-console': ['error', { allow: ['warn', 'error'] }],
      semi: ['error', 'never'], // 不使用分号
      quotes: ['error', 'single'], // 单引号
      indent: ['error', 2], // 两空格缩进

      // Vue 相关
      'vue/singleline-html-element-content-newline': [
        'error',
        {
          ignoreWhenNoAttributes: true,
          ignoreWhenEmpty: true,
          ignores: ['pre', 'textarea', 'NuxtLink', 'RouterLink', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 5 },
          multiline: { max: 1 },
        },
      ],
    },
  },
)
