<template>
  <div class="components-container">
    <el-button
      type="primary"
      @click="dialogTableVisible=true"
    >
      Open a Draggable Dialog
    </el-button>
    <el-dialog
      v-el-draggable-dialog
      :visible.sync="dialogTableVisible"
      title="Shipping address"
      @onDialogDrag="handleDialogDrag"
    >
      <el-select
        ref="select"
        v-model="value"
        placeholder="Please select"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="Date"
          width="150"
        />
        <el-table-column
          property="name"
          label="Name"
          width="200"
        />
        <el-table-column
          property="address"
          label="Address"
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { elDraggableDialog } from '@/directives/el-draggable-dialog'
import { Select } from 'element-ui'

@Component({
  directives: {
    elDraggableDialog
  }
})
export default class DraggableDialogDemo extends Vue {
  private dialogTableVisible = false
  private options = [
    { value: '选项1', label: '黄金糕' },
    { value: '选项2', label: '双皮奶' },
    { value: '选项3', label: '蚵仔煎' },
    { value: '选项4', label: '龙须面' }
  ]
  private value = ''
  private gridData = [{
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }, {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }, {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }, {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }]

  // v-el-dialog-draggable onDialogDrag callback function
  private handleDialogDrag() {
    (this.$refs.select as Select).blur()
  }
}
</script>
