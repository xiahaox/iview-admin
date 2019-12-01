<template>
  <div>
    <i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <Form-item label="密码" prop="passwd">
        <i-input type="password" :value.sync="formCustom.passwd"></i-input>
      </Form-item>
      <Form-item label="确认密码" prop="passwdCheck">
        <i-input type="password" :value.sync="formCustom.passwdCheck"></i-input>
      </Form-item>
      <Form-item label="年龄" prop="age">
        <i-input type="text" :value.sync="formCustom.age" number></i-input>
      </Form-item>
      <Form-item>
        <i-button @click="handleSubmit('formCustom')">提交</i-button>
        <i-button @click="handleReset('formCustom')" style="margin-left: 8px">重置</i-button>
      </Form-item>
    </i-form>
  </div>
</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        age: ''
      },
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: 'blur' }],
        passwdCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
        age: [{ validator: validateAge, trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
