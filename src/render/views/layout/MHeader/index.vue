<template>
  <div class="m-hader-wrapper">
    <Row class="header">
      <Col span="7" class="user">
        <img class="avatar" :src="avatar" />
        <Input class="input">
            <Icon type="ios-search" slot="prefix" />
        </Input>
      </Col>
      <Col span="15" offset="2" class="category">
        <div class="group">
          <Icon class="icon" color="white" type="ios-chatboxes-outline" size="40" />
          <Icon class="icon" color="white" type="ios-contacts-outline" size="40" />
          <Icon class="icon" color="white" type="ios-document-outline" size="40" />
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { Row, Col, Icon, Input } from "iview";
export default {
  name: "m-header",
  components: {
    Row,
    Col,
    Icon,
    Input
  },
  data() {
    return {
      avatar:
        "http://pic4.zhimg.com/50/v2-0019ec92840b3cda9c12445d4452e4a5_hd.jpg",
      value: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: #1991ed;
  position: relative;
  .user {
    .avatar {
      height: 46px;
      width: 46px;
      border-radius: 50%;
      margin: 7px 13px;
    }
    .input {
      position: absolute;
      width: 114px;
      margin: 17px 18px;
      height: 28px;
      border-radius: 20px !important;
    }
  }
  .category {
    .group {
      display: inline-block;
      .icon {
          padding: 10px 16px;
          cursor: pointer;
      }
    }
  }
}
.user /deep/ .ivu-input{
    color: #fff;
    background-color: #1991ed;
    border:1px solid #fff;
    height:28px;
    border-radius: 20px;
}
.user /deep/ .ivu-icon-ios-search:before {
    color: #fff;
}
</style>