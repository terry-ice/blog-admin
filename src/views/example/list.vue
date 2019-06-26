<template>
  <ApolloQuery :query="gql => queryData ">
    <template slot-scope="{result: {loading, error, data}}">
      <div v-if="loading">load {error}--{data}</div>
      <div v-else-if="error">An error occured</div>
      <div v-else-if="data">{{ data }}</div>
      <div v-else>No result</div>
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchArticleList } from '@/api/article'
import Pagination from '@/components/Pagination/index.vue'
import gql from 'graphql-tag'

const ALL_ARTICLE_QUERY = gql`
  query {
    articles {
      id
      title
      description
    }
  }
`

@Component({
  components: {
    Pagination
  }
})
export default class ArticleList extends Vue {
  private total = 0
  private list: any[] = []
  private listLoading = true
  private queryData = ALL_ARTICLE_QUERY
  private listQuery = {
    page: 1,
    limit: 20
  }

  created() {
    this.getList()
  }

  private getList() {
    this.listLoading = true
    fetchArticleList(this.listQuery).then(response => {
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
