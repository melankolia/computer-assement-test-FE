<template>
  <div class="px-6 py-12">
    <p class="text-h4 font-weight-bold mt-0 mb-9 font-inter">
      Peraturan Soal & Siswa
    </p>
    <v-row class="mb-12">
      <v-col cols="12" class="py-2">
        <v-btn-toggle
          v-model="isComponent"
          mandatory
          borderless
          color="deep-purple accent-3"
          background-color="white"
        >
          <v-btn class="no-uppercase" small value="Kecerdasan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kecerdasan
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kepribadian">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kepribadian
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kejiwaan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kejiwaan
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kecermatan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kecermatan
            </p>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <ContentNotFound
      message="Peraturan Not Found"
      :loading="loading"
      v-if="!isAvailable"
    >
      <template v-slot:action>
        <v-btn
          depressed
          @click="() => getPeraturan()"
          color="default"
          class="px-10"
        >
          <v-icon class="mr-1" small>mdi-reload</v-icon>
          Reload
        </v-btn>
      </template>
    </ContentNotFound>
    <template v-else>
      <transition name="slide-fade" mode="out-in">
        <keep-alive>
          <component
            :is="isComponent"
            :items="items"
            class="mt-6"
            @reload="() => getPeraturan()"
          />
        </keep-alive>
      </transition>
    </template>
  </div>
</template>

<script>
import PeraturanService from "@/services/resources/peraturan.service";
const Kecerdasan = () => import("./Kecerdasan");
const Kepribadian = () => import("./Kepribadian");
const Kejiwaan = () => import("./Kejiwaan");
const Kecermatan = () => import("./Kecermatan");
const ContentNotFound = () => import("@/components/Content/NotFound");

export default {
  components: {
    Kecerdasan,
    Kepribadian,
    Kejiwaan,
    Kecermatan,
    ContentNotFound,
  },
  data() {
    return {
      isComponent: "Kecerdasan",
      loading: false,
      isAvailable: false,
      items: {
        kecerdasanVO: {
          siswa: {
            secureId: null,
            description: null,
          },
          soal: {
            secureId: null,
            description: null,
          },
        },
        kepribadianVO: {
          siswa: {
            secureId: null,
            description: null,
          },
          soal: {
            secureId: null,
            description: null,
          },
        },
        kejiwaanVO: {
          siswa: {
            secureId: null,
            description: null,
          },
          soal: {
            secureId: null,
            description: null,
          },
        },
        kecermatanVO: {
          siswa: {
            secureId: null,
            description: null,
          },
          soal: {
            secureId: null,
            description: null,
          },
        },
      },
    };
  },
  mounted() {
    this.getPeraturan();
  },
  methods: {
    getPeraturan() {
      this.loading = true;
      this.isAvailable = false;
      PeraturanService.getAll()
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.items = this.$_.merge(
              this.$_.cloneDeep(this.items),
              this.$_.cloneDeep(result)
            );
          } else {
            throw new Error(result);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          this.loading = false;
          this.isAvailable = true;
        });
    },
  },
};
</script>

<style scoped>
.font-inter {
  font-family: Inter !important;
}
</style>
