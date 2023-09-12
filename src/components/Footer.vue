<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="nft-footer">
    <div class="container">
      <div class="links-wrap">
        <a
          target="_blank"
          href="https://github.com/lesser-P/fishnf-front-demo.git"
          class="link-item"
          >前端代码仓库</a
        >
      </div>
      <div class="links-wrap">
        <a
          target="_blank"
          href="https://github.com/lesser-P/fish-contract"
          class="link-item"
          >合约代码仓库，
        </a>
      </div>
    </div>
  </footer>
</template>
<script></script>
<style>
.nft-footer {
  width: 80%;
  margin: 300px auto;
  height: 100px;
  overflow: hidden;
}
.container {
  height: 100%;

  align-items: center;
  margin: auto;
  position: relative;
  z-index: 2;
  width: 80%;
}
.links-wrap {
  float: right;
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
