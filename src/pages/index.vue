<template>
  <q-page>
    <q-img
      :ratio="16 / 9"
      :style="{
        height: this.$q.screen.height * 0.3 + 'px',
        'min-height': this.$q.screen.height * 0.3 + 'px'
      }"
      :src="settingForm.ds_homepage_image"
    >
      <div
        class="absolute-full row transparent text-subtitle2 flex flex-center"
      >
        <div
          class=" text-center text-black q-mt-xl col-12"
          :class="screenWidth > 1000 ? 'text-h3' : 'text-h5'"
        >
          {{ settingForm.ds_homepage_title }}
        </div>

        <div class="col-10 q-mt-md text-center">
          <q-input
            outlined
            rounded
            bottom-slots
            v-model="search"
            class="q-pb-none bg-white"
            placeholder="输入关键字搜索"
            style="font-size:20px;border-radius:30px"
            @keyup.enter="
              $router.push({
                name: 'searchProject',
                params: { text: search }
              })
            "
          >
            <template v-slot:append>
              <q-icon
                name="search"
                class="q-mr-md cursor-pointer"
                @click="
                  $router.push({
                    name: 'searchProject',
                    params: { text: search }
                  })
                "
              ></q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </q-img>

    <!-- <div
      :style="{
        'background-image': 'url(' + settingForm.ds_homepage_image + ')'
      }"
      style="background-size:100% 100%;background-repeat:no-repeat;"
      class="q-pa-md"
    >
      <div
        class=" text-center text-black q-mt-xl"
        :class="screenWidth > 1000 ? 'text-h3' : 'text-h5'"
      >
        {{ settingForm.ds_homepage_title }}
      </div>

      <div class="row justify-center q-mt-xl">
        <div class="col-md-7 col-9">
          <q-input
            outlined
            rounded
            bottom-slots
            v-model="search"
            class="q-pb-none bg-white"
            placeholder="输入关键字搜索"
            style="font-size:20px;border-radius:30px"
            @keyup.enter="
              $router.push({
                name: 'searchProject',
                params: { text: search }
              })
            "
          >
            <template v-slot:append>
              <q-icon
                name="search"
                class="q-mr-md cursor-pointer"
                @click="
                  $router.push({
                    name: 'searchProject',
                    params: { text: search }
                  })
                "
              ></q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="text-center q-mt-lg q-pb-lg"></div>
    </div> -->
    <div
      :style="{ padding: screenWidth > 1300 ? '15px 14%' : '15px 5%' }"
      class="q-mt-lg"
    >
      <div class="text-h5 text-center">
        {{ homeData.project ? homeData.project.dp_title : "" }}
      </div>
      <div
        class="row q-mt-md q-col-gutter-lg"
        v-if="screenWidth > 1300"
        style="cursor:pointer"
      >
        <div class="col-6">
          <div
            class="row q-py-sm text-grey-8"
            style="border-bottom:1px dashed #e0e0e0"
            v-for="(i, index) in homeData.show"
            :key="index"
            v-if="index < 3"
            @click="
              $router.push({
                name: 'userDocs',
                query: { id: i.project_id, selected: i.id }
              })
            "
          >
            <div class="col-2">
              <div
                style="width:80px;height:80px;position:relative"
                class="bg-blue text-white q-pt-md text-center"
              >
                <q-chip
                  square
                  color="red"
                  text-color="white"
                  class="q-pa-xs q-ml-md"
                  style="position:absolute;top:-10px;left:-25px;"
                >
                  最新
                </q-chip>
                <div class="text-h5 text-bold">
                  {{ $q_date.formatDate(i.updated_at * 1000, "DD") }}
                </div>
                <div>
                  {{ $q_date.formatDate(i.updated_at * 1000, "YYYY-MM") }}
                </div>
              </div>
            </div>
            <div class="col-10">
              <div>
                <span class="q-ml-sm change cursor-pointer text-subtitle1">{{
                  i.da_title
                }}</span>
              </div>
              <div class="ellipsis text-grey q-ml-sm">
                {{
                  i.da_h5_content ? i.da_h5_content.replace(/<.+?>/g, "") : ""
                }}
              </div>
              <div class="q-ml-sm text-caption text-grey">
                查看详情<q-icon name="arrow_forward_ios" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div
            class="row q-py-sm text-grey-8"
            style="border-bottom:1px dashed #e0e0e0"
            v-for="(i, index) in homeData.show"
            :key="index"
            v-if="index >= 3"
            @click="
              $router.push({
                name: 'userDocs',
                query: { id: i.project_id, selected: i.id }
              })
            "
          >
            <div class="col-2">
              <div
                style="width:80px;height:80px;position:relative"
                class="bg-blue text-white q-pt-md text-center"
              >
                <q-chip
                  square
                  color="grey-4"
                  text-color="grey-8"
                  class="q-pa-xs q-ml-md"
                  style="position:absolute;top:-10px;left:-25px;"
                >
                  公告
                </q-chip>
                <div class="text-h5 text-bold">
                  {{ $q_date.formatDate(i.updated_at * 1000, "DD") }}
                </div>
                <div>
                  {{ $q_date.formatDate(i.updated_at * 1000, "YYYY-MM") }}
                </div>
              </div>
            </div>
            <div class="col-10">
              <div>
                <span class="q-ml-sm change cursor-pointer text-subtitle1">{{
                  i.da_title
                }}</span>
              </div>
              <div class="ellipsis text-grey q-ml-sm">
                {{
                  i.da_h5_content ? i.da_h5_content.replace(/<.+?>/g, "") : ""
                }}
              </div>
              <div class="q-ml-sm text-caption text-grey">
                查看详情<q-icon name="arrow_forward_ios" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row q-mt-md q-col-gutter-lg"
        v-else-if="screenWidth > 600"
        style="cursor:pointer"
      >
        <div class="col-12">
          <div
            class="row q-py-sm text-grey-8"
            style="border-bottom:1px dashed #e0e0e0"
            v-for="(i, index) in homeData.show"
            :key="index"
            v-if="index < 3"
            @click="
              $router.push({
                name: 'userDocs',
                query: { id: i.project_id, selected: i.id }
              })
            "
          >
            <div class="col-2">
              <div
                style="width: 80px; height: 80px; position: relative"
                class="bg-blue text-white q-pt-md text-center"
              >
                <q-chip
                  square
                  color="grey-4"
                  text-color="grey-8"
                  class="q-pa-xs q-ml-md"
                  style="position: absolute; top: -10px; left: -25px"
                >
                  公告
                </q-chip>
                <div class="text-h5 text-bold">
                  {{ $q_date.formatDate(i.updated_at * 1000, "DD") }}
                </div>
                <div>
                  {{ $q_date.formatDate(i.updated_at * 1000, "YYYY-MM") }}
                </div>
              </div>
            </div>
            <div class="col-10">
              <div>
                <span class="q-ml-sm change cursor-pointer text-subtitle1">{{
                  i.da_title
                }}</span>
              </div>
              <div class="ellipsis text-grey q-ml-sm">
                {{
                  i.da_h5_content ? i.da_h5_content.replace(/<.+?>/g, "") : ""
                }}
              </div>
              <div class="q-ml-sm text-caption text-grey">
                查看详情<q-icon name="arrow_forward_ios" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div
            class="row q-py-sm text-grey-8"
            style="border-bottom:1px dashed #e0e0e0"
            v-for="(i, index) in homeData.show"
            :key="index"
            v-if="index >= 3"
            @click="
              $router.push({
                name: 'userDocs',
                query: { id: i.project_id, selected: i.id }
              })
            "
          >
            <div class="col-2">
              <div
                style="width: 80px; height: 80px; position: relative"
                class="bg-blue text-white q-pt-md text-center"
              >
                <q-chip
                  square
                  color="red"
                  text-color="white"
                  class="q-pa-xs q-ml-md"
                  style="position: absolute; top: -10px; left: -25px"
                >
                  最新
                </q-chip>
                <div class="text-h5 text-bold">
                  {{ $q_date.formatDate(i.updated_at * 1000, "DD") }}
                </div>
                <div>
                  {{ $q_date.formatDate(i.updated_at * 1000, "YYYY-MM") }}
                </div>
              </div>
            </div>
            <div class="col-10">
              <div>
                <span class="q-ml-sm change cursor-pointer text-subtitle1">{{
                  i.da_title
                }}</span>
              </div>
              <div class="ellipsis text-grey q-ml-sm">
                {{
                  i.da_h5_content ? i.da_h5_content.replace(/<.+?>/g, "") : ""
                }}
              </div>
              <div class="q-ml-sm text-caption text-grey">
                查看详情<q-icon name="arrow_forward_ios" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row q-mt-md q-col-gutter-lg" v-else>
        <div class="col-12">
          <div
            class="row q-py-sm text-grey-8"
            style="border-bottom:1px dashed #e0e0e0"
            v-for="(i, index) in homeData.show"
            :key="index"
            v-if="index < 3"
            @click="
              $router.push({
                name: 'userDocs',
                query: { id: i.project_id, selected: i.id }
              })
            "
          >
            <div class="col-3">
              <div
                style="width: 80px; height: 80px; position: relative"
                class="bg-blue text-white q-pt-md text-center"
              >
                <q-chip
                  square
                  color="grey-4"
                  text-color="grey-8"
                  class="q-pa-xs q-ml-md"
                  style="position: absolute; top: -10px; left: -25px"
                >
                  公告
                </q-chip>
                <div class="text-h5 text-bold">
                  {{ $q_date.formatDate(i.updated_at * 1000, "DD") }}
                </div>
                <div>
                  {{ $q_date.formatDate(i.updated_at * 1000, "YYYY-MM") }}
                </div>
              </div>
            </div>
            <div class="col-9">
              <div>
                <span class="q-ml-sm change cursor-pointer text-subtitle1">{{
                  i.da_title
                }}</span>
              </div>
              <div class="ellipsis text-grey q-ml-sm">
                {{
                  i.da_h5_content ? i.da_h5_content.replace(/<.+?>/g, "") : ""
                }}
              </div>
              <div class="q-ml-sm text-caption text-grey">
                查看详情<q-icon name="arrow_forward_ios" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div
            class="row q-py-sm text-grey-8"
            style="border-bottom:1px dashed #e0e0e0"
            v-for="(i, index) in homeData.show"
            :key="index"
            v-if="index >= 3"
            @click="
              $router.push({
                name: 'userDocs',
                query: { id: i.project_id, selected: i.id }
              })
            "
          >
            <div class="col-3">
              <div
                style="width: 80px; height: 80px; position: relative"
                class="bg-blue text-white q-pt-md text-center"
              >
                <q-chip
                  square
                  color="red"
                  text-color="white"
                  class="q-pa-xs q-ml-md"
                  style="position: absolute; top: -10px; left: -25px"
                >
                  最新
                </q-chip>
                <div class="text-h5 text-bold">
                  {{ $q_date.formatDate(i.updated_at * 1000, "DD") }}
                </div>
                <div>
                  {{ $q_date.formatDate(i.updated_at * 1000, "YYYY-MM") }}
                </div>
              </div>
            </div>
            <div class="col-9">
              <div>
                <span class="q-ml-sm change cursor-pointer text-subtitle1">{{
                  i.da_title
                }}</span>
              </div>
              <div class="ellipsis text-grey q-ml-sm">
                {{
                  i.da_h5_content ? i.da_h5_content.replace(/<.+?>/g, "") : ""
                }}
              </div>
              <div class="q-ml-sm text-caption text-grey">
                查看详情<q-icon name="arrow_forward_ios" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row q-mt-xs q-pt-lg q-col-gutter-md">
        <div
          class="col-lg-3 col-md-4  col-sm-6 col-12 cursor-pointer"
          @click="
            $router.push({
              name: 'userDocs',
              query: { id: i.id }
            })
          "
          v-for="(i, index) in homeData.top"
          :key="index"
        >
          <q-card flat bordered class="q-pa-md text-center">
            <div>
              <img
                :src="i.dp_cover_image"
                alt=""
                style="width: 100px; height: 100px; border-radius: 20px"
              />
            </div>

            <div class="text-h6 q-mt-md ellipsis">
              {{ i.dp_title }}
            </div>
            <div
              class="q-mt-md text-subtitle1 ellipsis-2-lines"
              style="height: 56px"
            >
              {{ i.dp_description }}
            </div>
            <div class="q-mt-md text-blue-8">
              查看文档<q-icon name="keyboard_arrow_right" />
            </div>
          </q-card>
        </div>
      </div>
      <!-- <div class="row q-mt-xl q-col-gutter-xl">
        <div class="col-md-3 col-12 cursor-pointer" v-if="homeData.onlystore">
          <div class="box" style="border-radius:5px">
            <div
              class="bg-blue-7 q-pa-sm"
              style="border-top-left-radius:5px;border-top-right-radius:5px"
            >
              <div class="text-subtitle1 text-white text-bold">
                单店帮助说明
              </div>
              <div
                style="width: 30px;height: 4px;background-color: white;"
                class="q-my-sm"
              ></div>
            </div>
            <div class="q-px-lg q-pb-lg q-pt-md">
              <div
                class="q-mt-md cursor-pointer"
                v-for="i in homeData.onlystore"
                :key="i.id"
                @click="
                  $router.push({
                    name: 'userDocs',
                    query: { id: i.id }
                  })
                "
              >
                {{ i.dp_title }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12 cursor-pointer" v-if="homeData.chain">
          <div class="box" style="border-radius:5px">
            <div
              class="bg-blue-7 q-pa-sm"
              style="border-top-left-radius:5px;border-top-right-radius:5px"
            >
              <div class="text-subtitle1 text-white text-bold">
                连锁店店帮助说明
              </div>
              <div
                style="width: 30px;height: 4px;background-color: white;"
                class="q-my-sm"
              ></div>
            </div>
            <div class="q-px-lg q-pb-lg q-pt-md">
              <div
                class="q-mt-md cursor-pointer"
                v-for="i in homeData.chain"
                :key="i.id"
                @click="
                  $router.push({
                    name: 'userDocs',
                    query: { id: i.id }
                  })
                "
              >
                {{ i.dp_title }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12 cursor-pointer" v-if="homeData.frame">
          <div class="box" style="border-radius:5px">
            <div
              class="bg-blue-7 q-pa-sm"
              style="border-top-left-radius:5px;border-top-right-radius:5px"
            >
              <div class="text-subtitle1 text-white text-bold">
                框架帮助说明
              </div>
              <div
                style="width: 30px;height: 4px;background-color: white;"
                class="q-my-sm"
              ></div>
            </div>
            <div class="q-px-lg q-pb-lg q-pt-md">
              <div
                class="q-mt-md cursor-pointer"
                v-for="i in homeData.frame"
                :key="i.id"
                @click="
                  $router.push({
                    name: 'userDocs',
                    query: { id: i.id }
                  })
                "
              >
                {{ i.dp_title }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12 cursor-pointer" v-if="homeData.other">
          <div class="box" style="border-radius:5px">
            <div
              class="bg-blue-7 q-pa-sm"
              style="border-top-left-radius:5px;border-top-right-radius:5px"
            >
              <div class="text-subtitle1 text-white text-bold">
                服务及其他说明
              </div>
              <div
                style="width: 30px;height: 4px;background-color: white;"
                class="q-my-sm"
              ></div>
            </div>
            <div class="q-px-lg q-pb-lg q-pt-md">
              <div
                class="q-mt-md cursor-pointer"
                v-for="i in homeData.other"
                :key="i.id"
                @click="
                  $router.push({
                    name: 'userDocs',
                    query: { id: i.id }
                  })
                "
              >
                {{ i.dp_title }}
              </div>
            </div>
          </div>
        </div>
      </div> -->
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
      homeData: {},
      screenWidth: this.$q.screen.width,
      settingForm: {}
    };
  },
  mounted() {},
  created() {
    this.getHomeData();
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
    getHomeData() {
      this.$store
        .dispatch("home/getHome")
        .then(res => {
          if (res.code == 200) {
            if (res.data) {
              this.homeData = res.data;
            }
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
