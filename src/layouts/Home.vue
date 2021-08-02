<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-black"
      style="height:50px;border-bottom:1px solid #e0e0e0;box-shadow:0 0 0 #fff"
    >
      <q-toolbar>
        <img
          :src="settingForm.ds_logo"
          style="width:60px;height:50px;cursor:pointer"
          class="q-ml-lg"
          @click="jump()"
        />
        <q-toolbar-title>
          <span style="cursor:pointer" class="text-h6 q-ml-sm">
            {{ settingForm.ds_name }}
          </span>
          <span
            class="text-subtitle1 q-ml-xl"
            style="cursor:pointer"
            @click="jump()"
          >
            文档首页
          </span>
          <span
            class="text-subtitle1 q-ml-xl"
            style="cursor:pointer"
            @click="jumpToIndex()"
          >
            站点首页
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "topTab",
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
      settingForm: {},
      title: ""
    };
  },
  meta() {
    return {
      title: this.title,
      titleTemplate: title => `${title} `
    };
  },
  created() {
    this.getSetting();
  },
  methods: {
    getSetting() {
      this.$store.dispatch("home/getSetting").then(res => {
        if (res.code == 200) {
          this.settingForm = res.data;

          if (res.data) {
            if (res.data.ds_name) {
              this.title = res.data.ds_name;
            }
          }
        }
      });
    },
    jumpToIndex() {
      if (this.settingForm && this.settingForm.ds_web_url) {
        window.location.href = this.settingForm.ds_web_url;
      }
    },
    jump() {
      if (this.$route.path != "/index") {
        this.$router.push({ name: "index" });
      }
    }
  }
};
</script>
