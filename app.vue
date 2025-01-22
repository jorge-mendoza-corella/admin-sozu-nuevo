<script setup lang="ts">
// import firebase
import type { User } from 'firebase/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// import user state
const currentUser = useUser()
// get auth instance
const auth = getAuth()
// import router and route
const router = useRouter()
const route = useRoute()
// declare loading state
const loading = ref(true)
// watch user state
watch(currentUser.value, async (user) => {
  if (user.uid) {
    const searchParams = new URLSearchParams(window.location.search)
    const paramValue = searchParams.get('redirect')
    const redirect = paramValue || '/app'
    router.push(redirect)
    // loading state to false after 0 seg
    await simulaCarga(200,false)
  }
  else{
    router.push('/')
    // loading state to false after 500ms
    await simulaCarga(200,false)
  }
})

// Función para simular carga
async function simulaCarga(tiempo: number | undefined, valor: boolean) {
  loading.value = true; // Activa el estado de carga
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      loading.value = valor ?? false; // Activa/Desactiva después del tiempo especificado, por defecto lo desactiva
      resolve();
    }, tiempo ?? 0) // Si `tiempo` es `undefined`, usa 0 por defecto
  );
}


// async function to check user
async function checkUser(user: User | null) {
  if (user?.uid) {
    // refresh id token after 2 seconds
      await simulaCarga(2000,true)
      // @ts-expect-error: getIdToken is not a function
      await auth.currentUser.getIdToken(true)
      // @ts-expect-error: getIdTokenResult is not a function
      const token = await auth.currentUser.getIdTokenResult()
      currentUser.value.uid = user.uid
      currentUser.value.email = user.email
      currentUser.value.name = user.displayName
      currentUser.value.photo = user.photoURL
      currentUser.value.internal = token.claims?.internal as boolean || false
      currentUser.value.admin = token.claims?.admin as boolean || false
      currentUser.value.contracts = token.claims?.contracts as boolean || false
      currentUser.value.landings = token.claims?.landings as boolean || false
      currentUser.value.deliveries = token.claims?.deliveries as boolean || false
      currentUser.value.credits = token.claims?.credits as boolean || false
  }
  else {
    currentUser.value.uid = null
    currentUser.value.email = null
    currentUser.value.name = null
    currentUser.value.photo = null
    currentUser.value.internal = null
    currentUser.value.admin = null
    currentUser.value.contracts = null
    currentUser.value.landings = null
    currentUser.value.deliveries = null
    currentUser.value.credits = null
    loading.value = false
  }
}
// check user before mounting component
onBeforeMount(() => {
  onAuthStateChanged(auth, (user) => {
    checkUser(user)
  })
})
</script>

<template>
  <div>
    <Html lang="es-MX">
      <NuxtLayout>
        <LoadingState v-if="loading" />
        <NuxtPage v-else />
        <AppNotifications />
      </NuxtLayout>
    </Html>
  </div>
</template>

<style lang="css">
  *:focus {
    box-shadow: none !important;
    -webkit-tap-highlight-color: transparent;
  }
  body {
    font-family: var(--font-family);
    background-color: var(--surface-ground);
    color: var(--text-color);
    padding: 0;
    margin: 0;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .content {
    max-width: 1441px;
    margin: 0 auto;
  }
  .p-tabview-nav {
    border-radius: .5rem .5rem 0 0;
  }
  .p-dialog-header {
    display: flex !important;
    justify-content: space-between !important;
  }
  .p-datatable-table {
    width: 100% !important;
  }
  .p-dialog .p-dialog-content:last-of-type {
    border-radius: 6px;
  }
  .p-autocomplete-panel {
    max-width: 0;
  }
  .p-speeddial-action {
    text-decoration: none !important;
  }
  .p-toast-message-content {
    align-items: center !important;
  }
  @media screen and (max-width: 768px) {
    .table-header {
      align-items: center !important;
    }
  }
</style>
