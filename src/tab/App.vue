
<template>
  <div>
    <div v-if="loading"
         class="centered">
      <p>Loading...</p>
    </div>
    <div v-else>
      <p class="joke">{{ joke }}</p>
      <el-table :data="tableData"
                border
                style="width:100%;">
        <el-table-column label="序号">
          <template slot-scope="scope">{{scope.row.order}}</template>
        </el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">{{scope.row.content}}</template>
        </el-table-column>
      </el-table>
      <div class="button-container">
        <button @click="likeJoke"
                :disabled="likeButtonDisabled"
                class="btn">
          <icon name="thumbs-up"></icon>
        </button>
        <button @click="logJokes"
                class="btn">
          <icon name="list-ol"></icon>
        </button>
        <button @click="clearStorage"
                class="btn">
          <icon name="trash-alt"></icon>
        </button>
        <button @click="nextJoke"
                class="btn">
          <icon name="redo"></icon>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      joke: "",
      likeButtonDisabled: false,
      tableData: [],
    };
  },
  methods: {
    likeJoke() {
      chrome.storage.local.get("jokes", (res) => {
        if (!res.jokes) {
          res.jokes = [];
        }
        res.jokes.push(this.joke);
        chrome.storage.local.set(res);
        this.likeButtonDisabled = true;
      });
    },
    logJokes() {
      chrome.storage.local.get("jokes", (res) => {
        this.tableData = [];
        if (res.jokes) {
          let i = 0;
          for (const item of res.jokes) {
            i++;
            this.tableData.push({ order: i, content: item });
          }
        }
      });
    },
    clearStorage() {
      chrome.storage.local.clear();
    },
    nextJoke() {
      axios
        .get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        })
        .then((res) => {
          this.joke = res.data.joke;
          this.likeButtonDisabled = false;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.nextJoke();
  },
};
</script>

<style>
body {
  height: 98vh;
  text-align: center;
  color: #353638;
  font-size: 22px;
  line-height: 30px;
  font-family: Merriweather, Georgia, serif;
  background: url("https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2018/12/1544189726troll-dad.png")
    no-repeat 1% 99%;
  background-size: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.joke {
  max-width: 800px;
}

.button-container {
  position: absolute;
  right: 0px;
  top: calc(50% - 74px);
}

.btn {
  background-color: #000000;
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin-bottom: 5px;
  width: 50px;
}

.btn:hover {
  background-color: #c8c8c8;
}

.btn:disabled {
  background-color: #909090;
}
</style>
