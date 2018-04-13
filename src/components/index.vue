<template>
  <div>
      <mt-header fixed="fixed" :title="title" >
        <!-- <mt-button icon="more" slot="left"></mt-button> -->
        <mt-spinner type="double-bounce"  slot="left" color="#fff" v-if='"loading"==loadStatus'></mt-spinner>
        <span class="Addr" @click="localMe" slot="left" v-else-if='"loaded"==loadStatus'>{{fullAddress}}</span>
        <span class="Addr" @click="localMe" slot="left" v-else-if='"unload"==loadStatus'>点击定位</span>
      </mt-header>


      <mt-tab-container v-model="selected" :swipeable="swipeable">

        <mt-tab-container-item id="index">
          <mt-cell v-for="n in 30" title="index">
            <mt-button type="default">default</mt-button>
          </mt-cell>
        </mt-tab-container-item>

        <mt-tab-container-item id="order">
          <mt-cell v-for="n in 5" title="order">
          </mt-cell>
        </mt-tab-container-item>

        <mt-tab-container-item id="account">
          <mt-cell v-for="n in 7" title="account">
          </mt-cell>
        </mt-tab-container-item>

      </mt-tab-container>

      <mt-tabbar v-model="selected" fixed="fixed">
        <mt-tab-item id="index">
          <img slot="icon" src="../assets/100x100.png">
          首页
        </mt-tab-item>
        <mt-tab-item id="order">
          <img slot="icon" src="../assets/100x100.png">
          订单
          <mt-badge size="small" color="red" v-if="orderQueue">{{orderQueue.length}}</mt-badge>
        </mt-tab-item>
        <mt-tab-item id="account">
          <img slot="icon" src="../assets/100x100.png">
          我的
        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>
<script>
export default {
  name: "index",
  methods: {
    localMe() {
      this.loadStatus = 'loading';
      let self = this;
      AMap.service(["AMap.Geolocation"], function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", data => {
          console.log(data, self);
          var position = data.position;
          self.fullAddress = data.formattedAddress;
          self.lng = position.lng;
          self.lat = position.lat;
          self.loadStatus = 'loaded';
        }); //返回定位信息
      });
    }
  },
  data() {
    let self = this;
    return {
      title: "Home Page",
      selected: "index",
      swipeable: true,
      orderQueue: ["a", "s"],
      loaded: true,
      lat: 0,
      lng: 0,
      fullAddress: "",
      loadStatus: "unload" //loaded,unload
    };
  }
};
</script>
<style scoped>
.Addr {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;

  width: 60px;
  height: 24px;
  display: block;
}
</style>
