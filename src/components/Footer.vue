<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="nft-footer">
    <div class="container">
      <div class="links-wrap">
        <a
          target="_blank"
          href="https://github.com/lesser-P/fishnf-front-demo.git"
          class="link-item"
          >GITHUB 仓库</a
        >
      </div>
    </div>
  </footer>
</template>
<script></script>
<style>
.nft-footer {
  width: 80%;
  margin: 0 auto;
  height: 225px;
  overflow: hidden;
}
.container {
  height: 100%;
  display: flex;
  align-items: center;
  margin: auto;
  position: relative;
  z-index: 2;
  width: 80%;
}
.links-wrap {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.link-item {
  display: block;
  text-decoration: none;
  color: cadetblue;
  &:hover {
    text-decoration: underline;
  }
}
</style>
