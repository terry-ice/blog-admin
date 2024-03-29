<template>
  <div class="app-container">
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default excel-list)"
      style="width:350px;"
      prefix-icon="el-icon-document"
    />
    <el-button
      :loading="downloadLoading"
      style="margin-bottom:20px"
      type="primary"
      icon="document"
      @click="handleDownload"
    >
      {{ $t('excel.selectedExport') }}
    </el-button>
    <a
      href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
      target="_blank"
      style="margin-left:15px;"
    >
      <el-tag type="info">Documentation</el-tag>
    </a>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
      />
      <el-table-column
        align="center"
        label="Id"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
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
      <el-table-column
        align="center"
        label="PDate"
        width="220"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp }}</span>
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
import { Table } from 'element-ui'

@Component
export default class SelectExcel extends Vue {
  private list: any[] = []
  private listLoading = true
  private multipleSelection = []
  private downloadLoading = false
  private filename = ''

  created() {
    this.fetchData()
  }

  private async fetchData() {
    this.listLoading = true
    const { data } = await fetchArticleList({ /* Your params here */ })
    this.list = data.items
    this.listLoading = false
  }

  private handleSelectionChange(value: any) {
    this.multipleSelection = value
  }

  private handleDownload() {
    if (this.multipleSelection.length) {
      this.downloadLoading = true
      const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
      const list = this.multipleSelection
      const data = formatJson(filterVal, list)
      exportJson2Excel(tHeader, data, this.filename !== '' ? this.filename : undefined);
      (this.$refs.multipleTable as Table).clearSelection()
      this.downloadLoading = false
    } else {
      this.$message({
        message: 'Please select at least one item',
        type: 'warning'
      })
    }
  }
}
</script>
