<template>
    <Layout id="productInquire">
    <Content :style="{padding: '20px', background: '#fff', minHeight: '142px',borderRadius: '12px'}">
    <Row  style="marginBottom: 20px">
        <Col span="8">商品编号:
             <Input v-model="numValue"  placeholder="请输入商品编号" style="width: 210px" />
        </Col>
        <Col span="8">商品名称:
             <Input v-model="nameValue"  placeholder="请输入商品名称" style="width: 210px" />
        </Col>
     </Row>
     <Row  style="marginBottom: 20px">
        <Col span="8">创建时间：
            <DatePicker :clearable="false" @on-change="onStartTimeChange"  type="date" format="yyyy-MM-dd"  placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
        <Col span="7">至：
            <DatePicker :clearable="false" @on-change="onEndTimeChange" type="date"  format="yyyy-MM-dd" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
            <Col span="5" >
           <Button type="primary" @click="search">查询</Button>
        </Col>
    </Row>
    </Content>
    <Content :style="{padding: '20px', background: '#fff', minHeight: '560px', marginTop: '20px',borderRadius: '12px'}">
         <Table :columns="columns1" :data="data1"></Table>
          <div class="footer">
            <Page :total="total" :page-size="pageSize" :current="pageNum" @on-change="handlePage"  show-sizer  > </Page>
          </div>
    </Content>
    <!-- 详情页 -->
    <Modal
        v-model="modal"
        title="商品详情"
        >
       <Row  style="marginBottom: 20px">
         <Col span="10">企业名称:  {{details.name}}
        </Col>
        <Col span="10" >商品编号:  {{details.number}}
        </Col>
      </Row>
       <Row  style="marginBottom: 20px">
         <Col span="10">商品名称:  {{details.goodsName}}
        </Col>
        <Col span="10" >存证合约地址:  {{details.address}}
        </Col>
      </Row>
       <Row  style="marginBottom: 20px">
         <Col span="10">防伪标签:  {{details.label}}
        </Col>
        <Col span="10" >商品描述信息:  {{details.goodsInfo}}
        </Col>
      </Row>
      <Row  style="marginBottom: 20px">
         <Col span="10">商品图片:  {{details.img}}
        </Col>
      </Row>
       <div slot="footer">
          <Button type="primary" size="large" @click="modalclose">关闭</Button>
      </div>
    </Modal>
  </Layout>
</template>
<script>
export default {
  data () {
    return {
        modal:false,
        numValue:'',
        nameValue: '',
        total: 10, // 数据总条数
        pageSize: 10, // 每页数据条数
        pageNum: 1, // 当前页码
        details:{name:'11', number:'', goodsName:'', address:'', label:'', goodsInfo:'', img:'' },
        columns1: [
          {
              title: '序号',
              key: 'id'
          },
          {
              title: '商品编号',
              key: 'number'
          },
          {
              title: '企业名称',
              key: 'name'
          },
          {
              title: '商品名称',
              key: 'goodsName'
          },
          {
              title: '防伪标签',
              key: 'label'
          },
           {
              width: 150,
               tooltip: true ,
              title: '存证合约地址',
              key: 'address'
          },
          {
              title: '创建日期',
              key: 'time'
          },
          {
            title: '操作',
            key: 'action',
          
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.show(params)
                            }
                        }
                    }, '详情'),
                ]);
            }
        }
      ],
      data1: [
          {
               number:'1000000002-001',
               name: '70周年连体钞',
               goodsName:'成钞公司',
               label:'雕版凹印  中钞成都',
               address: '58b26ac40c02ef50225e2c5feae1a8e964afbd2d',
               time:'2018-01-01',
          },
      ]
    };
  },
  methods: {
    onEndTimeChange(e, type) {
      this.value2 = e;
      // console.log(e, type);
      
      // this.startTimeOption = {
      //   disabledDate(startTime) {
      //     return (
      //       startTime.valueOf() > new Date(e).valueOf() ||
      //       startTime.valueOf() > Date.now() - 86400000
      //     );
      //   }
      // };
    },
    modalclose(){
      this.modal=false
    },
    onStartTimeChange(e){
      console.log(e);
      
    },
    show(params){
      console.log(params);

      this.modal=true


    },
    search() {
     
    },
  // 点击页码返回页码
    handlePage(num) {
      this.pageNum = num;
      // this.getList();
    },

  },
}
</script>
<style lang="less" scoped>
.footer {
  margin-top: 10px;
}
</style>
