<template>
  <q-page>
    <div
      class="row justify-center"
      style="padding-top:40px"
      :style="{ padding: screenWidth > 1023 ? '15px 14%' : '15px 5%' }"
    >
      <div class="col">
        <q-input
          outlined
          rounded
          bottom-slots
          v-model="search"
          class="q-pb-none bg-white"
          placeholder="输入关键字搜索"
          style="font-size:20px;border-radius:30px"
          @keyup.enter="getProjectData"
          @input="getProjectData"
        >
          <template v-slot:append v-if="search != ''">
            <q-icon
              name="close"
              class="q-mr-md cursor-pointer"
              @click="cleanSearch"
            ></q-icon>
          </template>
          <template v-slot:append v-else>
            <q-icon name="search" class="q-mr-md cursor-pointer"></q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div :style="{ padding: screenWidth > 1023 ? '15px 14%' : '15px 5%' }">
      <div class="row q-pt-md q-col-gutter-md">
        <div
          class="col-md-3 col-6 cursor-pointer"
          @click="
            $router.push({
              name: 'userDocs',
              query: { id: i.id }
            })
          "
          v-for="(i, index) in projectData"
          :key="index"
        >
          <q-card flat bordered class="q-pa-md text-center">
            <div>
              <img
                :src="i.dp_cover_image"
                alt=""
                style="width:100px;height:100px;border-radius:20px"
              />
            </div>

            <div class="text-h6 q-mt-md ellipsis">
              {{ i.dp_title }}
            </div>
            <div
              class="q-mt-md text-subtitle1 ellipsis-2-lines"
              style="height:56px"
            >
              {{ i.dp_description }}
            </div>
            <div class="q-mt-md text-blue-8">
              查看文档<q-icon name="keyboard_arrow_right" />
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <div class="bg-white q-mt-xl q-pb-sm">
      <q-separator color="grey-5" class="q-my-sm" />
      <div v-html="settingForm.ds_copyright"></div>
    </div>
  </q-page>
</template>

<script>
import { Screen } from "quasar";
export default {
  name: "document",
  components: { Screen },
  data() {
    return {
      search: "",
      screenWidth: this.$q.screen.width,
      projectData: [],
      settingForm: {}
    };
  },
  mounted() {},
  created() {
    this.search = this.$route.params.text;
    this.getProjectData();
    this.getItem();
    window.addEventListener("resize", this.handleResize);
  },
  computed: {},
  methods: {
    getItem() {
      this.$store.dispatch("home/getSetting").then(res => {
        if (res.code == 200) {
          this.settingForm = res.data;
        }
      });
    },
    handleResize(event) {
      this.screenWidth = document.documentElement.clientWidth;
    },
    cleanSearch() {
      this.search = "";
      this.getProjectData();
    },
    getProjectData() {
      const obj = {
        text: this.search
      };
      this.$store
        .dispatch("home/getProject", obj)
        .then(res => {
          if (res.code == 200) {
            this.projectData = res.data ? res.data : [];
          }
        })
        .catch(error => {
          this.$q.notify({
            message: "失败",
            icon: "ion-close-circle-outline",
            timeout: 500,
            position: "top-right",
            caption: "操作失败",
            color: "red"
          });
        });
    }
  }
};
</script>

<style scoped>
.change:hover {
  color: #2196f3;
}
.box {
  background: #f5f5f5;
}
</style>
