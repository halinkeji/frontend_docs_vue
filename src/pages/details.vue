<template>
  <q-page>
    <div>
      <q-layout
        view="hHh Lpr lff"
        container
        style="position:absolute;width:100%"
      >
        <q-header bordered class="bg-white text-black q-pt-md">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title v-if="screenWidth > 1000">{{
              project.dp_title
            }}</q-toolbar-title>
            <div
              v-if="screenWidth > 1000"
              style="position:absolute;right:5px;width:25%"
            >
              <q-input
                outlined
                bottom-slots
                v-model="search"
                dense
                class="q-pb-none"
                placeholder="输入关键字搜索"
                @keyup.enter="searchData"
                @input="inputSearch"
              >
                <template v-slot:append v-if="search">
                  <q-btn round dense flat icon="close" @click="cleanSearch" />
                </template>
                <template v-slot:append v-else>
                  <q-icon
                    name="search"
                    class="cursor-pointer"
                    @click="searchData"
                  />
                </template>
              </q-input>
            </div>
            <div
              style="position:absolute;right:15px;width:74%"
              v-if="screenWidth < 1000"
            >
              <q-input
                outlined
                bottom-slots
                v-model="search"
                dense
                class="q-pb-none"
                placeholder="输入关键字搜索"
                @keyup.enter="searchData"
                @input="inputSearch"
              >
                <template v-slot:append v-if="search">
                  <q-btn round dense flat icon="close" @click="cleanSearch" />
                </template>
                <template v-slot:append v-else>
                  <q-icon
                    name="search"
                    class="cursor-pointer"
                    @click="searchData"
                  />
                </template>
              </q-input>
            </div>
          </q-toolbar>
          <div class="q-pl-md text-center text-h6" v-if="screenWidth < 1000">
            {{ project.dp_title }}
          </div>
        </q-header>
        <q-drawer
          v-model="drawer"
          show-if-above
          v-if="screenWidth > 1000"
          :width="screenWidth * 0.2"
          :breakpoint="500"
          bordered
          content-class="bg-grey-1"
        >
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
          >
            <q-tab name="list" label="目录" @click="cleanSearch" />
            <q-tab
              name="search"
              label="搜索"
              @click="
                data = '';
                articleData = [{ da_title: '暂无数据' }];
              "
            />
          </q-tabs>
          <div v-if="tab == 'list'">
            <q-tree
              :nodes="articleData"
              node-key="id"
              label-key="da_title"
              accordion
              selected-color="primary"
              :expanded.sync="expanded"
            >
              <template v-slot:default-header="prop">
                <div
                  class="row full-width  items-center text-weight-bold"
                  :class="{
                    'border-blue text-primary':
                      parseInt(selected) == parseInt(prop.node.id)
                  }"
                  @click="getItem(prop.node.id)"
                  style="cursor:pointer"
                >
                  {{ prop.node.da_title }}
                </div>
              </template>
            </q-tree>
          </div>
          <div v-if="tab == 'search'" class="text-center q-py-md">
            <div
              v-for="(i, index) in articleData"
              :key="index"
              :style="{
                color: index == sort ? '#2196f3' : 'black'
              }"
              style="border-radius:30px"
              class="q-ml-sm q-mb-sm cursor-pointer"
              @click="getItem(i.id, index)"
            >
              {{ i.da_title }}
            </div>
          </div>
        </q-drawer>
        <q-drawer
          v-model="drawer"
          show-if-above
          :width="300"
          v-else
          :breakpoint="500"
          bordered
          content-class="bg-grey-1"
        >
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
          >
            <q-tab name="list" label="目录" @click="cleanSearch" />
            <q-tab
              name="search"
              label="搜索"
              @click="
                data = '';
                articleData = [{ da_title: '暂无数据' }];
              "
            />
          </q-tabs>
          <div v-if="tab == 'list'">
            <q-tree
              :nodes="articleData"
              node-key="id"
              label-key="da_title"
              accordion
              selected-color="primary"
              :expanded.sync="expanded"
            >
              <template v-slot:default-header="prop">
                <div
                  class="row full-width  items-center text-weight-bold"
                  :class="{
                    'border-blue text-primary':
                      parseInt(selected) == parseInt(prop.node.id)
                  }"
                  @click="getItem(prop.node.id)"
                  style="cursor:pointer"
                >
                  {{ prop.node.da_title }}
                </div>
              </template>
            </q-tree>
          </div>
          <div v-if="tab == 'search'" class="text-center q-py-md">
            <div
              v-for="(i, index) in articleData"
              :key="index"
              :style="{
                color: index == sort ? '#2196f3' : 'black'
              }"
              style="border-radius:30px"
              class="q-ml-sm q-mb-sm cursor-pointer"
              @click="getItem(i.id, index)"
            >
              {{ i.da_title }}
            </div>
          </div>
        </q-drawer>
        <q-page-container>
          <q-page class="q-px-md q-pb-md">
            <div class="row q-mt-sm items-center">
              <div class="col text-grey text-right text-caption">
                <span v-if="updateTime"
                  >更新时间：{{
                    $q_date.formatDate(
                      updateTime * 1000,
                      "YYYY-MM-DD  HH:mm:ss"
                    )
                  }}</span
                ><span class="q-ml-md" v-if="author">作者：{{ author }} </span>
              </div>
            </div>

            <q-scroll-area
              class="full-width "
              :style="{
                height: areaHeight + 'px'
              }"
            >
              <q-card flat class="full-hight">
                <Markdown
                  v-model="data"
                  :isPreview="true"
                  :toolbars="toolbarsData"
                  :bordered="false"
                  class="full-height"
                />
                <!-- <div v-html="data"></div> -->
              </q-card>
            </q-scroll-area>
            <div
              class="q-mt-xl"
              style="border-top:1px solid #bdbdbd"
              v-if="screenWidth < 1000"
            >
              <div class="q-py-sm q-px-md text-caption text-black">
                <div v-html="settingForm.ds_copyright"></div>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>

    <q-footer bordered class="bg-white q-mt-xl" v-if="screenWidth > 1000">
      <div class="q-py-sm text-black">
        <div v-html="settingForm.ds_copyright"></div>
      </div>
    </q-footer>
  </q-page>
