<template>
  <div id="links">
    <h1 class="title">友链</h1>
    <p class="paragraph">这里是我的一些链接，欢迎访问和联系。</p>
    <hr />

    <div id="links-container">
      <div class="card bg-info text-base-content w-96">
        <div class="card-body">
          <h2 class="card-title">APRS工具</h2>
          <p>查看APRS实时信息。</p>
          <div class="card-actions justify-end">
            <button
              class="btn"
              onclick="window.open('http://www.aprsonline.cn')"
            >
              访问
            </button>
          </div>
        </div>
      </div>

      <div class="card bg-primary text-base-content w-96">
        <div class="card-body">
          <h2 class="card-title">虚位以待</h2>
          <p>期待加入</p>
          <div class="card-actions justify-end">
            <button class="btn" disabled="true">访问</button>
          </div>
        </div>
      </div>

      <div class="card bg-accent text-base-content w-96">
        <div class="card-body">
          <h2 class="card-title">虚位以待</h2>
          <p>期待加入</p>
          <div class="card-actions justify-end">
            <button class="btn" disabled="true">访问</button>
          </div>
        </div>
      </div>

      <div class="card bg-secondary text-base-content w-96">
        <div class="card-body">
          <h2 class="card-title">虚位以待</h2>
          <p>期待加入</p>
          <div class="card-actions justify-end">
            <button class="btn" disabled="true">访问</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.paragraph {
  font-size: 16px;
  margin-bottom: 20px;
}
#links-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
}
</style>
