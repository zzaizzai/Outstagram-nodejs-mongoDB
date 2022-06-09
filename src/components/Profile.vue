<template>
  <div>
    <div>_id: {{ $store.state.myUserData.uid }}</div>
    <div>name: {{ $store.state.myUserData.userName }}</div>
    <div>id: {{ $store.state.myUserData.userEmail }}</div>
    <div>content: {{ $store.state.myUserData.userContent }}</div>
    <div>profileUrl: {{ $store.state.myUserData.userProfileurl }}</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>