<template>
  <div class="app-container">
    <el-button
      :loading="downloadLoading"
      style="margin-bottom:20px"
      type="primary"
      icon="document"
      @click="handleDownload"
    >
      {{ $t('excel.export') }}
    </el-button>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="Id"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column
        label="Main Information"
        align="center"
      >
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column
          label="Author"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag>{{ scope.row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Readings"
          width="115"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="Date"
        width="220"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchArticleList } from '@/api/article'
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'

@Component
export default class MergeHeader extends Vue {
  private list: any[] = []
  private listLoading = true
  private downloadLoading = false

  created() {
    this.fetchData()
  }

  private async fetchData() {
    this.listLoading = true
    const { data } = await fetchArticleList({ /* Your params here */ })
    this.list = data.items
    this.listLoading = false
  }

  private handleDownload() {
    this.downloadLoading = true
    const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
    const header = ['', 'Title', 'Author', 'Readings', '']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
    const list = this.list
    const data = formatJson(filterVal, list)
    const merges = ['A1:A2', 'B1:D1', 'E1:E2']
    exportJson2Excel(header, data, 'merge-header', multiHeader, merges)
    this.downloadLoading = false
  }
}
</script>
