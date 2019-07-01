<template>
     <Layout id="productInquire">
    <Content :style="{padding: '20px', background: '#fff', minHeight: '142px',borderRadius: '12px'}">
    <Row  style="marginBottom: 20px">
        <Col span="7">企业名称:
             <Input v-model="companyName"  placeholder="请输入企业名称" style="width: 210px" />
        </Col>
        <Col span="7">联系人:
             <Input v-model="contact"  placeholder="请输入联系人" style="width: 210px" />
        </Col>
        <Col span="8">联系人手机号:
             <Input v-model="contactPhone"  placeholder="请输入联系人手机号" style="width: 210px" />
        </Col>
     </Row>
     <Row  style="marginBottom: 20px">
        <Col span="7">创建时间：
            <DatePicker :clearable="false" @on-change="onStartTimeChange"  type="date" format="yyyy-MM-dd"  placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
        <Col span="7">至：
            <DatePicker :clearable="false" @on-change="onEndTimeChange" type="date"  format="yyyy-MM-dd" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
        <Col span="3" >
            <Button type="primary" @click="add('formValidate')"  icon="md-add">新增</Button>
        </Col>
         <Col span="3" >
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
        title="注册企业详情"
        >
      <Row  style="marginBottom: 20px">
         <Col span="12"><div style="fontWeight: bold;color: black">基础信息</div>
        </Col>
      </Row>
       <Row  style="marginBottom: 20px">
         <Col span="12">企业名称:  {{details.name}}
        </Col>
        <Col span="12" >统一社会信用代码:  {{details.number}}
        </Col>
      </Row>
       <Row  style="marginBottom: 20px">
         <Col span="12">办公地址:  {{details.goodsName}}
        </Col>
        <Col span="12" >办公电话:  {{details.address}}
        </Col>
      </Row>
       <Row  style="marginBottom: 20px">
         <Col span="12">法人代表姓名:  {{details.label}}
        </Col>
        <Col span="12" >法人代表身份证号:  {{details.goodsInfo}}
        </Col>
      </Row>
      <Row  style="marginBottom: 20px">
         <Col span="12">公钥地址:  {{details.label}}
         </Col>
        <Col span="12" >营业执照: <Button style="marginLeft:57px"  type="dashed" icon="ios-download-outline">点击下载</Button>
        </Col>
      </Row>
      <Row  style="marginBottom: 20px">
         <Col span="12">身份合约地址:  {{details.label}}
         </Col>
        <Col span="12" >账户ID:  {{details.goodsInfo}}
        </Col>
      </Row>
      <Row  style="marginBottom: 20px">
         <Col span="12"><div style="fontWeight: bold;color: black">申请人信息</div>
        </Col>
      </Row>
      <Row  style="marginBottom: 20px">
         <Col span="12">申请人姓名:  {{details.label}}
         </Col>
        <Col span="12" >申请人证件号码:  {{details.goodsInfo}}
        </Col>
      </Row>
      <Row  style="marginBottom: 20px">
         <Col span="12"> 申请人手机号:  {{details.label}}
         </Col>
        <Col span="12" >授权委托书: <Button style="marginLeft:57px"  type="dashed" icon="ios-download-outline">点击下载</Button>
        </Col>
      </Row>
      <div slot="footer">
          <Button type="primary" size="large" @click="modalclose">关闭</Button>
      </div>
    </Modal>
    <!-- 新增页 -->
     <Modal
      v-model="modal1"
      width='750'
      :loading="loading"
      title="接入渠道"
      okText="申请接入"
      @on-ok="handleSubmit('formValidate')"
      @on-cancel="cancel1">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <Row  style="marginBottom: 20px">
            <Col span="12"><div style="fontWeight: bold;color: black">基础信息</div>
            </Col>
          </Row>
          <Row>
            <Col span="12"> 
                <FormItem label="企业名称:" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
            </Col>
            <Col span="12"> 
                  <FormItem label="统一社会信用代码:" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                  </FormItem>
              </Col>
          </Row>
           <Row>
            <Col span="12"> 
                <FormItem label="办公地址:" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
            </Col>
            <Col span="12"> 
                  <FormItem label="办公电话:" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                  </FormItem>
              </Col>
          </Row>
          <Row>
            <Col span="12"> 
                <FormItem label="法人代表姓名:" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
            </Col>
            <Col span="12"> 
                  <FormItem label="法人代表身份证号:" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                  </FormItem>
              </Col>
          </Row>
          <Row>
            <Col span="12"> 
                <FormItem label="公钥地址:" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
            </Col>
            <Col span="12"> 
                  <FormItem label="营业执照:" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                  </FormItem>
              </Col>
          </Row>
          <Row>
            <Col span="12"> 
                <FormItem label="身份合约地址:" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
            </Col>
            <Col span="12"> 
                  <FormItem label="账户ID:" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                  </FormItem>
              </Col>
          </Row>
          <Row  style="marginBottom: 20px">
             <Col span="12"><div style="fontWeight: bold;color: black">申请人信息</div>
             </Col>
          </Row>
          <Row>
            <Col span="12"> 
                <FormItem label="联系人:" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
            </Col>
            <Col span="12"> 
                  <FormItem label="联系人证件号:" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                  </FormItem>
              </Col>
          </Row>
          <Row>
            <Col span="12"> 
                <FormItem label="联系人手机号:" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
            </Col>
            <Col span="12"> 
                  <FormItem label="授权委托书:" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                  </FormItem>
              </Col>
          </Row>
     
        </Form>
    </Modal>
  </Layout>
</template>
<script>
export default {
  data () {
    return {
      companyName:'',
      contact:'',
      contactPhone:'',
      total: 10, // 数据总条数
      pageSize: 10, // 每页数据条数
      pageNum: 1, // 当前页码
      details:{},
      loading:true,
      modal:false,
      modal1:false,
      formValidate: {
        // 新增表单
        name: '', // 渠道编号
      },
       ruleValidate: {
        name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ]
        },
      columns1: [
          {
              title: '序号',
              key: 'id'
          },
          {
              title: '企业编码',
              key: 'number'
          },
          {
              title: '企业名称',
              key: 'name'
          },
          {
              title: '社会统一信用码',
              key: 'creditCode'
          },
          {
              title: '办公地址',
              key: 'address'
          },
           {
              // width: 150,
              //  tooltip: true ,
              title: '联系人',
              key: 'contact'
          },
           {
              title: '注册手人机号',
              key: 'phone'
          },
          {
              title: '新建日期',
              key: 'time'
          },
           {
              title: '状态',
              key: 'status'
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
               name: '西安西正包装有限公司',
               creditCode:'123123123',
               phone:'13311111111',
               status:'正常',
               contact:'张三',
               address: '陕西省西安市x',
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
    // -------新增面板
    cancel1() {
      // this.$Message.info('已取消操作');
    },
     // 新增点击确定
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
               this.loading = false;
                 setTimeout(() => {
                this.loading = true;
              });
          }
      })
    },
    search() {
     
    },
     add(name) {
      //  this.$refs[name].resetFields();
       this.modal1=true
  
    },
    show(params){
      console.log(params);

      this.modal=true


    },

  // 点击页码返回页码
    handlePage(num) {
      this.pageNum = num;
      // this.getList();
    },
  },
  watch: {
    modal1(newValue,oldValue){
        if (!newValue) {
           this.$refs.formValidate.resetFields();
        }
    }
  },
}
</script>
<style lang="less" >
.ivu-form-item-label{
      width: 137px !important;
      text-align: center  !important;
}
.ivu-form-item-content{
  margin-left: 137px !important
}
</style>