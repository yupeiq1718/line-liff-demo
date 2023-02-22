<script setup lang="ts">
import liff from '@line/liff'

interface LineData {
  os?: string,
  language?: string,
  version?: string,
  lineVersion?: string | null,
  isInClient?: boolean,
  context?: any|null,
  accessToken?: string|null,
  profile?: any|null,
  idToken?: string|null,
  decodedIDToken?: any|null,
  friendship?: any|null,
  code?: any|null
}

const lineData = reactive<LineData>({
  os: '',
  language: '',
  version: '',
  lineVersion: '',
  isInClient: false,
  context: null,
  accessToken: '',
  profile: null,
  idToken: '',
  decodedIDToken: null,
  friendship: null
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
    name: 'SDK 版本',
    value: lineData.version
  },
  {
    name: 'LINE 版本',
    value: lineData.lineVersion
  },
  {
    name: '是否內部瀏覽器',
    value: lineData.isInClient
  },
  {
    name: '用戶資訊',
    value: lineData.context
  },
  {
    name: 'Access Token',
    value: lineData.accessToken
  },
  {
    name: 'Get Profile',
    value: lineData.profile
  },
  {
    name: 'ID Token',
    value: lineData.idToken
  },
  {
    name: 'Decoded ID Token',
    value: lineData.decodedIDToken
  },
  {
    name: 'Friendship',
    value: lineData.friendship
  },
  {
    name: 'QRcode',
    value: lineData.code
  }

]))

const initLiff = async () => {
  await liff.init({ liffId: '1657932563-DQvjBJWz' })
  lineData.os = liff.getOS()
  lineData.language = liff.getLanguage()
  lineData.version = liff.getVersion()
  lineData.lineVersion = liff.getLineVersion()
  lineData.isInClient = liff.isInClient()
  lineData.context = liff.getContext()
}

const login = () => {
  if (!liff.isLoggedIn()) {
    liff.login()
    alert('Login')
  } else {
    alert('Already Login')
  }
}

const logout = () => {
  if (liff.isLoggedIn()) {
    liff.logout()
    alert('Logout')
  } else {
    alert('Already Logout')
  }
}

const getAccessToken = () => {
  lineData.accessToken = liff.getAccessToken()
}

const getProfile = async () => {
  lineData.profile = await liff.getProfile()
}

const getIDToken = () => {
  lineData.idToken = liff.getIDToken()
}

const getDecodedIDToken = () => {
  lineData.decodedIDToken = liff.getDecodedIDToken()
}

const getFriendship = async () => {
  lineData.friendship = await liff.getFriendship()
}

const sendMessages = () => {
  liff.sendMessages([{
    type: 'text',
    text: 'sendMessages'
  }])
}

const shareTargetPicker = async () => {
  const response = await liff.shareTargetPicker([{
    type: 'text',
    text: 'shareTargetPicker'
  }]).catch((error) => {
    console.error(error)
    alert(error)
  })

  if (response) {
    alert('Success')
  }
}

const scanCode = () => {
  lineData.code = liff.scanCodeV2()
}

onBeforeMount(async () => {
  await initLiff()
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
        @click="logout"
      >
        Logout
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="getAccessToken"
      >
        Get Access Token
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="getProfile"
      >
        Get Profile
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="getIDToken"
      >
        Get ID Token
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="getDecodedIDToken"
      >
        Get Decoded ID Token
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="getFriendship"
      >
        Get Friendship
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="sendMessages"
      >
        Send Messages
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="shareTargetPicker"
      >
        Share Target Picker
      </button>
      <button
        class="border-2 border-slate-300 hover:bg-slate-300 px-2 py-1 mb-2 mr-2"
        @click="scanCode"
      >
        Scan Code
      </button>
    </footer>
  </div>
</template>
