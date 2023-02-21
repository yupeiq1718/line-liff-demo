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
  lineVersion: '',
  accessToken: '',
  idToken: ''
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
  },
  {
    name: 'Access Token',
    value: lineData.accessToken
  },
  {
    name: 'ID Token',
    value: lineData.idToken
  }

]))

const login = () => {
  if (liff.isLoggedIn()) {
    lineData.accessToken = liff.getAccessToken() || ''
    navigateTo('/private')
  } else {
    liff.login()
  }
}

const getIDToken = () => {
  lineData.idToken = liff.getIDToken() || ''
}

const sendMessages = () => {
  liff.sendMessages([{
    type: 'text',
    text: lineData.idToken
  }])
}

onBeforeMount(async () => {
  await initLiff()
  lineData.accessToken = liff.getAccessToken() || ''
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
    <br>
    <footer>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="login"
      >
        Login
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="getIDToken"
      >
        Get ID Token
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="sendMessages"
      >
        Send Messages
      </button>
    </footer>
  </div>
</template>
