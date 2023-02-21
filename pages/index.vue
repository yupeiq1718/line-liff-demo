<script setup lang="ts">
import liff from '@line/liff'

const initLiff = async () => {
  await liff.init({ liffId: '1657932563-DQvjBJWz' })
  lineData.os = liff.getOS() || ''
  lineData.language = liff.getLanguage() || ''
  lineData.version = liff.getVersion() || ''
}

const lineData = reactive({
  os: '',
  language: '',
  version: '',
  lineVersion: ''
})

const lineInfos = computed(() => ([
  {
    name: '環境',
    value: lineData.os
  },
  {
    name: '語言',
    value: lineData.language
  },
  {
    name: '版本',
    value: lineData.version
  }
]))

onBeforeMount(async () => {
  await initLiff()

  if (liff.isLoggedIn()) {
    alert('已登入')
  } else {
    liff.login()
    alert('未登入')
  }
})

</script>

<template>
  <div class="p-4">
    <header>
      <h1 class="text-xl mb-4">
        LINE LIFF
      </h1>
    </header>
    <article>
      <table class="border-spacing-2 border border-slate-400">
        <tr
          v-for="info of lineInfos"
          :key="info.name"
        >
          <td class="border border-slate-300 px-4 py-2">
            {{ info.name }}
          </td>
          <td class="border border-slate-300 px-4 py-2">
            {{ info.value }}
          </td>
        </tr>
      </table>
    </article>
  </div>
</template>