</template>

<script>
import Markdown from "vue-meditor";

import { Screen } from "quasar";
export default {
  name: "homeList",
  components: { Screen, Markdown },
  data() {
    return {
      toolbarsData: {
        save: false,
        clear: false,
        fullscreen: false
      },
      articleData: [],
      settingForm: {},
      selected: "",
      data: "",
      tree: 1,
      activeIndex: 1,
      scrollingPage: false,
      drawer: true,
      active: true,
      search: "",
      project: {},
      updateTime: "",
      author: "",
      text: "",
      tab: "list",
      sort: -1,
      screenWidth: this.$q.screen.width,
      expanded: [],
      areaHeight: this.$q.screen.height * 0.8
    };
  },
  created() {
    this.getSetting();
    this.getArticle();
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {},
  methods: {
    getSetting() {
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
      this.searchData();
    },
    searchData() {
      if (this.search != "") {
        this.tree = 2;
        this.data = "";
        this.tab = "search";
        this.getArticle();
        this.drawer = true;
      } else {
        this.tree = 1;
        this.tab = "list";
        this.getArticle();
        this.drawer = true;
      }
    },
    inputSearch() {
      this.searchData();
    },
    getArticle() {
      this.articleData = [];
      const obj = {
        tree: this.tree,
        project_id: this.$route.query.id,
        search: this.search
      };
      this.$store
        .dispatch("home/getArticle", obj)
        .then(res => {
          if (res.code == 200) {
            this.articleData =
              res.data.tree && res.data.tree
                ? res.data.tree
                : res.data
                ? res.data
                : [{ da_title: "暂无数据" }];
            if (this.tab == "list" && res.data.tree.length > 0) {
              this.expanded = [];
              this.expanded.push(res.data.tree[0].id);
            }
            this.project =
              res.data.project && res.data.project
                ? res.data.project
                : this.project;
            if (
              this.$route.query.selected > 0 &&
              this.tab == "list" &&
              this.selected == ""
            ) {
              this.getItem(this.$route.query.selected);
            } else if (
              this.$route.query.selected > 0 &&
              this.tab == "list" &&
              this.selected == ""
            ) {
              this.getItem(this.selected);
            } else if (
              this.articleData &&
              this.tab == "list" &&
              this.selected == 0
            ) {
              this.getItem(this.articleData[0].id);
            } else if (
              this.articleData &&
              this.tab == "list" &&
              this.selected > 0
            ) {
              this.getItem(this.selected);
            } else if (this.articleData && this.tab == "list") {
              this.getItem(this.articleData[0].id);
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
    },
    getItem(id, index) {
      if (id > 0) {
        const obj = {
          id: id
        };
        this.$store.dispatch("home/getArticleItem", obj).then(res => {
          if (res.code == 200) {
            this.data =
              res.data && res.data.da_h5_content
                ? res.data.da_h5_content
                : "暂无数据";
            this.author = res.data.user ? res.data.user.username : "";
            this.updateTime = res.data ? res.data.updated_at : "";
            this.selected = res.data.id;
          }
        });
        this.sort = index;
      }
    }
  }
};
</script>

<style scoped>
.active {
  background: #e3f2fd;
  color: #03a9f4;
  border-right: 2px solid #03a9f4;
}
.change:hover {
  color: #2196f3;
}
.border-blue {
  border-right: 2px solid #03a9f4;
}
</style>
