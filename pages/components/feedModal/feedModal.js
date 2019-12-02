import {
  createFeedback
} from '../../api/api.js';

Component({
  properties: {
    feedType: {
      type: String,
      value: '1'
    }, 
    id: {
      type: String,
      value: ''
    },
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    feedback: ''
  },
  methods: {
    clickMask(e) {
      let id = e.currentTarget.dataset.id;
      if (id == 1) {
        this.setData({
          show: false
        })
      }
    },
  },
  getTextAreaValue(e) {
    this.setData({
      feedback: e.detail.value
    })
  },

  confirm() {
    if (!this.data.feedback) {
      showToast('请输入反馈内容');
      return
    }
    createFeedback({
      content: this.data.feedback,
      subjectId: this.data.subjectObj.id
    }).then(res => {
      if (res) {
        showToast('反馈成功！');
        this.setData({
          showFeedbackModal: false
        })
      }
    })
    this.setData({
      show: false
    })
  },
})