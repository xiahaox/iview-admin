<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
      <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
        <common-icon style="margin-right: 4px;color:#fff" :type="item.icon || ''"/>
        {{ showTitle(item) }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
import { showTitle } from '@/libs/util';
import CommonIcon from '_c/common-icon';
import './custom-bread-crumb.less';
export default {
  name: 'customBreadCrumb',
  components: {
    CommonIcon
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showTitle(item) {
      return showTitle(item, this);
    },
    isCustomIcon(iconName) {
      return iconName.indexOf('_') === 0;
    },
    getCustomIconName(iconName) {
      return iconName.slice(1);
    }
  }
};
</script>
<style>
.ivu-breadcrumb a {
  color: #fff !important;
  /* -webkit-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out; */
}
.ivu-breadcrumb > span:last-child {
  /* font-weight: bold; */
  color: #fff !important;
}
.ivu-breadcrumb {
  color: #fff !important;
}
/* .ivu-breadcrumb-item-separator {
  margin: 0 8px;
  color: #fff;
} */
</style>
